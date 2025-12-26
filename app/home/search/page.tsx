"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

// Interface for API response
interface Protocol {
  PageNumber: number | null;
  Disease: string | null;
  Area: string | null;
  ListId: number;
  ListText: string;
  IndexText: string;
  Book: string;
  Page: number;
}

// Categorized Books
const TCM_BOOKS = [
  "Treatise_1",
  "Treatise_2",
  "Treatise_3",
  "Treatise_4",
  "Treatise_5",
  "Treatise_6",
  "Treatise_7",
  "Treatise_8",
  "Treatise_9",
  "Treatise_10",
  "Treatise_11",
  "Treatise_12",
  "Treatise_13",
  "Treatise_14",
  "Treatise_15",
  "Treatise_16",
  "Treatise_17",
  "Treatise_18",
  "Treatise_19",
  "Treatise_20",
  "Treatise_21",
  "Treatise_22",
  "Treatise_23",
  "Treatise_24",
  "One_point_Treatment_Book-1",
  "One_point_Treatment_Book-2",
  "Female_Disorders_-_Chinese_Acu",
];

const AA_BOOKS = [
  "1_Point_Treatment_for_Old_Age_Problems",
  "Aatray",
  "Bharadwaj",
  "CM_in_AM_Vol-1",
  "CM_in_AM_Vol-2",
  "Charak1",
  "Charak2",
  "Charak3",
  "Children_Health_Guide",
  "Chyawan_Vol-2",
  "Colour_Therapy_Vol-1",
  "Colour_Therapy_Vol-2",
  "Constipation_-_Ayurvedic_Acu",
  "Dhanwantri",
  "Female_Disorders_-_Ayurvedic_Acu",
  "Hippocratus1",
  "Hippocratus2",
  "Maget_Theraphy_Vol-2",
  "Sushrut_Case_Manual_1",
  "Sushrut_Case_Manual_2",
  "Sushrut_Case_Manual_3",
  "Susruta_Rang_Chikithsa",
  "Treatment_Hand_Book-Vol-3",
];

const ALL_BOOKS = [...TCM_BOOKS, ...AA_BOOKS].sort();

export default function SearchPage() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [results, setResults] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(false);

  // Image Viewer State
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(
    null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [bookSearch, setBookSearch] = useState("");

  // Search Effect
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/protocol", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: debouncedSearch,
            books: selectedBooks.length > 0 ? selectedBooks : [], // If empty, search all
          }),
        });
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, selectedBooks]);

  const handleResultClick = async (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setImageUrl(null);
    setImageLoading(true);

    try {
      const res = await fetch("/api/getProtocolImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book: protocol.Book, page: protocol.Page }),
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert("Image not found");
      }
    } catch (error) {
      console.error("Image fetch error:", error);
      alert("Failed to load image");
    } finally {
      setImageLoading(false);
    }
  };

  const closeImageViewer = () => {
    setSelectedProtocol(null);
    setImageUrl(null);
  };

  const toggleCategory = (category: string) => {
    let newCategories: string[];
    let newBooks = [...selectedBooks];

    if (selectedCategories.includes(category)) {
      // Deselecting category
      newCategories = selectedCategories.filter((c) => c !== category);
      // Remove books belonging to this category from selectedBooks
      const booksToRemove = category === "TCM" ? TCM_BOOKS : AA_BOOKS;
      newBooks = newBooks.filter((b) => !booksToRemove.includes(b));
    } else {
      // Selecting category
      newCategories = [...selectedCategories, category];
      // Add books belonging to this category
      const booksToAdd = category === "TCM" ? TCM_BOOKS : AA_BOOKS;
      // Add only unique books
      newBooks = Array.from(new Set([...newBooks, ...booksToAdd]));
    }

    setSelectedCategories(newCategories);
    setSelectedBooks(newBooks);
  };

  const toggleBook = (book: string) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter((b) => b !== book));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const selectAllBooks = () => {
    if (selectedBooks.length === ALL_BOOKS.length) {
      setSelectedBooks([]);
      setSelectedCategories([]);
    } else {
      setSelectedBooks(ALL_BOOKS);
      setSelectedCategories(["TCM", "AA"]);
    }
  };

  const filteredBooks = ALL_BOOKS.filter((book) =>
    book.toLowerCase().includes(bookSearch.toLowerCase())
  );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white font-display relative pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-background-light dark:bg-background-dark px-4 py-4 border-b border-gray-100 dark:border-white/5">
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protocol (min 3 chars)..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white dark:bg-white/5 border border-transparent focus:border-primary focus:ring-0 shadow-sm text-sm placeholder:text-text-sub/50 dark:placeholder:text-gray-500 text-text-main dark:text-white transition-all outline-none"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl shadow-sm border border-transparent active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-text-main dark:text-white">
              tune
            </span>
          </button>
        </div>

        {/* Results Info */}
        <div className="mt-4 px-1">
          <p className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">
            {loading ? "Searching..." : `${results.length} Results Found`}
          </p>
        </div>
      </div>

      {/* Results List */}
      <div className="flex flex-col gap-4 p-4">
        {results.map((item, index) => (
          <div
            key={item.ListId + "-" + index}
            onClick={() => handleResultClick(item)}
            className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {/* Thumbnail Placeholder */}
            <div
              className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden text-xl font-bold uppercase ${
                TCM_BOOKS.includes(item.Book)
                  ? "bg-red-100 dark:bg-red-500/20 text-red-600"
                  : "bg-green-100 dark:bg-green-500/20 text-green-600"
              }`}
            >
              {item.Book ? item.Book.substring(0, 2) : "??"}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow justify-center gap-1">
              <h3 className="font-bold text-base leading-tight text-text-main dark:text-white line-clamp-2">
                {item.ListText}
              </h3>
              <p className="text-xs text-text-sub dark:text-gray-400 font-medium line-clamp-1">
                {item.Book} • Pg {item.Page}
              </p>
              <div className="flex gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                    TCM_BOOKS.includes(item.Book)
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {TCM_BOOKS.includes(item.Book) ? "TCM" : "AA"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700">
                  {item.IndexText?.split(":")[0]}
                </span>
              </div>
            </div>
          </div>
        ))}

        {!loading && results.length === 0 && searchQuery.length >= 3 && (
          <div className="text-center py-10 text-text-sub dark:text-gray-500">
            No protocols found.
          </div>
        )}
      </div>

      {/* Image Viewer Modal */}
      {selectedProtocol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200">
          <button
            onClick={closeImageViewer}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <h2 className="text-white font-bold text-lg mb-4 text-center">
              {selectedProtocol.ListText}
            </h2>

            <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
              {imageLoading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={selectedProtocol.ListText}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl bg-white"
                />
              ) : (
                <div className="text-white text-center">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                    broken_image
                  </span>
                  <p>Image not available</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-4 text-white/80 text-sm">
              <span>
                Source: <strong>{selectedProtocol.Book}</strong>
              </span>
              <span>
                Page: <strong>{selectedProtocol.Page}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bottom Sheet Overlay */}
      {isFilterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a2c24] z-50 rounded-t-[32px] shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
            {/* Handle */}
            <div
              className="w-full flex justify-center pt-3 pb-1"
              onClick={() => setIsFilterOpen(false)}
            >
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
              <h2 className="text-xl font-bold">Filter Results</h2>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBooks([]);
                  setVerifiedOnly(false);
                }}
                className="text-primary text-sm font-semibold hover:opacity-80"
              >
                Reset
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
              {/* Category Section */}
              <section>
                <h3 className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-widest mb-4">
                  Category
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      id: "TCM",
                      label: "TCM (Traditional Chinese Medicine)",
                      initial: "T",
                    },
                    {
                      id: "AA",
                      label: "AA (Ayurvedic Acupressure)",
                      initial: "A",
                    },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                          selectedCategories.includes(item.id)
                            ? "bg-primary border-primary"
                            : "bg-white dark:bg-white/5 border-gray-300 dark:border-white/20"
                        }`}
                      >
                        {selectedCategories.includes(item.id) && (
                          <span className="material-symbols-outlined text-white text-sm font-bold">
                            check
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                          item.id === "TCM"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.initial}
                      </div>

                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCategories.includes(item.id)}
                        onChange={() => toggleCategory(item.id)}
                      />
                      <span className="text-base font-medium text-text-main dark:text-white">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
              {/* Books Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-widest">
                    Books
                  </h3>
                  <span
                    onClick={selectAllBooks}
                    className="text-primary text-xs font-semibold cursor-pointer"
                  >
                    {selectedBooks.length === ALL_BOOKS.length
                      ? "Deselect All"
                      : "Select All"}
                  </span>
                </div>

                {/* Book Search */}
                <div className="relative mb-4">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    search
                  </span>
                  <input
                    type="text"
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    placeholder="Search books..."
                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-white/10 border-gray-200 dark:border-white/10 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  {filteredBooks.map((book) => (
                    <label
                      key={book}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          selectedBooks.includes(book)
                            ? "bg-primary border-primary"
                            : "bg-white dark:bg-white/5 border-gray-300 dark:border-white/20"
                        }`}
                      >
                        {selectedBooks.includes(book) && (
                          <span className="material-symbols-outlined text-white text-xs font-bold">
                            check
                          </span>
                        )}
                      </div>

                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedBooks.includes(book)}
                        onChange={() => toggleBook(book)}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-main dark:text-white leading-tight">
                          {book.replace(/_/g, " ")}
                        </span>
                        <span className="text-[10px] text-text-sub dark:text-gray-400">
                          {TCM_BOOKS.includes(book) ? "TCM" : "Ayurvedic"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
              <div className="h-20" /> {/* Spacer for button */}
            </div>

            {/* Apply Button Footer */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white dark:bg-[#1a2c24] border-t border-gray-100 dark:border-white/5">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                Apply Filters
                {(selectedCategories.length > 0 ||
                  selectedBooks.length > 0 ||
                  verifiedOnly) && (
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded ml-1">
                    {selectedBooks.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
