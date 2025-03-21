import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'

interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

interface Block {
  _type: 'block'
  style: string
  children: {
    _type: string
    text: string
    marks?: string[]
  }[]
}

interface Post {
  title: string
  mainImage: SanityImage
  publishedAt: string
  author: {
    name: string
  }
  body: Block[]
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const post = await getPost(params.slug)

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">
        <time>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</time>
        {post.author && (
          <span className="ml-2">by {post.author.name}</span>
        )}
      </div>
      {post.mainImage && (
        <div className="relative h-[400px] mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const post = await getPost(params.slug)
  
  return {
    title: `${post.title}｜Kakeibo Design`,
  }
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    author->{
      name
    },
    body
  }`
  
  return client.fetch<Post>(query, { slug })
} 