import { NextResponse } from "next/server";

/*
  Lead intake endpoint.

  The three step form on the site posts here. We validate on the server, then
  forward to LEAD_WEBHOOK_URL when it is set, or log to the server console when it
  is not, so nothing is lost during launch. The webhook destination is still
  undecided (see PLACEHOLDERS.md).

  We never echo the submitted data back. The response is only a confirmation, so a
  bot cannot use this route to reflect content and a person only ever sees a calm
  success or a plain error.
*/

// This route reads the request body and must run per request, never cached.
export const dynamic = "force-dynamic";

interface LeadPayload {
  service?: unknown;
  city?: unknown;
  locationDetail?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  description?: unknown;
  consent?: unknown;
  company?: unknown; // honeypot
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function fieldOrDefault(value: unknown, fallback: string): string {
  return isNonEmptyString(value) ? value.trim() : fallback;
}

export async function POST(request: Request): Promise<Response> {
  let data: LeadPayload;
  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot. A real visitor leaves this blank; a bot tends to fill every field.
  // Accept quietly and drop it so we do not tip off the sender.
  if (typeof data.company === "string" && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Minimum we need to actually call someone back, plus explicit consent.
  if (
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.phone) ||
    data.consent !== true
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please add your name, a phone number, and consent so we can reach you.",
      },
      { status: 400 },
    );
  }

  const lead = {
    service: fieldOrDefault(data.service, "Not specified"),
    city: fieldOrDefault(data.city, "Not specified"),
    locationDetail: fieldOrDefault(data.locationDetail, ""),
    name: (data.name as string).trim(),
    phone: (data.phone as string).trim(),
    email: fieldOrDefault(data.email, ""),
    description: fieldOrDefault(data.description, ""),
    consent: true,
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!forwarded.ok) {
        console.error(`lead: webhook responded with status ${forwarded.status}`);
        return NextResponse.json(
          {
            ok: false,
            error: "We could not send that right now. Please call us instead.",
          },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error(
        `lead: webhook request failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return NextResponse.json(
        {
          ok: false,
          error: "We could not send that right now. Please call us instead.",
        },
        { status: 502 },
      );
    }
  } else {
    // No destination configured yet. Log so the lead is recoverable from server
    // output during launch, without ever returning it to the client.
    console.log(`lead: new submission ${JSON.stringify(lead)}`);
  }

  return NextResponse.json({ ok: true });
}
