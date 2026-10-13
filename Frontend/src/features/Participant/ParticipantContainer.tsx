import { useState } from "react"
import Logo from "../../components/Logo"
import type {
  AthleteProfile,
  ParticipantTeam,
  UpcomingMatch,
  ParticipantAlert,
} from "../../types/participant"
import {
  INITIAL_ATHLETE_PROFILE,
  INITIAL_PARTICIPANT_TEAMS,
  UPCOMING_PARTICIPANT_MATCHES,
  INITIAL_PARTICIPANT_ALERTS,
} from "./mockData"
import PlayerDashboard from "./PlayerDashboard"
import ProfileSettingsView from "./ProfileSettingsView"
import TeamHubView from "./TeamHubView"

export type ParticipantTab = "dashboard" | "profile" | "teams" | "settings"

interface ParticipantContainerProps {
  onBackToLanding: () => void
  onOpenFanHub?: () => void
  onOpenOrganizer?: () => void
  onOpenUniversity?: () => void
  onLogout: () => void
}

export default function ParticipantContainer({
  onBackToLanding,
  onOpenFanHub,
  onOpenOrganizer,
  onOpenUniversity,
  onLogout,
}: ParticipantContainerProps) {
  const [activeTab, setActiveTab] = useState<ParticipantTab>("dashboard")
  const [athlete, setAthlete] = useState<AthleteProfile>(INITIAL_ATHLETE_PROFILE)
  const [teams, setTeams] = useState<ParticipantTeam[]>(INITIAL_PARTICIPANT_TEAMS)
  const [matches, setMatches] = useState<UpcomingMatch[]>(UPCOMING_PARTICIPANT_MATCHES)
  const [alerts, setAlerts] = useState<ParticipantAlert[]>(INITIAL_PARTICIPANT_ALERTS)

  function handleSaveProfile(updated: AthleteProfile) {
    setAthlete(updated)
    // Update team roster entry for athlete if member in any team
    setTeams((prevTeams) =>
      prevTeams.map((t) => ({
        ...t,
        roster: t.roster.map((m) =>
          m.id === updated.id
            ? {
                ...m,
                name: `${updated.firstName} ${updated.lastName}`,
                position: updated.primaryPosition,
                jerseyNumber: updated.jerseyNumber,
                verificationStatus: updated.overallVerificationStatus,
              }
            : m
        ),
      }))
    )
  }

  function handleAddTeam(newTeam: ParticipantTeam) {
    setTeams((prev) => [newTeam, ...prev])
  }

  function handleLeaveTeam(teamId: string) {
    setTeams((prev) => prev.filter((t) => t.id !== teamId))
  }

  function handleUpdateTeam(updatedTeam: ParticipantTeam) {
    setTeams((prev) =>
      prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] font-sans text-white selection:bg-[#A60E13] selection:text-white pb-24 sm:pb-16">
      {/* ---------------- ATHLETE PORTAL GLOBAL STICKY HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F24] bg-[#000000]/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          {/* Logo & Sub-tag */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 cursor-pointer text-left"
              aria-label="Athlete Dashboard Home"
            >
              <Logo size="text-xl sm:text-2xl" subtitle="Athlete Portal" />
            </button>
            <span className="hidden sm:inline-block rounded-md border border-[#A60E13]/40 bg-[#A60E13]/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-[#A60E13]">
              Collegiate Athlete Area
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "dashboard" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              Player Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("teams")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "teams" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              Team Hub {teams.length > 0 ? `(${teams.length})` : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("profile")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`flex items-center gap-1.5 hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "profile" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              <span>Profile &amp; ID Upload</span>
              {athlete.overallVerificationStatus === "verified" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-pulse" />
              )}
            </button>
          </nav>

          {/* Cross-App Navigation CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenFanHub && (
              <button
                type="button"
                onClick={onOpenFanHub}
                className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-3 py-1.5 font-mono text-xs text-white hover:bg-[#A60E13] transition cursor-pointer active:scale-95"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-pulse" />
                <span className="hidden sm:inline">Spectator Fan Hub</span>
                <span className="sm:hidden">Fan Hub</span>
              </button>
            )}

            <button
              type="button"
              onClick={onBackToLanding}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
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
              onClick={onLogout}
              className="hidden sm:flex min-h-[38px] items-center rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER CONTENT ---------------- */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        {activeTab === "dashboard" && (
          <PlayerDashboard
            athlete={athlete}
            team={teams[0] || null}
            matches={matches}
            alerts={alerts}
            onNavigate={(t) => setActiveTab(t)}
            onOpenFanHub={onOpenFanHub}
          />
        )}

        {activeTab === "profile" && (
          <ProfileSettingsView
            athlete={athlete}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {activeTab === "teams" && (
          <TeamHubView
            teams={teams}
            userUniversity={athlete.university}
            userName={`${athlete.firstName} ${athlete.lastName}`}
            userId={athlete.id}
            onAddTeam={handleAddTeam}
            onLeaveTeam={handleLeaveTeam}
            onUpdateTeam={handleUpdateTeam}
            onNavigateToProfile={() => setActiveTab("profile")}
          />
        )}
      </main>

      {/* ---------------- MOBILE FIXED BOTTOM NAVIGATION ---------------- */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#1F1F24] bg-[#000000]/95 px-1 pb-[max(0.75rem,calc(0.5rem+env(safe-area-inset-bottom,0px)))] pt-2 backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={() => {
            setActiveTab("dashboard")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === "dashboard" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Dashboard</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("teams")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === "teams" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Team Hub</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("profile")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === "profile" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="7" y1="8" x2="17" y2="8" />
            <line x1="7" y1="12" x2="13" y2="12" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Profile &amp; ID</span>
        </button>

        {onOpenFanHub && (
          <button
            type="button"
            onClick={onOpenFanHub}
            className="flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer text-[#8E8E93]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-wider">Fan Hub</span>
          </button>
        )}
      </nav>
    </div>
  )
}
