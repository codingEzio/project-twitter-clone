import { createClient } from 'next-sanity';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATESET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2022-09-29',
  useCdn: process.env.NODE_ENV === 'production',
};

// Fetch content from Sanity
export const sanityClient = createClient(config);
