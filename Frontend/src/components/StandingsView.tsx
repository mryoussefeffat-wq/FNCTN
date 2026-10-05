import { useState } from "react"
import { Phone, Scroll } from "./PhoneLayout"
import Logo from "./Logo"
import BottomNav, { type NavTab } from "./BottomNav"
import { LEAGUE_TABLES } from "../utils/constants"

interface StandingsViewProps {
  go: (tab: NavTab) => void
}

export default function StandingsView({ go }: StandingsViewProps) {
  const [sport, setSport] = useState<string>("Football")
  const sports = Object.keys(LEAGUE_TABLES)

  return (
    <Phone>
      <Scroll>
        <header className="mb-4 sm:mb-5 flex items-center justify-between">
          <Logo size="text-2xl" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
            Season 26
          </span>
        </header>
        <h1 className="display mb-3.5 sm:mb-4 text-3xl sm:text-4xl leading-none">
          League table
        </h1>

        {/* Sport Tabs */}
        <div
          role="tablist"
          className="mb-4 sm:mb-5 grid grid-cols-3 rounded-xl border border-line bg-card p-1"
        >
          {sports.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={s === sport}
              onClick={() => setSport(s)}
              className={`flex min-h-[40px] items-center justify-center rounded-lg py-2 text-xs sm:text-sm font-bold transition cursor-pointer active:scale-95 ${
                s === sport
                  ? "bg-volt text-ink shadow-sm"
                  : "text-mute hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Standings Table with Responsive Columns */}
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="grid grid-cols-[24px_1fr_30px_30px_38px] sm:grid-cols-[28px_1fr_36px_36px_44px] items-center gap-1 border-b border-line px-3 sm:px-4 py-2.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-mute">
            <span>#</span>
            <span>Team</span>
            <span className="text-right">W</span>
            <span className="text-right">L</span>
            <span className="text-right">Pts</span>
          </div>
          {LEAGUE_TABLES[sport].map(([team, pts, w, l], i) => {
            const first = i === 0
            return (
              <div
                key={team}
                className={`relative grid grid-cols-[24px_1fr_30px_30px_38px] sm:grid-cols-[28px_1fr_36px_36px_44px] items-center gap-1 border-b border-line/60 px-3 sm:px-4 py-2.5 sm:py-3 last:border-0 ${
                  first ? "bg-volt/10" : ""
                }`}
              >
                {first && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-volt" />
                )}
                <span
                  className={`font-mono text-xs sm:text-sm font-bold ${
                    first ? "text-volt" : "text-mute"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate text-xs sm:text-sm font-bold text-white">
                  {team}
                </span>
                <span className="text-right font-mono text-xs sm:text-sm tabular-nums">
                  {w}
                </span>
                <span className="text-right font-mono text-xs sm:text-sm tabular-nums text-mute">
                  {l}
                </span>
                <span
                  className={`text-right font-mono text-xs sm:text-sm font-bold tabular-nums ${
                    first ? "text-volt" : ""
                  }`}
                >
                  {pts}
                </span>
              </div>
            )
          })}
        </div>
      </Scroll>
      <BottomNav active="standings" go={go} />
    </Phone>
  )
}
