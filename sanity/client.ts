import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Use the API directly so Studio edits (including clearing a field) appear immediately.
export const sanityClient = projectId ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false }) : null;
