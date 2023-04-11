import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-08',
});

export async function fetchProfile() {
  const query = '*[_type == "profileDetails"][0]';
  const profile = await client.fetch(query);

  return profile;
}

export async function fetchFeaturedProjects() {
  const query = '*[_type == "project" && featured] | order(_updatedAt desc)';
  const projects = await client.fetch(query);

  return projects;
}
