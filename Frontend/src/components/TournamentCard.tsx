import type { TournamentEvent } from "../types/tournament"

interface TournamentCardProps {
  event: TournamentEvent
  onSelect: (event: TournamentEvent) => void
}

export default function TournamentCard({
  event,
  onSelect,
}: TournamentCardProps) {
  return (
    <div
      onClick={() => onSelect(event)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] transition hover:border-[#A60E13]/80 hover:shadow-xl hover:shadow-[#A60E13]/10 active:scale-[0.99]"
    >
      {/* Event Photo & Sport Badge */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#000000]">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-md bg-[#A60E13] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white shadow-sm">
            {event.sport}
          </span>
          {event.statusCategory === "live" && (
            <span className="animate-pulse rounded-md bg-[#A60E13] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white border border-white/30">
              LIVE NOW
            </span>
          )}
        </div>

        {event.prize && (
          <div className="absolute bottom-2.5 right-3 rounded-md bg-[#000000]/80 border border-[#A60E13]/40 px-2 py-0.5 font-mono text-xs font-bold text-white backdrop-blur-md">
            🏆 {event.prize}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-sans font-semibold text-lg sm:text-xl leading-snug text-white transition group-hover:text-[#A60E13]">
          {event.title}
        </h3>

        {/* Dates & Venue */}
        <div className="mt-2.5 sm:mt-3 space-y-1.5 text-xs text-[#8E8E93]">
          <div className="flex items-center gap-2">
            <span className="text-[#A60E13]">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A60E13]">📍</span>
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* 1. Sponsor Showcase Section (Dedicated body section with sized logo/badge) */}
        <div className="mt-3.5 border-t border-[#1F1F24] pt-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
            Presented By:
          </p>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 transition group-hover:border-[#A60E13]/40">
            <span className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#A60E13]/30 font-mono text-[10px] font-bold text-white shrink-0 shadow-sm">
              {event.sponsor.badge}
            </span>
            <div className="min-w-0 flex-1 truncate">
              <span className="block font-semibold text-white text-xs truncate">
                {event.sponsor.name}
              </span>
              <span className="block font-mono text-[10px] text-[#8E8E93] truncate">
                {event.sponsor.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Fan Services Spectator Perks List */}
        <div className="mt-3 border-t border-[#1F1F24] pt-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
            Fan Services Available:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {event.fanServices.map((fs, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md border border-[#1F1F24] bg-[#000000] px-2 py-1 font-mono text-[9px] sm:text-[10px] text-white"
              >
                <span>{fs.icon}</span>
                <span>{fs.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Card Tap CTA */}
        <div className="mt-4 sm:mt-5 flex min-h-[44px] items-center justify-between border-t border-[#1F1F24] pt-3.5">
          <span className="font-mono text-xs font-bold text-white transition group-hover:text-[#A60E13]">
            View Tournament Hub →
          </span>
          <span className="rounded-full bg-[#A60E13]/15 p-1.5 text-[#A60E13]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

