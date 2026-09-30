export const COMPANY_INFO = {
  name: 'Cargo to Pakistan',
  phone: '+971504948135',
  email: 'info@cargotopakistan.ae',
  website: 'https://cargotopakistan.ae',
  address: 'Jafza North, Jebel Ali Free Zone, Dubai, UAE',
  description:
    'Professional cargo shipping services from UAE to Pakistan with competitive rates and reliable delivery.',
};

export const CONTACT_INFO = {
  phone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  whatsapp: COMPANY_INFO.phone,
  whatsappBase: `https://wa.me/${COMPANY_INFO.phone.replace(/[^\d]/g, '')}`,
  defaultMessage: "Hello, I'm interested in your cargo services to Pakistan.",
};

export const NAVIGATION_LINKS = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  // Explicit business priority order. Air Freight stays last: we don't handle
  // it ourselves, the page exists for SEO/informational purposes only.
  services: [
    { name: 'Full Container', href: '/services/full-container' },
    { name: 'Sea Freight', href: '/services/sea-freight' },
    { name: 'Courier Service', href: '/services/courier-service' },
    { name: 'Moving Home', href: '/services/moving-home' },
    { name: 'Packaging', href: '/services/packaging' },
    { name: 'Door to Door', href: '/services/door-to-door' },
    { name: 'Warehousing', href: '/services/warehousing' },
    { name: 'Cross Stuffing', href: '/services/cross-stuffing' },
    { name: 'Customs Clearance', href: '/services/customs-clearance' },
    { name: 'Secure Handling', href: '/services/secure-handling' },
    { name: 'Consulting', href: '/services/consulting' },
    { name: 'Air Freight', href: '/services/air-freight' },
  ],
  // Dubai/Abu Dhabi/Sharjah/Ajman are built as "{city}-to-pakistan" pages (pageType:
  // 'origin'), NOT "/areas/{city}" — only Al Ain/Fujairah/RAK/Umm Al Quwain are built
  // under /areas/ (pageType: 'area'). Mixing these up previously produced 4 live 404s
  // on the /service-areas/ hub page.
  areas: [
    { name: 'Dubai', href: '/dubai-to-pakistan' },
    { name: 'Abu Dhabi', href: '/abu-dhabi-to-pakistan' },
    { name: 'Sharjah', href: '/sharjah-to-pakistan' },
    { name: 'Ajman', href: '/ajman-to-pakistan' },
    { name: 'Al Ain', href: '/areas/al-ain' },
    { name: 'Ras Al Khaimah', href: '/areas/ras-al-khaimah' },
    { name: 'Fujairah', href: '/areas/fujairah' },
    { name: 'Umm Al Quwain', href: '/areas/umm-al-quwain' },
  ],
  pakistanCities: [
    { name: 'Karachi', href: '/pakistan-cargo-to-karachi' },
    { name: 'Lahore', href: '/pakistan-cargo-to-lahore' },
    { name: 'Islamabad', href: '/pakistan-cargo-to-islamabad' },
    { name: 'Peshawar', href: '/pakistan-cargo-to-peshawar' },
    { name: 'Quetta', href: '/pakistan-cargo-to-quetta' },
    { name: 'Faisalabad', href: '/pakistan-cargo-to-faisalabad' },
    { name: 'Multan', href: '/pakistan-cargo-to-multan' },
    { name: 'Rawalpindi', href: '/pakistan-cargo-to-rawalpindi' },
    { name: 'Sialkot', href: '/pakistan-cargo-to-sialkot' },
    { name: 'Sukkur', href: '/pakistan-cargo-to-sukkur' },
    { name: 'Larkana', href: '/pakistan-cargo-to-larkana' },
    { name: 'Sargodha', href: '/pakistan-cargo-to-sargodha' },
    { name: 'Bahawalpur', href: '/pakistan-cargo-to-bahawalpur' },
    { name: 'Hyderabad', href: '/pakistan-cargo-to-hyderabad' },
    { name: 'Gujranwala', href: '/pakistan-cargo-to-gujranwala' },
    { name: 'Sheikhupura', href: '/pakistan-cargo-to-sheikhupura' },
  ],
};

export const GTM_ID = 'GTM-TCDZPFK';

// Formspree endpoint for the contact and quote forms (the ID is public, not a secret).
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpnropz';

export function whatsappLink(message: string) {
  return `${CONTACT_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${COMPANY_INFO.phone}`;
}

// Explicit business priority order for service listings (homepage, /services/
// grid). Mirrors NAVIGATION_LINKS.services — kept as a separate slug-keyed list
// here since content-collection entries are matched by data.slug, not name/href.
// Air Freight stays last: we don't handle it ourselves, the page exists for
// SEO/informational purposes only.
const SERVICE_DISPLAY_ORDER = [
  'full-container',
  'sea-freight',
  'courier-service',
  'moving-home',
  'packaging',
  'door-to-door',
  'warehousing',
  'cross-stuffing',
  'customs-clearance',
  'secure-handling',
  'consulting',
  'air-freight',
];

export function sortServicesForDisplay<T extends { data: { slug: string } }>(services: T[]): T[] {
  return [...services].sort((a, b) => {
    const aIndex = SERVICE_DISPLAY_ORDER.indexOf(a.data.slug);
    const bIndex = SERVICE_DISPLAY_ORDER.indexOf(b.data.slug);
    return (aIndex === -1 ? SERVICE_DISPLAY_ORDER.length : aIndex) -
      (bIndex === -1 ? SERVICE_DISPLAY_ORDER.length : bIndex);
  });
}
