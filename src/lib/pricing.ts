// unit is used in schema only: 'KGM' = per kilogram, 'C62' = per item (UN/CEFACT codes).
// The on-page table doesn't state units per row, so confirm these match the real rates.
export const PRICING = [
  { item: 'General Items - clothes, shoes, toys, wood furniture, luggage', price: 5, unit: 'KGM' },
  { item: 'Electronics - small appliances (juicer, blender, small oven)', price: 12, unit: 'KGM' },
  { item: 'Mattress', price: 8, unit: 'KGM' },
  { item: 'Sofa', price: 12, unit: 'KGM' },
  { item: 'Furniture (dismantle)', price: 5, unit: 'KGM' },
  { item: 'Bicycle kids', price: 100, unit: 'C62' },
  { item: 'Bicycle adult', price: 150, unit: 'C62' },
];

export const PRICING_NOTE =
  'Above are indicative prices. AED 30/- doc fee per invoice applies. Packing charges vary and are additional.';

export const DELIVERY_DISCLAIMER =
  'Delivery to high-risk countries takes 40 to 150 working days from the invoice date. Delays may occur due to strikes, wars, port congestions, global problems, or political issues.';

export function buildOfferCatalogSchema(organizationId: string) {
  return {
    '@type': 'OfferCatalog',
    name: 'Cargo Shipping Rates (AED)',
    itemListElement: PRICING.map((row) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: row.item },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'AED',
        price: row.price,
        unitCode: row.unit,
      },
      seller: { '@id': organizationId },
    })),
  };
}
