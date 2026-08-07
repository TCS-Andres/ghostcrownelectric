import { getCities } from "@/lib/content";

/*
  Coverage model for the service-area map widget.

  Groups the loaded city pages by county in display order (Palm Beach in the
  north, Broward at the core, Miami-Dade at the southern edge) and exposes the
  city coordinates the map projects. This is derived from the real city content,
  so counts and pins never drift from the pages that actually exist.
*/

export type CountyId = "palm-beach" | "broward" | "miami-dade";

export interface CoverageCity {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  countyId: CountyId;
}

export interface CountyGroup {
  id: CountyId;
  name: string;
  short: string;
  blurb: string;
  cities: CoverageCity[];
}

// County display order, running north to south, with the JSON `county` value
// each group collects. Broward is our home base and sits in the middle of the
// corridor geographically, so the north-to-south order reads Palm Beach,
// Broward, then Miami-Dade.
const COUNTY_ORDER: {
  id: CountyId;
  name: string;
  short: string;
  blurb: string;
  match: string;
}[] = [
  {
    id: "palm-beach",
    name: "Palm Beach County",
    short: "Palm Beach",
    blurb:
      "Full-county coverage, north to West Palm Beach and out to the western communities.",
    match: "Palm Beach",
  },
  {
    id: "broward",
    name: "Broward County",
    short: "Broward",
    blurb:
      "Our home county, from the coast to the western suburbs. This is where we respond fastest.",
    match: "Broward",
  },
  {
    id: "miami-dade",
    name: "Miami-Dade County",
    short: "Miami-Dade",
    blurb:
      "The southern edge of our service area. North Miami Beach is about as far south as we go.",
    match: "Miami-Dade",
  },
];

// Cities grouped by county, in display order, each sorted north to south.
export function coverageByCounty(): CountyGroup[] {
  const cities = getCities();
  return COUNTY_ORDER.map((county) => ({
    id: county.id,
    name: county.name,
    short: county.short,
    blurb: county.blurb,
    cities: cities
      .filter((city) => city.county === county.match)
      .map((city) => ({
        slug: city.slug,
        name: city.name,
        lat: city.lat,
        lng: city.lng,
        countyId: county.id,
      }))
      .sort((a, b) => b.lat - a.lat),
  })).filter((group) => group.cities.length > 0);
}

export function coverageTotals(groups: CountyGroup[]): {
  cities: number;
  counties: number;
} {
  return {
    cities: groups.reduce((sum, group) => sum + group.cities.length, 0),
    counties: groups.length,
  };
}
