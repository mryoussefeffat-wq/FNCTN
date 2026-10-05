import type { LiveMatchDetails } from "../../../types/fanhub"

interface LiveNowBannerProps {
  liveMatch: LiveMatchDetails
  onOpenLiveMatch: (matchId: string, tournamentId: string) => void
}

export default function LiveNowBanner({
  liveMatch,
  onOpenLiveMatch,
}: LiveNowBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-card/90 to-red-950/20 p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition hover:border-red-500/70">
      {/* Ambient background glow */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-volt/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Live indicator & match overview */}
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-2.5 py-0.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              LIVE NOW · {liveMatch.period} ({liveMatch.matchClock})
            </span>

            <span className="rounded-md border border-volt/30 bg-volt/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase text-volt">
              {liveMatch.sponsor.badge}
            </span>
          </div>

          <h3 className="display text-base sm:text-lg lg:text-xl text-white">
            {liveMatch.tournamentTitle}
          </h3>

          <p className="text-xs sm:text-sm text-mute">
            {liveMatch.stage} · {liveMatch.teamA.uniBadge} vs {liveMatch.teamB.uniBadge}
          </p>
        </div>

        {/* Center: Live Score Display */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 rounded-xl border border-line/80 bg-ink/70 px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-xl">{liveMatch.teamA.logo}</span>
            <div className="text-right">
              <span className="block font-bold text-white text-xs sm:text-sm">
                {liveMatch.teamA.uniBadge}
              </span>
              <span className="hidden sm:block text-[10px] text-mute">Titans</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-black text-white tabular-nums">
            <span>{liveMatch.scoreA}</span>
            <span className="text-volt">:</span>
            <span>{liveMatch.scoreB}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-left">
              <span className="block font-bold text-white text-xs sm:text-sm">
                {liveMatch.teamB.uniBadge}
              </span>
              <span className="hidden sm:block text-[10px] text-mute">Eagles</span>
            </div>
            <span className="text-base sm:text-xl">{liveMatch.teamB.logo}</span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => onOpenLiveMatch(liveMatch.id, liveMatch.tournamentId)}
            className="flex min-h-[46px] w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-volt px-5 py-2.5 text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-lg shadow-volt/25 cursor-pointer"
          >
            <span>Enter Live Match Center</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
