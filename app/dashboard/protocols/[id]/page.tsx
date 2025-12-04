export default function Dashboard() {
  return (
    <body className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-gray-200">
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="w-full px-4 sm:px-6 lg:px-10 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-[#111813] dark:text-gray-100">
              <svg
                className="size-6 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Acupressure Protocols
              </h2>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
          <div className="mb-8">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#111813] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 pl-3 text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="material-symbols-outlined text-xl">
                arrow_back
              </span>
              <span className="truncate">Back to search</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] text-[#111813] dark:text-white">
                  Headache &amp; Migraine Relief Protocol
                </p>
              </div>
              <p className="text-base font-normal leading-relaxed text-gray-600 dark:text-gray-400">
                This protocol is designed to alleviate tension and pain
                associated with headaches and migraines by targeting key
                pressure points known for their calming and analgesic
                properties.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                <h3 className="text-xl font-bold leading-tight tracking-[-0.015em] pb-4 text-[#111813] dark:text-white">
                  Steps
                </h3>
                <ol className="flex flex-col gap-6 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                      1
                    </div>
                    <p className="pt-1">
                      Locate the LI4 (Hegu) point in the fleshy web between your
                      thumb and index finger.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                      2
                    </div>
                    <p className="pt-1">
                      Using the thumb and index finger of your other hand, apply
                      firm, steady pressure to this point.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                      3
                    </div>
                    <p className="pt-1">
                      Hold the pressure for 30-60 seconds while taking slow,
                      deep breaths. You should feel a slight ache.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                      4
                    </div>
                    <p className="pt-1">
                      Release and then repeat the process on your other hand.
                      Perform as needed.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] bg-white dark:bg-gray-900/50 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-black/20 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  data-alt="Anatomical chart showing acupressure points on a hand"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQlG0tcbR_zwurdMCE9wvC0hqfflqPrdYdMa3IJRbj7HNyX9iAP0t1lu19EbeauogD646WgCNMNAU8kWWp3HR--QZ4PFYL3paBdpARBEF7Qkb_sjou6o7GyJGc_FoKlVQ7q7nMhkeI75v8wxbH4_zNJ-I3deQvXubgUbF6pcPviu6PRNqpeP0pEUP27sHjMgk2Y_k277bSKkHMo69Ka7dg7Le0PaH3Z6lx3BpdVlw6WGoCrKL4gC5qY8rpOEL-dIzcd6QhwRI6eYrD"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-4">
                <button className="flex items-center justify-center size-12 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    zoom_in
                  </span>
                </button>
                <button className="flex items-center justify-center size-12 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    fullscreen
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </body>
  );
}
