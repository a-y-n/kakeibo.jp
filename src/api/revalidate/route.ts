import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // トークンの検証
    const token = req.headers.get('authorization')
    if (token !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const body = await req.json()
    revalidatePath(`/articles/${body.slug}`)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ revalidated: false, error: err })
  }
}