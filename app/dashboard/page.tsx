"use client";

import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  async function search(q: string, reset = false) {
    if (q.length < 3) {
      setResults([]);
      return;
    }

    const p = reset ? 0 : page;

    setLoading(true);
    const res = await axios.post("/api/protocol", {
      query: q,
      limit: 30,
      page: p,
    });

    if (reset) setResults(res.data);
    else setResults((prev) => [...prev, ...res.data]);

    setLoading(false);
  }

  async function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);

    setLoading(true);
    const res = await axios.post("/api/protocol", {
      query,
      limit: 30,
      page: nextPage,
    });
    setResults((prev) => [...prev, ...res.data]);
    setLoading(false);
  }

  function handleInput(v: string) {
    setQuery(v);
    setPage(0);
    search(v, true);
  }

  async function getImage(book: string, page: number, index: number) {
    const res = await axios.post("/api/getProtocolImage", { book, page });
    setSelected(index);
    setImgUrl(res.data.url);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-md sticky top-4 z-20">
        <div className="bg-white/80 backdrop-blur-lg shadow-md border border-gray-200 rounded-2xl px-5 py-3 flex items-center gap-3">
          <span className="text-gray-500 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search protocols..."
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 text-base sm:text-lg"
          />
        </div>
      </div>

      {loading && (
        <p className="text-gray-600 mt-4 text-base sm:text-lg animate-pulse">
          Searching…
        </p>
      )}

      <div className="w-full max-w-md mt-6 space-y-5 pb-20">
        {results.map((item, i) => (
          <div
            key={i}
            onClick={() => getImage(item.Book, item.Page, i)}
            className="cursor-pointer bg-white/85 active:scale-[.99] backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm
          hover:shadow-xl transition-all duration-300 px-5 py-4"
          >
            <h2 className="text-gray-900 font-semibold text-lg sm:text-xl leading-snug">
              {item.ListText}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {item.Book} • Page {item.Page}
            </p>

            {selected === i && imgUrl && (
              <div className="rounded-xl overflow-hidden shadow-md mt-4 animate-fadeIn">
                <img
                  src={imgUrl}
                  className="w-full object-contain max-h-[75vh]"
                />
              </div>
            )}
          </div>
        ))}

        {results.length > 0 && results.length % 30 === 0 && (
          <button
            onClick={loadMore}
            className="w-full py-3 bg-black text-white text-base font-medium rounded-xl hover:scale-[1.02] active:scale-[.98] transition"
          >
            Load More
          </button>
        )}
      </div>

      <style>{`
      @keyframes fadeIn {
        from { opacity:0; transform:translateY(6px) scale(.97) }
        to   { opacity:1; transform:translateY(0) scale(1) }
      }
      .animate-fadeIn { animation: fadeIn .4s ease forwards }
    `}</style>
    </div>
  );
}
