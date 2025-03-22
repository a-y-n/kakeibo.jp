import { createClient } from 'next-sanity'
import { projectId, dataset } from '../../sanity.cli'

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-19',
  useCdn: false,
  perspective: 'previewDrafts'
})