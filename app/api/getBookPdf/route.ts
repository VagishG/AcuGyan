import { NextResponse } from "next/server";
import { storage } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Construct the file path based on user instruction
    // Format: Books/<BookName>_ocr.pdf
    const filePath = `Books/${bookId}_ocr.pdf`;
    const file = storage.file(filePath);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: "Book PDF not found" },
        { status: 404 }
      );
    }

    // Generate signed URL
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60, // 1 hour
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error fetching PDF URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDF URL" },
      { status: 500 }
    );
  }
}
