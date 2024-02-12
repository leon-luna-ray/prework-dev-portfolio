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

export async function fetchProjects() {
  const query = '*[_type == "project" && status != "n/a"] | order(title asc)';
  const projects = await client.fetch(query);

  return projects;
}


// API Queries
const queryGlobalSettings = `*[_type == "globalSettings"][0]`
const queryProjects =`*[_type == "project" && status != "n/a"] | order(title asc){
  ...,
  "mainImage": mainImage.asset->{
    _id,
    title,
    altText,
    description,
  }
}`
const queryProfile = `*[_type == "profileDetails"][0]{
    ...,
    "image": image.asset->{
      _id,
      title,
      altText,
      description,
    }
  }`


// API Requests
export async function fetchHomePage() {
  const query = `{
      "global": ${queryGlobalSettings},
      "profile": ${queryProfile},
      "projects": ${queryProjects},
  }`;
  const data = await client.fetch(query);

  return data;
}
