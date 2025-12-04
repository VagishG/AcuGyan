import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

let cache: any[] | null = null

async function loadData() {
  if (cache) return cache
  const filePath = path.join(process.cwd(), "assets/data.json")
  const jsonData = await fs.readFile(filePath, "utf8")
  cache = JSON.parse(jsonData)
  return cache
}

export async function POST(request: Request) {
  const { query, limit = 30, page = 0 } = await request.json()

  if (!query || query.length < 3) return NextResponse.json([])

  const data = await loadData()
  const q = query.toLowerCase()

  const filtered = data?.filter((item: any) =>
    item.ListText?.toLowerCase().includes(q)
  )

  const start = page * limit
  const end = start + limit

  return NextResponse.json(filtered?.slice(start, end) || [])
}
