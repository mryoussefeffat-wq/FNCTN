import { useState } from "react"
import Logo from "../../components/Logo"
import type {
  CommitteeTournament,
  PlayerReviewItem,
  TeamPaymentItem,
  LiveMatchControllerState,
  IdVerificationStatus,
  PaymentReviewStatus,
} from "../../types/organizer"
import {
  INITIAL_COMMITTEE_TOURNAMENTS,
  INITIAL_PLAYER_REVIEWS,
  INITIAL_TEAM_PAYMENTS,
  INITIAL_LIVE_MATCH_CONTROLLER,
} from "./mockData"
import OrganizerDashboardView from "./OrganizerDashboardView"
import TournamentSetupView from "./TournamentSetupView"
import VerificationDeskView from "./VerificationDeskView"
import MatchDayControllerView from "./MatchDayControllerView"
import CreateTournamentModal from "./components/CreateTournamentModal"

export type OrganizerTab = "dashboard" | "setup" | "review" | "pitch"

interface OrganizerContainerProps {
  onBackToLanding: () => void
  onOpenFanHub: () => void
  onOpenParticipantPortal: () => void
}

export default function OrganizerContainer({
  onBackToLanding,
  onOpenFanHub,
  onOpenParticipantPortal,
}: OrganizerContainerProps) {
  const [activeTab, setActiveTab] = useState<OrganizerTab>("dashboard")
  const [tournaments, setTournaments] = useState<CommitteeTournament[]>(INITIAL_COMMITTEE_TOURNAMENTS)
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("tourn-eg-cup-2026")
  const [playerReviews, setPlayerReviews] = useState<PlayerReviewItem[]>(INITIAL_PLAYER_REVIEWS)
  const [teamPayments, setTeamPayments] = useState<TeamPaymentItem[]>(INITIAL_TEAM_PAYMENTS)
  const [liveMatch, setLiveMatch] = useState<LiveMatchControllerState>(INITIAL_LIVE_MATCH_CONTROLLER)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const selectedTournament =
    tournaments.find((t) => t.id === selectedTournamentId) || tournaments[0]

  const pendingIdCount = playerReviews.filter((p) => p.status === "pending").length
  const pendingFeeCount = teamPayments.filter((p) => p.status === "pending").length

  function handleCreateTournament(newTourn: CommitteeTournament) {
    setTournaments((prev) => [newTourn, ...prev])
    setSelectedTournamentId(newTourn.id)
  }

  function handleSaveTournament(updated: CommitteeTournament) {
    setTournaments((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  function handleResolvePlayer(playerId: string, status: IdVerificationStatus, reason?: string) {
    setPlayerReviews((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, status, rejectionReason: reason } : p))
    )
  }

  function handleResolvePayment(paymentId: string, status: PaymentReviewStatus, reason?: string) {
    setTeamPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status, rejectionReason: reason } : p))
    )
  }

  function handleMatchFinalized(
    matchId: string,
    winnerId: string,
    finalScoreA: number,
    finalScoreB: number
  ) {
    setLiveMatch((prev) => ({
      ...prev,
      isEnded: true,
      clockRunning: false,
      winnerTeamId: winnerId,
      teamA: { ...prev.teamA, score: finalScoreA },
      teamB: { ...prev.teamB, score: finalScoreB },
    }))
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] font-sans text-white selection:bg-[#A60E13] selection:text-white pb-24 sm:pb-16">
      {/* ---------------- 1. STICKY ORGANIZER HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F24] bg-[#000000]/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          {/* Logo & Role Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 cursor-pointer text-left"
              aria-label="Organizer Home"
            >
              <Logo size="text-xl sm:text-2xl" subtitle="Committee Directorate" />
            </button>
            <span className="hidden sm:inline-block rounded-md border border-[#A60E13]/40 bg-[#A60E13]/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-[#A60E13]">
              Pitch-Side Staff
            </span>
          </div>

          {/* Desktop Nav Items */}
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
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("review")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`flex items-center gap-1.5 hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "review" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              <span>Review Desk</span>
              {pendingIdCount > 0 && (
                <span className="rounded-full bg-[#A60E13] px-1.5 py-0.2 text-[9px] font-black text-white">
                  {pendingIdCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("pitch")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`flex items-center gap-1.5 hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "pitch" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-pulse" />
              <span>Pitch Controller</span>
            </button>
          </nav>

          {/* Cross-App Navigation CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenParticipantPortal}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">Athlete Portal</span>
              <span className="sm:hidden">Athlete</span>
            </button>

            <button
              type="button"
              onClick={onOpenFanHub}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-3 py-1.5 font-mono text-xs text-white hover:bg-[#A60E13] transition cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">Fan Hub</span>
              <span className="sm:hidden">Fans</span>
            </button>

            <button
              type="button"
              onClick={onBackToLanding}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-white transition cursor-pointer active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Website</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- 2. MAIN CONTAINER CONTENT ---------------- */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        {activeTab === "dashboard" && (
          <OrganizerDashboardView
            tournaments={tournaments}
            pendingIdCount={pendingIdCount}
            pendingFeeCount={pendingFeeCount}
            onCreateTournamentClick={() => setCreateModalOpen(true)}
            onOpenPitchController={(id) => {
              setSelectedTournamentId(id)
              setActiveTab("pitch")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onOpenReviewDesk={(id) => {
              setSelectedTournamentId(id)
              setActiveTab("review")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onOpenSetup={(id) => {
              setSelectedTournamentId(id)
              setActiveTab("setup")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        )}

        {activeTab === "setup" && (
          <TournamentSetupView
            tournament={selectedTournament}
            onSaveTournament={handleSaveTournament}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "review" && (
          <VerificationDeskView
            playerReviews={playerReviews}
            teamPayments={teamPayments}
            onResolvePlayer={handleResolvePlayer}
            onResolvePayment={handleResolvePayment}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "pitch" && (
          <MatchDayControllerView
            initialMatch={liveMatch}
            onBackToDashboard={() => setActiveTab("dashboard")}
            onMatchFinalized={handleMatchFinalized}
          />
        )}
      </main>

      {/* ---------------- 3. MOBILE FIXED BOTTOM NAVIGATION ---------------- */}
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
            setActiveTab("review")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === "review" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Review Desk</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("pitch")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
            activeTab === "pitch" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Pitch Live</span>
        </button>

        <button
          type="button"
          onClick={onOpenFanHub}
          className="flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer text-[#8E8E93]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-wider">Fan Hub</span>
        </button>
      </nav>

      {/* Create Tournament Wizard Modal */}
      <CreateTournamentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateTournament={handleCreateTournament}
      />
    </div>
  )
}
