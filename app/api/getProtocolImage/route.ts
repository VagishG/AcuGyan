import { NextResponse } from "next/server"
import { storage } from "@/lib/firebaseAdmin"

export async function POST(req: Request) {
  const { page, book } = await req.json()

  if (!book || !page)
    return NextResponse.json({ error: "book or page missing" }, { status: 400 })

  const filePath = `Pages/${book}/${page}.jpg`
  const file = storage.file(filePath)

  try {
    const [exists] = await file.exists()
    if (!exists) return NextResponse.json({ error: "not found in firebase" }, { status: 404 })

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 15 // valid for 15 minutes
    })

    return NextResponse.json({ url })
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
