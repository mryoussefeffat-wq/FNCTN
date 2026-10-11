import { useState } from "react"
import type { NewsArticle, MediaPhoto } from "../../../types/fanhub"

interface NewsMediaTabProps {
  news: NewsArticle[]
  mediaPhotos: MediaPhoto[]
}

export default function NewsMediaTab({
  news,
  mediaPhotos,
}: NewsMediaTabProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<MediaPhoto | null>(null)
  const [photoCategory, setPhotoCategory] = useState<string>("All")
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null)

  const filteredPhotos = mediaPhotos.filter((p) => {
    if (photoCategory === "All") return true
    return p.category === photoCategory
  })

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* ---------------- 1. ANNOUNCEMENTS & NEWS FEED ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="border-b border-line/80 pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
            📰 Official Newsroom
          </div>
          <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
            Announcements &amp; Match Recaps
          </h3>
          <p className="text-xs text-mute">
            Live press releases, tactical summaries, and safety updates from the tournament desk.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="p-8 text-center text-xs text-mute">
            No announcements published yet.
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {news.map((item) => {
              const isExpanded = expandedNewsId === item.id
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-line/80 bg-ink/70 p-4 sm:p-5 transition hover:border-volt/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-volt/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
                          {item.category}
                        </span>
                        <span className="font-mono text-xs text-mute">
                          {item.date}
                        </span>
                      </div>

                      <h4 className="display mt-2 text-base sm:text-lg text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1.5 text-xs text-mute leading-relaxed">
                        {item.snippet}
                      </p>

                      {isExpanded && (
                        <div className="mt-3 border-t border-line/60 pt-3 text-xs text-white/90 leading-relaxed animate-in fade-in duration-200">
                          <p>{item.content}</p>
                          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-volt">
                            <span>By: {item.author}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {item.image && (
                      <div className="h-28 w-full sm:w-44 shrink-0 overflow-hidden rounded-xl bg-card">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-line/50 pt-2.5">
                    <span className="font-mono text-[11px] text-mute">
                      Source: {item.author}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
                      className="font-mono text-xs text-volt hover:underline cursor-pointer"
                    >
                      {isExpanded ? "Collapse Article ↑" : "Read Full Story →"}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* ---------------- 2. PHOTO GALLERY ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
              📸 Visual Highlights
            </div>
            <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
              Spectator &amp; Pitch Photo Gallery
            </h3>
            <p className="text-xs text-mute">
              Captured moments from university clashes and fan celebrations.
            </p>
          </div>

          {/* Photo Category Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-line bg-ink p-1">
            {["All", "Action", "Crowd", "Ceremony"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPhotoCategory(cat)}
                className={`min-h-[34px] rounded-lg px-3 py-1 font-mono text-xs font-bold transition cursor-pointer ${
                  photoCategory === cat
                    ? "bg-volt text-white shadow-md shadow-volt/20"
                    : "text-mute hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="p-8 text-center text-xs text-mute">
            No media photos available in this category.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative overflow-hidden rounded-2xl border border-line bg-ink min-h-[220px] transition hover:border-volt/70 cursor-pointer shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition" />

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="rounded bg-volt/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-volt">
                    {photo.category}
                  </span>
                  <h4 className="font-bold text-white text-xs sm:text-sm mt-1 leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-mute truncate mt-0.5">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full overflow-hidden rounded-2xl border border-line bg-card p-4 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-mute hover:text-white cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full max-h-[70vh] object-contain rounded-xl bg-ink"
            />
            <div className="mt-3 text-left">
              <span className="font-mono text-xs text-volt uppercase font-bold">
                {selectedPhoto.category}
              </span>
              <h3 className="display text-lg text-white mt-0.5">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-mute mt-1">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
