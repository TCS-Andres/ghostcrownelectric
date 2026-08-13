import { NextResponse } from "next/server";

/*
  Lead intake endpoint.

  NOTE: The live form submits directly to Web3Forms from the browser (client
  side), because Web3Forms blocks server-side submissions on the Pro plan. This
  route is kept as an alternative/fallback intake and is not on the current
  submission path. It validates on the server, then delivers through the first
  configured channel:

  1. Email via Resend (RESEND_API_KEY + LEAD_TO_EMAIL set). LEAD_FROM_EMAIL can
     override the sender once a domain is verified in Resend; until then the
     Resend onboarding sender is used, which only delivers to the Resend account
     owner's address.
  2. Webhook (LEAD_WEBHOOK_URL set), kept as an alternative integration path.
  3. Server console log, so nothing is lost during launch while neither is set.

  We never echo the submitted data back. The response is only a confirmation, so a
  bot cannot use this route to reflect content and a person only ever sees a calm
  success or a plain error.
*/

// This route reads the request body and must run per request, never cached.
export const dynamic = "force-dynamic";

interface LeadPayload {
  service?: unknown;
  propertyType?: unknown;
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
    propertyType: fieldOrDefault(data.propertyType, "Not specified"),
    city: fieldOrDefault(data.city, "Not specified"),
    locationDetail: fieldOrDefault(data.locationDetail, ""),
    name: (data.name as string).trim(),
    phone: (data.phone as string).trim(),
    email: fieldOrDefault(data.email, ""),
    description: fieldOrDefault(data.description, ""),
    consent: true,
    submittedAt: new Date().toISOString(),
  };

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (resendKey && toEmail) {
    const lines = [
      `Service: ${lead.service}`,
      `Property type: ${lead.propertyType}`,
      `City: ${lead.city}`,
      lead.locationDetail ? `Street or neighborhood: ${lead.locationDetail}` : "",
      "",
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      lead.email ? `Email: ${lead.email}` : "Email: not provided",
      "",
      lead.description ? `Notes: ${lead.description}` : "Notes: none",
      "",
      `Agreed to be contacted: yes`,
      `Submitted: ${lead.submittedAt}`,
    ].filter((line, i, arr) => line !== "" || arr[i - 1] !== "");

    try {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.LEAD_FROM_EMAIL ??
            "Ghost Crown Website <onboarding@resend.dev>",
          to: [toEmail],
          reply_to: lead.email || undefined,
          subject: `New service request: ${lead.service} in ${lead.city}`,
          text: lines.join("\n"),
        }),
      });
      if (!sent.ok) {
        const detail = await sent.text().catch(() => "");
        console.error(
          `lead: email send failed with status ${sent.status}: ${detail.slice(0, 300)}`,
        );
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
        `lead: email request failed: ${
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
    return NextResponse.json({ ok: true });
  }

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
