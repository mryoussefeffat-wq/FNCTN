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
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-volt/80 hover:shadow-xl hover:shadow-volt/10 active:scale-[0.99]"
    >
      {/* Event Photo & Sport Badge */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-ink">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-md bg-volt px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase text-ink">
            {event.sport}
          </span>
          {event.statusCategory === "live" && (
            <span className="animate-pulse rounded-md bg-red-600 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
              LIVE NOW
            </span>
          )}
        </div>

        {event.prize && (
          <div className="absolute bottom-2.5 right-3 font-mono text-xs font-bold text-volt">
            {event.prize}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="display text-lg sm:text-xl leading-snug text-white transition group-hover:text-volt">
          {event.title}
        </h3>

        {/* Dates & Venue */}
        <div className="mt-2.5 sm:mt-3 space-y-1.5 text-xs text-mute">
          <div className="flex items-center gap-2">
            <span className="text-volt">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-volt">📍</span>
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* 1. Sponsor Showcase Section (Dedicated body section with sized logo/badge) */}
        <div className="mt-3.5 border-t border-line/60 pt-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mute">
            Presented By:
          </p>
          <div className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/70 p-2.5 transition group-hover:border-volt/40">
            <span className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-card border border-volt/30 font-mono text-[10px] font-black text-volt shrink-0 shadow-sm">
              {event.sponsor.badge}
            </span>
            <div className="min-w-0 flex-1 truncate">
              <span className="block font-bold text-white text-xs truncate">
                {event.sponsor.name}
              </span>
              <span className="block font-mono text-[10px] text-mute truncate">
                {event.sponsor.tagline}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Fan Services Spectator Perks List */}
        <div className="mt-3 border-t border-line/60 pt-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-volt">
            Fan Services Available:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {event.fanServices.map((fs, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md border border-line bg-ink/70 px-2 py-1 font-mono text-[9px] sm:text-[10px] text-white"
              >
                <span>{fs.icon}</span>
                <span>{fs.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Card Tap CTA */}
        <div className="mt-4 sm:mt-5 flex min-h-[44px] items-center justify-between border-t border-line/60 pt-3.5">
          <span className="font-mono text-xs font-bold text-white transition group-hover:text-volt">
            View Tournament Hub →
          </span>
          <span className="rounded-full bg-volt/10 p-1.5 text-volt">
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
