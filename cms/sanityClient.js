import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'qq18jngx',
  dataset: 'production',
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})
