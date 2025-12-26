import { NextResponse } from "next/server";
import { storage } from "@/lib/firebaseAdmin";
import { Readable } from "stream";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  try {
    const { bookId } = await params;

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const filePath = `Books/${bookId}_ocr.pdf`;
    const file = storage.file(filePath);

    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json(
        { error: "Book PDF not found" },
        { status: 404 }
      );
    }

    // Create a read stream from the file
    // We convert the Node.js Readable stream to a Web ReadableStream for NextResponse
    const nodeStream = file.createReadStream();
    const webStream = Readable.toWeb(nodeStream as Readable);

    return new NextResponse(webStream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error streaming PDF:", error);
    return NextResponse.json(
      { error: "Failed to stream PDF" },
      { status: 500 }
    );
  }
}
