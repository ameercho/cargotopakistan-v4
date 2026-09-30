import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seo = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().optional(),
  ogImage: z.string().optional(),
  h1: z.string(),
});

// Pakistan destination cities: /pakistan-cargo-to-{slug}
const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: seo.extend({
    city: z.string(),
    slug: z.string(),
    description: z.string(),
    areas: z.array(z.string()),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    heroImage: z.string().optional(),
    legacySlug: z.string().optional(), // for the 4 cities with a duplicate old "-cargo" URL
  }),
});

// UAE-side pages: origins (/{slug}-to-pakistan) and areas (/areas/{slug})
// Same content shape; pageType decides which page file queries it.
const uaeLocations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uaeLocations' }),
  schema: seo.extend({
    pageType: z.enum(['origin', 'area']),
    city: z.string(),
    slug: z.string(),
    locations: z.array(z.string()),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    heroImage: z.string().optional(),
  }),
});

// Services: /services/{slug}
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: seo.extend({
    name: z.string(), // short display name, e.g. "Sea Freight" — distinct from the SEO `title`
    slug: z.string(),
    heroDescription: z.string(),
    servicesList: z.array(
      z.object({ title: z.string(), description: z.string(), icon: z.string() })
    ),
    benefits: z.array(z.object({ title: z.string(), description: z.string(), icon: z.string() })),
    relatedCities: z.array(z.string()).optional(),
  }),
});

export const collections = { destinations, uaeLocations, services };
