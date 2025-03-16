import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

const PAGE_TITLE = '記事一覧'

export const metadata: Metadata = {
  title: PAGE_TITLE + '｜Kakeibo Design',
}

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: any
  publishedAt: string
  author: {
    name: string
  }
}

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    author->{
      name
    }
  }`
  
  return client.fetch<Post[]>(query)
}

export default async function ArticlesPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{PAGE_TITLE}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow overflow-hidden">
            {post.mainImage && (
              <div className="relative h-48">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/articles/${post.slug.current}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500">
                <time>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</time>
                {post.author && (
                  <span className="ml-2">by {post.author.name}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}