import { useState } from "react"
import {
  FAN_HUB_TOURNAMENTS,
  MOCK_LIVE_MATCH,
  MOCK_TEAMS,
  MOCK_PLAYERS,
} from "../../utils/fanHubData"
import FanHubHome from "./FanHubHome"
import TournamentDashboard from "./TournamentDashboard"
import LiveMatchViewer from "./LiveMatchViewer"
import PublicTeamProfile from "./PublicTeamProfile"
import PublicPlayerProfile from "./PublicPlayerProfile"
import Logo from "../../components/Logo"

export type FanHubView = "home" | "tournament" | "match" | "team" | "player"

interface FanHubContainerProps {
  initialTournamentId?: string | null
  initialMatchId?: string | null
  onBackToLanding: () => void
  onOpenParticipantPortal: () => void
}

export default function FanHubContainer({
  initialTournamentId = null,
  initialMatchId = null,
  onBackToLanding,
  onOpenParticipantPortal,
}: FanHubContainerProps) {
  const [view, setView] = useState<FanHubView>(
    initialMatchId
      ? "match"
      : initialTournamentId
        ? "tournament"
        : "home",
  )
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(
    initialTournamentId || "football-cup-26",
  )
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(
    initialMatchId || "match-qf-auc-guc",
  )
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>("team-auc-titans")
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>("p-omar-hassan")

  // Selected entities
  const activeTournament =
    FAN_HUB_TOURNAMENTS.find((t) => t.id === selectedTournamentId) ||
    FAN_HUB_TOURNAMENTS[0]

  const activeTeam =
    (selectedTeamId && MOCK_TEAMS[selectedTeamId]) ||
    activeTournament.teams[0] ||
    MOCK_TEAMS["team-cu-lions"]

  const activePlayer =
    (selectedPlayerId && MOCK_PLAYERS[selectedPlayerId]) ||
    MOCK_PLAYERS["p-omar-hassan"]

  // Handlers
  function handleSelectTournament(id: string) {
    setSelectedTournamentId(id)
    setView("tournament")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleOpenLiveMatch(matchId: string, tournamentId?: string) {
    if (tournamentId) setSelectedTournamentId(tournamentId)
    setSelectedMatchId(matchId)
    setView("match")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSelectTeam(teamId: string) {
    setSelectedTeamId(teamId)
    setView("team")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSelectPlayer(playerId: string) {
    setSelectedPlayerId(playerId)
    setView("player")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen w-full bg-[#07080a] font-sans text-white selection:bg-volt selection:text-ink">
      {/* ---------------- FAN HUB GLOBAL STICKY HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/90 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          {/* Logo & Sub-tag */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setView("home")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 cursor-pointer text-left"
              aria-label="Fan Hub Home"
            >
              <Logo size="text-xl sm:text-2xl" subtitle="Fan Hub" />
            </button>
            <span className="hidden sm:inline-block rounded-md border border-volt/40 bg-volt/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-volt">
              Public Spectator Arena
            </span>
          </div>

          {/* Quick Hub Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setView("home")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`hover:text-volt transition cursor-pointer ${
                view === "home" ? "text-volt font-bold" : "text-mute"
              }`}
            >
              Tournaments
            </button>
            <button
              type="button"
              onClick={() => handleOpenLiveMatch("match-qf-auc-guc", "football-cup-26")}
              className={`flex items-center gap-1.5 hover:text-red-400 transition cursor-pointer ${
                view === "match" ? "text-red-400 font-bold" : "text-mute"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Live Center</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectTournament("football-cup-26")}
              className={`hover:text-volt transition cursor-pointer ${
                view === "tournament" ? "text-volt font-bold" : "text-mute"
              }`}
            >
              Brackets &amp; Passes
            </button>
          </nav>

          {/* Cross-App Navigation CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBackToLanding}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-line bg-card/80 px-3 py-1.5 font-mono text-xs text-mute hover:border-volt hover:text-white transition cursor-pointer active:scale-95"
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
              <span className="hidden sm:inline">Main Website</span>
              <span className="sm:hidden">Exit</span>
            </button>

            <button
              type="button"
              onClick={onOpenParticipantPortal}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl bg-volt px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-md shadow-volt/20 cursor-pointer"
            >
              <span>Athlete Portal</span>
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
          </div>
        </div>
      </header>

      {/* ---------------- VIEW CONTENT CONTROLLER ---------------- */}
      <main className="w-full">
        {view === "home" && (
          <FanHubHome
            tournaments={FAN_HUB_TOURNAMENTS}
            liveMatch={MOCK_LIVE_MATCH}
            onSelectTournament={handleSelectTournament}
            onOpenLiveMatch={handleOpenLiveMatch}
          />
        )}

        {view === "tournament" && activeTournament && (
          <TournamentDashboard
            tournament={activeTournament}
            onBack={() => setView("home")}
            onOpenLiveMatch={(matchId) => handleOpenLiveMatch(matchId, activeTournament.id)}
            onSelectTeam={handleSelectTeam}
          />
        )}

        {view === "match" && (
          <LiveMatchViewer
            match={MOCK_LIVE_MATCH}
            onBack={() => setView(selectedTournamentId ? "tournament" : "home")}
            onSelectPlayer={handleSelectPlayer}
            onSelectTeam={handleSelectTeam}
          />
        )}

        {view === "team" && activeTeam && (
          <PublicTeamProfile
            team={activeTeam}
            onBack={() => setView(selectedTournamentId ? "tournament" : "home")}
            onSelectPlayer={handleSelectPlayer}
          />
        )}

        {view === "player" && activePlayer && (
          <PublicPlayerProfile
            player={activePlayer}
            onBack={() => setView(selectedTeamId ? "team" : "home")}
            onSelectTeam={handleSelectTeam}
          />
        )}
      </main>
    </div>
  )
}
