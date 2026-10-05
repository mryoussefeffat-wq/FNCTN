import { useState } from "react"
import type { FanHubTournament } from "../../types/fanhub"
import OverviewTab from "./tabs/OverviewTab"
import BracketsTab from "./tabs/BracketsTab"
import TeamsTab from "./tabs/TeamsTab"
import NewsMediaTab from "./tabs/NewsMediaTab"

export type DashboardTabKey = "overview" | "brackets" | "teams" | "news"

interface TournamentDashboardProps {
  tournament: FanHubTournament
  onBack: () => void
  onOpenLiveMatch: (matchId: string) => void
  onSelectTeam: (teamId: string) => void
}

export default function TournamentDashboard({
  tournament,
  onBack,
  onOpenLiveMatch,
  onSelectTeam,
}: TournamentDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>("overview")

  const isLive = tournament.isLiveNow
  const liveMatchId = tournament.schedule.find((m) => m.status === "live")?.id

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10">
      {/* ---------------- TOP BREADCRUMB & BACK BUTTON ---------------- */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[40px] items-center gap-2 rounded-xl border border-line bg-card/80 px-4 py-2 font-mono text-xs text-mute hover:border-volt hover:text-white transition cursor-pointer active:scale-95"
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
          <span>Back to All Tournaments</span>
        </button>

        <span className="font-mono text-[11px] text-mute uppercase">
          FNCTN / Hub / {tournament.id}
        </span>
      </div>

      {/* ---------------- TOURNAMENT HERO BANNER ---------------- */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Background Cover Image with Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={tournament.coverImage}
            alt={tournament.title}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-card/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-card" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Status & Sponsor Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-600/30 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-red-300 backdrop-blur-md">
                  <span className="h-2 w-2 animate-ping rounded-full bg-red-400" />
                  MATCH IN PROGRESS
                </span>
              ) : tournament.statusCategory === "ongoing" ? (
                <span className="rounded-full border border-volt/50 bg-volt/20 px-3 py-1 font-mono text-xs font-bold uppercase text-volt backdrop-blur-md">
                  ACTIVE TOURNAMENT
                </span>
              ) : tournament.statusCategory === "upcoming" ? (
                <span className="rounded-full border border-blue-400/50 bg-blue-500/20 px-3 py-1 font-mono text-xs font-bold uppercase text-blue-300 backdrop-blur-md">
                  UPCOMING EVENT
                </span>
              ) : (
                <span className="rounded-full border border-line bg-ink/80 px-3 py-1 font-mono text-xs font-bold uppercase text-mute backdrop-blur-md">
                  CONCLUDED
                </span>
              )}

              <span className="rounded-md border border-volt/40 bg-ink/90 px-2.5 py-1 font-mono text-xs font-bold uppercase text-volt backdrop-blur-md">
                {tournament.sponsor.badge}
              </span>

              <span className="rounded-full border border-line bg-ink/80 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-md">
                {tournament.city}
              </span>
            </div>

            <h1 className="display mt-4 text-2xl sm:text-4xl lg:text-5xl text-white">
              {tournament.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-5 font-mono text-xs sm:text-sm text-mute">
              <span>⚽ {tournament.sport}</span>
              <span>·</span>
              <span>📅 {tournament.dateRange}</span>
              <span>·</span>
              <span className="text-white">📍 {tournament.primaryVenue}</span>
            </div>
          </div>

          {/* Quick Metrics & Live Jump */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-line bg-ink/80 px-4 py-2 text-center backdrop-blur-md">
                <span className="block font-mono text-xs text-mute">Prize Pool</span>
                <span className="font-mono text-lg font-black text-volt">
                  {tournament.prizePool}
                </span>
              </div>
              <div className="rounded-2xl border border-line bg-ink/80 px-4 py-2 text-center backdrop-blur-md">
                <span className="block font-mono text-xs text-mute">Rosters</span>
                <span className="font-mono text-lg font-black text-white">
                  {tournament.teamsCountLabel}
                </span>
              </div>
            </div>

            {isLive && liveMatchId && (
              <button
                type="button"
                onClick={() => onOpenLiveMatch(liveMatchId)}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-volt px-5 py-2.5 text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-xl shadow-volt/30 cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                <span>Jump to Live Scoreboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- 4 PRIMARY DASHBOARD TABS ---------------- */}
      <div className="flex items-center overflow-x-auto border-b border-line bg-card/40 p-1.5 rounded-2xl no-scrollbar [-webkit-overflow-scrolling:touch]">
        <div className="flex items-center gap-2 min-w-max">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
              activeTab === "overview"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            <span>Overview &amp; Tickets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("brackets")}
            className={`flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
              activeTab === "brackets"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            <span>Matches &amp; Brackets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("teams")}
            className={`flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
              activeTab === "teams"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            <span>Teams &amp; Rosters ({tournament.teams.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("news")}
            className={`flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
              activeTab === "news"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "text-mute hover:text-white"
            }`}
          >
            <span>News &amp; Media</span>
          </button>
        </div>
      </div>

      {/* ---------------- ACTIVE TAB CONTENT ---------------- */}
      <main>
        {activeTab === "overview" && <OverviewTab tournament={tournament} />}
        {activeTab === "brackets" && (
          <BracketsTab
            tournament={tournament}
            onOpenLiveMatch={onOpenLiveMatch}
          />
        )}
        {activeTab === "teams" && (
          <TeamsTab
            teams={tournament.teams}
            onSelectTeam={onSelectTeam}
          />
        )}
        {activeTab === "news" && (
          <NewsMediaTab
            news={tournament.news}
            mediaPhotos={tournament.mediaPhotos}
          />
        )}
      </main>
    </div>
  )
}
