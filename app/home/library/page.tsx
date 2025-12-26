"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Real Book Data
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

// Helper to get formatted title
const getTitle = (id: string) => id.replace(/_/g, " ");

// Helper to get random cover (seeded by id to be consistent)
const getCover = (id: string) =>
  `https://api.dicebear.com/9.x/shapes/svg?seed=${id}&backgroundColor=e3e8f8`;

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterBooks = (books: string[]) =>
    books.filter((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

  const tcmFiltered = filterBooks(TCM_BOOKS);
  const aaFiltered = filterBooks(AA_BOOKS);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-white font-display pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-6 border-b border-gray-100 dark:border-white/5">
        <h1 className="text-2xl font-bold tracking-tight">Library</h1>
        <p className="text-sm text-text-sub dark:text-gray-400 mt-1 mb-4">
          Your collection of healing wisdom
        </p>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search library..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white dark:bg-white/10 border border-transparent shadow-sm focus:border-primary focus:ring-0 text-sm outline-none"
          />
        </div>
      </div>

      <div className="p-6 space-y-10">
        {/* TCM Section */}
        {tcmFiltered.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 rounded-full bg-red-500"></span>
              <h2 className="text-xl font-bold">TCM Books</h2>
              <span className="text-xs font-bold bg-red-100 dark:bg-red-500/20 text-red-600 px-2 py-0.5 rounded-full ml-2">
                {tcmFiltered.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
              {tcmFiltered.map((bookId) => (
                <Link
                  href={`/home/library/${bookId}`}
                  key={bookId}
                  className="group flex flex-col gap-3"
                >
                  <div className="w-full aspect-[3/4] rounded-xl bg-gray-200 dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 relative group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                    <img
                      src={getCover(bookId)}
                      alt={bookId}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1 block">
                        TCM
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-main dark:text-white leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {getTitle(bookId)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ayurvedic Section */}
        {aaFiltered.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 rounded-full bg-green-500"></span>
              <h2 className="text-xl font-bold">Ayurvedic Acu</h2>
              <span className="text-xs font-bold bg-green-100 dark:bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full ml-2">
                {aaFiltered.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
              {aaFiltered.map((bookId) => (
                <Link
                  href={`/home/library/${bookId}`}
                  key={bookId}
                  className="group flex flex-col gap-3"
                >
                  <div className="w-full aspect-[3/4] rounded-xl bg-gray-200 dark:bg-white/5 overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 relative group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                    <img
                      src={getCover(bookId)}
                      alt={bookId}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1 block">
                        Ayurvedic
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-main dark:text-white leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {getTitle(bookId)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
