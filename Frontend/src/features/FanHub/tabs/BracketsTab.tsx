import { useState } from "react"
import type { FanHubTournament } from "../../../types/fanhub"
import BracketTree from "../components/BracketTree"

interface BracketsTabProps {
  tournament: FanHubTournament
  onOpenLiveMatch: (matchId: string) => void
}

export default function BracketsTab({
  tournament,
  onOpenLiveMatch,
}: BracketsTabProps) {
  const [viewSubTab, setViewSubTab] = useState<"bracket" | "schedule">("bracket")
  const [stageFilter, setStageFilter] = useState<string>("All")

  const stages = [
    "All",
    ...new Set(tournament.schedule.map((s) => s.stage)),
  ]

  const filteredSchedule = tournament.schedule.filter((s) => {
    if (stageFilter === "All") return true
    return s.stage === stageFilter
  })

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* ---------------- SUB-VIEW TOGGLE ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-line bg-card/80 p-3 sm:p-4 backdrop-blur-md">
        <div>
          <h3 className="display text-lg sm:text-xl text-white">
            Matches &amp; Knockout Progression
          </h3>
          <p className="text-xs text-mute">
            Explore the single-elimination tournament tree or chronological schedule.
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-line bg-ink p-1">
          <button
            type="button"
            onClick={() => setViewSubTab("bracket")}
            className={`min-h-[36px] rounded-lg px-3 py-1 font-mono text-xs font-bold transition cursor-pointer ${
              viewSubTab === "bracket"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            Visual Bracket Tree
          </button>
          <button
            type="button"
            onClick={() => setViewSubTab("schedule")}
            className={`min-h-[36px] rounded-lg px-3 py-1 font-mono text-xs font-bold transition cursor-pointer ${
              viewSubTab === "schedule"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            Chronological Schedule ({tournament.schedule.length})
          </button>
        </div>
      </div>

      {/* ---------------- 1. VISUAL BRACKET TREE ---------------- */}
      {viewSubTab === "bracket" ? (
        <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-4 sm:p-7 backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between border-b border-line/80 pb-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-volt font-bold">
                Knockout Tree
              </span>
              <h4 className="display text-base sm:text-lg text-white">
                Elimination Stages to the Trophy
              </h4>
            </div>
            <span className="font-mono text-xs text-mute">
              {tournament.teamsCountLabel}
            </span>
          </div>

          <BracketTree
            bracket={tournament.bracket}
            onOpenLiveMatch={onOpenLiveMatch}
          />
        </section>
      ) : (
        /* ---------------- 2. CHRONOLOGICAL MATCH SCHEDULE ---------------- */
        <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-4 sm:p-7 backdrop-blur-md">
          {/* Stage Filters */}
          <div className="mb-5 flex flex-wrap items-center gap-1.5 border-b border-line/80 pb-4">
            <span className="font-mono text-[10px] uppercase text-mute mr-1">
              Filter Stage:
            </span>
            {stages.map((stg) => (
              <button
                key={stg}
                type="button"
                onClick={() => setStageFilter(stg)}
                className={`min-h-[34px] rounded-lg px-3 py-1 font-mono text-xs font-bold transition cursor-pointer ${
                  stageFilter === stg
                    ? "border border-volt bg-volt/15 text-volt"
                    : "border border-line/70 bg-ink/70 text-mute hover:text-white"
                }`}
              >
                {stg}
              </button>
            ))}
          </div>

          {filteredSchedule.length === 0 ? (
            <div className="p-8 text-center text-xs text-mute">
              No matches scheduled for this stage filter.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredSchedule.map((m) => {
                const isLive = m.status === "live"
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col md:flex-row md:items-center justify-between gap-3.5 rounded-2xl border p-4 transition ${
                      isLive
                        ? "border-red-500/60 bg-red-950/20"
                        : "border-line bg-ink/70 hover:border-line/90"
                    }`}
                  >
                    {/* Time, Date, Pitch */}
                    <div className="flex flex-col gap-1 min-w-[170px]">
                      <div className="flex items-center gap-2">
                        {isLive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-600/30 border border-red-500/40 px-2 py-0.5 font-mono text-[9px] font-bold text-red-300">
                            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-red-400" />
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="rounded bg-card px-2 py-0.5 font-mono text-[10px] text-mute">
                            {m.stage}
                          </span>
                        )}
                        <span className="font-mono text-xs text-volt font-bold">
                          {m.time}
                        </span>
                      </div>
                      <span className="text-xs text-white font-medium">{m.date}</span>
                      <span className="text-[11px] text-mute">📍 {m.pitch}</span>
                    </div>

                    {/* Matchup */}
                    <div className="flex flex-1 items-center justify-center gap-4 sm:gap-8 py-2">
                      {/* Team A */}
                      <div className="flex items-center justify-end gap-2 text-right flex-1">
                        <div>
                          <span className="block font-bold text-white text-xs sm:text-sm">
                            {m.teamA.name}
                          </span>
                          <span className="text-[10px] text-mute font-mono">
                            {m.teamA.uni}
                          </span>
                        </div>
                        {m.teamA.score !== undefined && (
                          <span className="font-mono text-lg font-black text-white tabular-nums">
                            {m.teamA.score}
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-xs font-bold text-mute">vs</span>

                      {/* Team B */}
                      <div className="flex items-center justify-start gap-2 text-left flex-1">
                        {m.teamB.score !== undefined && (
                          <span className="font-mono text-lg font-black text-white tabular-nums">
                            {m.teamB.score}
                          </span>
                        )}
                        <div>
                          <span className="block font-bold text-white text-xs sm:text-sm">
                            {m.teamB.name}
                          </span>
                          <span className="text-[10px] text-mute font-mono">
                            {m.teamB.uni}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-end">
                      {isLive ? (
                        <button
                          type="button"
                          onClick={() => onOpenLiveMatch(m.id)}
                          className="flex min-h-[38px] w-full md:w-auto items-center justify-center gap-1.5 rounded-xl bg-volt px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 cursor-pointer shadow-md shadow-volt/20"
                        >
                          <span>Watch Live</span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      ) : (
                        <span className="font-mono text-[11px] text-mute">
                          Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
