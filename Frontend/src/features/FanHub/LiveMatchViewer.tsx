import { useState } from "react"
import type { LiveMatchDetails } from "../../types/fanhub"
import MatchStatsChart from "./components/MatchStatsChart"
import ShareMatchGraphicModal from "./components/ShareMatchGraphicModal"

interface LiveMatchViewerProps {
  match: LiveMatchDetails
  onBack: () => void
  onSelectPlayer: (playerId: string) => void
  onSelectTeam: (teamId: string) => void
}

export default function LiveMatchViewer({
  match,
  onBack,
  onSelectPlayer,
  onSelectTeam,
}: LiveMatchViewerProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"timeline" | "stats" | "lineups">("timeline")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10">
      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[40px] items-center gap-2 rounded-xl border border-line bg-card/80 px-4 py-2 font-mono text-xs text-mute hover:border-volt hover:text-white transition cursor-pointer self-start active:scale-95"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Tournament</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="flex min-h-[40px] items-center gap-2 rounded-xl border border-volt/50 bg-volt/10 px-4 py-2 font-mono text-xs font-bold uppercase text-volt hover:bg-volt hover:text-ink transition cursor-pointer shadow-md shadow-volt/10 active:scale-95"
          >
            <span>📱 Share Match Graphic</span>
          </button>
        </div>
      </div>

      {/* ---------------- MAIN BROADCAST SCOREBOARD ---------------- */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
        {/* Background ambient lighting */}
        <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-volt/15 blur-3xl pointer-events-none" />

        {/* Sponsor Banner & Match Stage */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-4">
          <span className="rounded-md border border-volt/40 bg-volt/15 px-2.5 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase text-volt">
            {match.sponsor.badge}
          </span>
          <span className="font-mono text-xs text-mute uppercase">
            {match.tournamentTitle} · {match.stage}
          </span>
        </div>

        {/* Pulsing Match Clock */}
        <div className="relative z-10 my-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase text-red-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
          </span>
          <span>
            {match.period} · {match.matchClock} In Progress
          </span>
        </div>

        {/* Teams and Big Scores */}
        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8 py-3 sm:py-6">
          {/* Team A */}
          <div
            onClick={() => onSelectTeam(match.teamA.id)}
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mb-2 flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl border border-line bg-ink text-3xl sm:text-4xl shadow-inner group-hover:border-volt transition">
              {match.teamA.logo}
            </div>
            <h3 className="display text-base sm:text-2xl text-white group-hover:text-volt transition">
              {match.teamA.name}
            </h3>
            <span className="font-mono text-[11px] sm:text-xs text-volt font-bold">
              {match.teamA.uni}
            </span>
          </div>

          {/* Scores */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-4 font-mono text-4xl sm:text-7xl font-black text-white tabular-nums tracking-tighter">
              <span>{match.scoreA}</span>
              <span className="text-volt">:</span>
              <span>{match.scoreB}</span>
            </div>
            <span className="mt-1 font-mono text-[10px] sm:text-xs text-mute">
              Regulation Time
            </span>
          </div>

          {/* Team B */}
          <div
            onClick={() => onSelectTeam(match.teamB.id)}
            className="flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="mb-2 flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl border border-line bg-ink text-3xl sm:text-4xl shadow-inner group-hover:border-volt transition">
              {match.teamB.logo}
            </div>
            <h3 className="display text-base sm:text-2xl text-white group-hover:text-volt transition">
              {match.teamB.name}
            </h3>
            <span className="font-mono text-[11px] sm:text-xs text-volt font-bold">
              {match.teamB.uni}
            </span>
          </div>
        </div>

        {/* Sponsor Ad Strip */}
        <div className="relative z-10 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-volt/30 bg-volt/10 p-3.5 sm:p-4 text-xs">
          <div>
            <span className="font-bold text-white block">
              ⚡ {match.sponsor.name} Student Activation
            </span>
            <p className="text-[11px] text-mute mt-0.5">
              {match.sponsor.offerText}
            </p>
          </div>
          <span className="font-mono text-[10px] font-bold text-volt uppercase self-start sm:self-center">
            Official Tournament Partner
          </span>
        </div>
      </section>

      {/* ---------------- LIVE TABS (Timeline, Telemetry Stats, Lineups) ---------------- */}
      <div className="flex items-center gap-2 border-b border-line bg-card/40 p-1.5 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("timeline")}
          className={`flex min-h-[38px] flex-1 items-center justify-center rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
            activeTab === "timeline"
              ? "bg-volt text-ink shadow-md shadow-volt/20"
              : "text-mute hover:text-white"
          }`}
        >
          Match Timeline ({match.events.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stats")}
          className={`flex min-h-[38px] flex-1 items-center justify-center rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
            activeTab === "stats"
              ? "bg-volt text-ink shadow-md shadow-volt/20"
              : "text-mute hover:text-white"
          }`}
        >
          Telemetry Stats
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lineups")}
          className={`flex min-h-[38px] flex-1 items-center justify-center rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
            activeTab === "lineups"
              ? "bg-volt text-ink shadow-md shadow-volt/20"
              : "text-mute hover:text-white"
          }`}
        >
          Lineups &amp; Rosters
        </button>
      </div>

      {/* ---------------- TAB CONTENT ---------------- */}
      <main>
        {/* 1. Timeline View */}
        {activeTab === "timeline" && (
          <div className="flex flex-col gap-3 rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
            <h4 className="font-mono text-xs font-bold uppercase text-mute mb-2">
              Key Match Incidents Chronology
            </h4>

            <div className="space-y-3">
              {match.events.map((ev, idx) => {
                const isTeamA = ev.team === "A"
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3.5 rounded-xl border p-3 text-xs transition ${
                      ev.type === "goal"
                        ? "border-volt/50 bg-volt/10"
                        : ev.type === "yellow_card"
                          ? "border-yellow-500/40 bg-yellow-500/10"
                          : "border-line bg-ink/70"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink font-mono text-xs font-black text-white">
                      {ev.minute}&apos;
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {ev.type === "goal"
                            ? "⚽"
                            : ev.type === "yellow_card"
                              ? "🟨"
                              : ev.type === "red_card"
                                ? "🟥"
                                : "🔄"}
                        </span>
                        <span className="font-bold text-white">{ev.player}</span>
                        <span className="font-mono text-[10px] text-volt uppercase">
                          ({isTeamA ? match.teamA.uniBadge : match.teamB.uniBadge})
                        </span>
                      </div>
                      {ev.detail && (
                        <p className="mt-0.5 text-[11px] text-mute">{ev.detail}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 2. Telemetry Stats View */}
        {activeTab === "stats" && (
          <MatchStatsChart
            teamAName={match.teamA.name}
            teamBName={match.teamB.name}
            stats={match.stats}
          />
        )}

        {/* 3. Lineups & Rosters View */}
        {activeTab === "lineups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team A Roster */}
            <div className="flex flex-col gap-3 rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{match.teamA.logo}</span>
                  <h4 className="font-bold text-white text-sm">
                    {match.teamA.name} Lineup
                  </h4>
                </div>
                <span className="font-mono text-xs text-volt font-bold">
                  {match.teamA.uniBadge}
                </span>
              </div>

              <div className="space-y-2 mt-2">
                {match.teamA.roster.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="flex items-center justify-between rounded-xl border border-line/70 bg-ink/70 p-2.5 transition hover:border-volt cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-card font-mono text-xs font-bold text-volt">
                        #{player.jerseyNumber}
                      </span>
                      <div>
                        <span className="block font-bold text-white text-xs group-hover:text-volt transition">
                          {player.name}
                        </span>
                        <span className="text-[10px] text-mute">{player.position}</span>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-mute group-hover:text-volt transition">
                      View Stats →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team B Roster */}
            <div className="flex flex-col gap-3 rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{match.teamB.logo}</span>
                  <h4 className="font-bold text-white text-sm">
                    {match.teamB.name} Lineup
                  </h4>
                </div>
                <span className="font-mono text-xs text-volt font-bold">
                  {match.teamB.uniBadge}
                </span>
              </div>

              <div className="space-y-2 mt-2">
                {match.teamB.roster.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => onSelectPlayer(player.id)}
                    className="flex items-center justify-between rounded-xl border border-line/70 bg-ink/70 p-2.5 transition hover:border-volt cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-card font-mono text-xs font-bold text-volt">
                        #{player.jerseyNumber}
                      </span>
                      <div>
                        <span className="block font-bold text-white text-xs group-hover:text-volt transition">
                          {player.name}
                        </span>
                        <span className="text-[10px] text-mute">{player.position}</span>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-mute group-hover:text-volt transition">
                      View Stats →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Share Match Graphic Modal */}
      <ShareMatchGraphicModal
        isOpen={shareModalOpen}
        match={match}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  )
}
