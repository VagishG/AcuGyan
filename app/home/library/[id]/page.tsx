"use client";

import React, { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF Worker
// Using unpkg CDN to load the worker script matching the installed pdfjs version to avoid build configuration issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Helper to get formatted title
const getTitle = (id: string) => id.replace(/_/g, " ");

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  // PDF State
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Update container width on resize for responsive PDF
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial width
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Determine optimal scale based on container width
  // If container is small (mobile), page should fit width.
  // If large, we might want to respect the manual scale.
  const pdfWidth = containerWidth > 0 ? containerWidth : undefined;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) =>
      Math.min(Math.max(1, prevPageNumber + offset), numPages)
    );
  }

  return (
    <div
      className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white font-display relative flex flex-col h-screen select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header with Controls */}
      <div className="flex-shrink-0 px-4 py-3 bg-white dark:bg-[#1a2c24] border-b border-gray-100 dark:border-white/5 flex items-center justify-between shadow-sm z-20 gap-4">
        <Link
          href="/home/library"
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-black/20 rounded-lg p-1">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Previous Page"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>
          <span className="text-xs font-bold font-mono min-w-[60px] text-center">
            {pageNumber} / {numPages || "--"}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
            title="Next Page"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>

        {/* Zoom Controls (Hidden on small mobile if needed, but useful) */}
        <div className="flex items-center gap-1 hidden sm:flex">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-sub"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-sm">remove</span>
          </button>
          <button
            onClick={() => setScale((s) => Math.min(3, s + 0.1))}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-sub"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </div>

      {/* PDF Viewport */}
      <div
        ref={containerRef}
        className="flex-grow relative bg-gray-100 dark:bg-[#121c18] overflow-auto flex justify-center p-4"
      >
        <Document
          file={`/api/pdf/${id}`}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-medium text-text-sub dark:text-gray-400">
                Loading Book...
              </p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">
                  error_outline
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Failed to Load Book</h3>
              <p className="text-sm text-text-sub dark:text-gray-400">
                Ensure the file exists in the database.
              </p>
            </div>
          }
          className="flex flex-col gap-4 shadow-2xl"
        >
          {/* Render Current Page */}
          {numPages > 0 && (
            <Page
              pageNumber={pageNumber}
              width={pdfWidth ? pdfWidth * scale : undefined}
              className="shadow-xl bg-white"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      </div>
    </div>
  );
}
