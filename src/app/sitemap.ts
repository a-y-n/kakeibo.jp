import { client } from '@/lib/sanity'
import { MetadataRoute } from 'next'

interface Post {
  slug: {
    current: string
  }
  _updatedAt: string
}

async function getPosts() {
  const query = `*[_type == "post"] {
    slug,
    _updatedAt
  }`
  return client.fetch<Post[]>(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kakeibo.jp' // ドメインごとに変更

  // 静的なページのURL
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // 記事ページのURL
  const posts = await getPosts()
  const dynamicPages = posts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...dynamicPages]
} 