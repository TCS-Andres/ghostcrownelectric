import { getBusiness, getCities, getServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import { HeaderClient, type NavLink } from "./HeaderClient";

// Server wrapper: reads content on the server and passes plain, serializable nav
// data to the interactive client header. Up to seven services and six cities
// feed the dropdowns, each ending with a View All link.
export function Header() {
  const business = getBusiness();

  const serviceLinks: NavLink[] = getServices()
    .slice(0, 7)
    .map((service) => ({
      label: service.shortName || service.name,
      href: routes.service(service.slug),
    }));

  const cityLinks: NavLink[] = getCities()
    .slice(0, 6)
    .map((city) => ({
      label: city.name,
      href: routes.city(city.slug),
    }));

  return (
    <HeaderClient
      brandName={business.name}
      phoneDisplay={business.phoneDisplay}
      phoneTel={business.phoneTel}
      serviceLinks={serviceLinks}
      cityLinks={cityLinks}
    />
  );
}
