import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-08',
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getProjects() {
  const projects = await client.fetch('*[_type == "project"]')
  return projects
}
