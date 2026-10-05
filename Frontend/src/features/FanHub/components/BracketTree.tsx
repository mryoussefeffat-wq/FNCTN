import type { BracketMatchNode } from "../../../types/fanhub"

interface BracketTreeProps {
  bracket: BracketMatchNode[]
  onOpenLiveMatch?: (matchId: string) => void
}

export default function BracketTree({
  bracket,
  onOpenLiveMatch,
}: BracketTreeProps) {
  if (!bracket || bracket.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-ink/60 p-8 text-center text-xs text-mute">
        Knockout brackets will be generated once group stages conclude.
      </div>
    )
  }

  const qfMatches = bracket.filter((m) => m.round === "Quarter-Finals")
  const sfMatches = bracket.filter((m) => m.round === "Semi-Finals")
  const finalMatches = bracket.filter((m) => m.round === "Final")

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mobile Swipe Hint */}
      <div className="flex items-center justify-between text-xs text-mute md:hidden px-1">
        <span className="font-mono text-[10px] text-volt">
          ↔ Swipe horizontally to explore full bracket
        </span>
        <span className="font-mono text-[10px] text-mute">Knockout Tree</span>
      </div>

      {/* Bracket Horizontal Container */}
      <div className="w-full overflow-x-auto pb-4 no-scrollbar [-webkit-overflow-scrolling:touch]">
        <div className="flex min-w-[760px] lg:min-w-full items-stretch justify-between gap-6 px-2 py-2">
          {/* Column 1: Quarter-Finals */}
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="rounded-lg border border-line bg-card/80 px-3 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-mute">
              Quarter-Finals (4 Matches)
            </div>
            <div className="flex flex-col gap-4">
              {qfMatches.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  match={m}
                  onOpenLiveMatch={onOpenLiveMatch}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Semi-Finals */}
          <div className="flex flex-1 flex-col justify-around gap-4">
            <div className="rounded-lg border border-line bg-card/80 px-3 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-mute">
              Semi-Finals (2 Matches)
            </div>
            <div className="flex flex-col gap-8 my-auto">
              {sfMatches.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  match={m}
                  onOpenLiveMatch={onOpenLiveMatch}
                />
              ))}
            </div>
          </div>

          {/* Column 3: Grand Final */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="rounded-lg border border-volt/40 bg-volt/10 px-3 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-volt">
              🏆 Grand Championship Final
            </div>
            <div className="my-auto">
              {finalMatches.map((m) => (
                <BracketMatchCard
                  key={m.id}
                  match={m}
                  isGrandFinal
                  onOpenLiveMatch={onOpenLiveMatch}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BracketMatchCard({
  match,
  isGrandFinal = false,
  onOpenLiveMatch,
}: {
  match: BracketMatchNode
  isGrandFinal?: boolean
  onOpenLiveMatch?: (matchId: string) => void
}) {
  const isLive = match.status === "live"

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-3 transition backdrop-blur-md ${
        isGrandFinal
          ? "border-volt/60 bg-gradient-to-b from-card to-volt/5 shadow-xl shadow-volt/10"
          : isLive
            ? "border-red-500/60 bg-card shadow-lg shadow-red-500/10"
            : "border-line bg-card/90 hover:border-line/90"
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between text-[10px] font-mono text-mute pb-2 border-b border-line/60">
        <span className="truncate">{match.pitch}</span>
        {isLive ? (
          <span className="flex items-center gap-1 font-bold text-red-400">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-red-400" />
            LIVE
          </span>
        ) : match.status === "completed" ? (
          <span className="text-mute">FINAL</span>
        ) : (
          <span className="text-volt">{match.time}</span>
        )}
      </div>

      {/* Teams and Scores */}
      <div className="mt-2 flex flex-col gap-1.5">
        {/* Team A */}
        <div
          className={`flex items-center justify-between rounded-lg px-2 py-1 text-xs transition ${
            match.teamA.isWinner
              ? "bg-volt/15 font-bold text-volt"
              : match.winnerId && match.winnerId !== match.teamA.id
                ? "text-mute opacity-60"
                : "text-white"
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            <span className="rounded bg-ink px-1 font-mono text-[9px] text-mute">
              #{match.teamA.seed}
            </span>
            <span className="truncate">{match.teamA.name}</span>
          </div>
          {match.teamA.score !== undefined && (
            <span className="font-mono font-black tabular-nums text-sm ml-2">
              {match.teamA.score}
            </span>
          )}
        </div>

        {/* Team B */}
        <div
          className={`flex items-center justify-between rounded-lg px-2 py-1 text-xs transition ${
            match.teamB.isWinner
              ? "bg-volt/15 font-bold text-volt"
              : match.winnerId && match.winnerId !== match.teamB.id
                ? "text-mute opacity-60"
                : "text-white"
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            <span className="rounded bg-ink px-1 font-mono text-[9px] text-mute">
              #{match.teamB.seed}
            </span>
            <span className="truncate">{match.teamB.name}</span>
          </div>
          {match.teamB.score !== undefined && (
            <span className="font-mono font-black tabular-nums text-sm ml-2">
              {match.teamB.score}
            </span>
          )}
        </div>
      </div>

      {/* Live action trigger */}
      {isLive && onOpenLiveMatch && (
        <button
          type="button"
          onClick={() => onOpenLiveMatch(match.id)}
          className="mt-2.5 flex w-full items-center justify-center gap-1 rounded-lg bg-red-600/20 py-1.5 font-mono text-[10px] font-bold uppercase text-red-300 hover:bg-red-600/30 cursor-pointer"
        >
          <span>Watch Live Match Center →</span>
        </button>
      )}
    </div>
  )
}
