import { useState, useEffect } from "react"
import type {
  LiveMatchControllerState,
  RollCallStatus,
  MatchPeriod,
  MatchEvent,
} from "../../types/organizer"
import RollCallPlayerRow from "./components/RollCallPlayerRow"
import ScoreboardController from "./components/ScoreboardController"
import EndMatchConfirmModal from "./components/EndMatchConfirmModal"

interface MatchDayControllerViewProps {
  initialMatch: LiveMatchControllerState
  onBackToDashboard: () => void
  onMatchFinalized: (matchId: string, winnerId: string, finalScoreA: number, finalScoreB: number) => void
}

export default function MatchDayControllerView({
  initialMatch,
  onBackToDashboard,
  onMatchFinalized,
}: MatchDayControllerViewProps) {
  const [match, setMatch] = useState<LiveMatchControllerState>(initialMatch)
  const [activeTab, setActiveTab] = useState<"scoreboard" | "roll_call">("scoreboard")
  const [rollCallTeamTab, setRollCallTeamTab] = useState<"teamA" | "teamB">("teamA")
  const [endMatchModalOpen, setEndMatchModalOpen] = useState(false)

  // Live timer interval
  useEffect(() => {
    let interval: any = null
    if (match.clockRunning && !match.isEnded) {
      interval = setInterval(() => {
        setMatch((prev) => ({
          ...prev,
          clockSeconds: prev.clockSeconds + 1,
        }))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [match.clockRunning, match.isEnded])

  // Roll call player status update
  function handleRollCallStatusChange(playerId: string, status: RollCallStatus) {
    const checkInTime =
      status === "present"
        ? new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
        : undefined

    setMatch((prev) => {
      const updateRoster = (roster: typeof prev.teamA.roster) =>
        roster.map((p) =>
          p.id === playerId ? { ...p, rollCallStatus: status, checkInTime: checkInTime || p.checkInTime } : p
        )

      return {
        ...prev,
        teamA: {
          ...prev.teamA,
          roster: updateRoster(prev.teamA.roster),
        },
        teamB: {
          ...prev.teamB,
          roster: updateRoster(prev.teamB.roster),
        },
      }
    })
  }

  // Score adjustments
  function handleScoreChange(teamKey: "teamA" | "teamB", delta: number) {
    setMatch((prev) => ({
      ...prev,
      [teamKey]: {
        ...prev[teamKey],
        score: Math.max(0, prev[teamKey].score + delta),
      },
    }))
  }

  function handleToggleClock() {
    setMatch((prev) => ({
      ...prev,
      clockRunning: !prev.clockRunning,
    }))
  }

  function handleResetClock() {
    setMatch((prev) => ({
      ...prev,
      clockSeconds: 0,
      clockRunning: false,
    }))
  }

  function handlePeriodChange(period: MatchPeriod) {
    setMatch((prev) => ({
      ...prev,
      period,
    }))
  }

  function handleAddEvent(eventData: Omit<MatchEvent, "id">) {
    const newEvent: MatchEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
    }
    setMatch((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }))
  }

  function handleConfirmEndMatch(winnerTeamId: string) {
    setMatch((prev) => ({
      ...prev,
      isEnded: true,
      clockRunning: false,
      period: "Full-Time (Ended)",
      winnerTeamId,
    }))
    onMatchFinalized(match.id, winnerTeamId, match.teamA.score, match.teamB.score)
  }

  // Roll call calculations
  const teamAPresent = match.teamA.roster.filter((p) => p.rollCallStatus === "present").length
  const teamBPresent = match.teamB.roster.filter((p) => p.rollCallStatus === "present").length

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
      {/* ---------------- 1. STICKY PITCH-SIDE BAR & BREADCRUMB ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-5">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer mb-1"
          >
            ← Back to Organizer Dashboard
          </button>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Official Pitch-Side Match Day Controller
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            {match.teamA.name} vs {match.teamB.name}
          </h1>
          <p className="mt-0.5 font-mono text-xs text-[#8E8E93]">
            {match.stage} · {match.pitch} · Scheduled Kick-off: {match.scheduledTime}
          </p>
        </div>

        {/* Big Touch Mode Switcher (Min Height 48px) */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-1.5 font-mono text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("scoreboard")}
            className={`flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-4 py-2 font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "scoreboard"
                ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            <span>⚽ Live Scoreboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roll_call")}
            className={`flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-4 py-2 font-bold uppercase tracking-wider transition cursor-pointer ${
              activeTab === "roll_call"
                ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            <span>📋 Pitch Roll Call</span>
          </button>
        </div>
      </div>

      {/* Match Concluded Banner */}
      {match.isEnded && (
        <div className="rounded-2xl border border-emerald-500/60 bg-emerald-950/30 p-4 text-center">
          <span className="font-mono text-xs font-bold uppercase text-emerald-400">
            🏆 Match Concluded &amp; Result Official
          </span>
          <p className="font-sans font-bold text-lg text-white mt-1">
            Final Score: {match.teamA.name} {match.teamA.score} - {match.teamB.score} {match.teamB.name}
          </p>
          <p className="font-mono text-xs text-[#8E8E93] mt-0.5">
            Winner has been advanced to the next bracket round in the Fan Hub.
          </p>
        </div>
      )}

      {/* ---------------- 2. SCOREBOARD TAB CONTENT ---------------- */}
      {activeTab === "scoreboard" && (
        <ScoreboardController
          match={match}
          onScoreChange={handleScoreChange}
          onToggleClock={handleToggleClock}
          onResetClock={handleResetClock}
          onPeriodChange={handlePeriodChange}
          onAddEvent={handleAddEvent}
          onEndMatch={() => setEndMatchModalOpen(true)}
        />
      )}

      {/* ---------------- 3. PITCH ROLL CALL TAB CONTENT ---------------- */}
      {activeTab === "roll_call" && (
        <div className="space-y-6">
          {/* Roll Call Pre-Game Banner */}
          <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-[#A60E13]">
                15 Minutes Pre-Match Procedure
              </span>
              <h2 className="font-sans font-bold text-lg sm:text-xl text-white mt-0.5">
                Official Referee Pitch Roll Call
              </h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Check in eligible student-athletes pitch-side. Verify jersey numbers and student badges.
              </p>
            </div>

            {/* Quorum Summary */}
            <div className="flex items-center gap-3 font-mono text-xs shrink-0">
              <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-center">
                <span className="text-[10px] text-[#8E8E93] block">{match.teamA.name}</span>
                <span className="font-bold text-emerald-400">
                  {teamAPresent} / {match.teamA.roster.length} Present
                </span>
              </div>
              <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-center">
                <span className="text-[10px] text-[#8E8E93] block">{match.teamB.name}</span>
                <span className="font-bold text-emerald-400">
                  {teamBPresent} / {match.teamB.roster.length} Present
                </span>
              </div>
            </div>
          </div>

          {/* Team Switcher Tabs for Roll Call */}
          <div className="flex items-center gap-2 border-b border-[#1F1F24] pb-3">
            <button
              type="button"
              onClick={() => setRollCallTeamTab("teamA")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
                rollCallTeamTab === "teamA"
                  ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              <span>{match.teamA.name} Roster</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">
                {teamAPresent}/{match.teamA.roster.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRollCallTeamTab("teamB")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold transition cursor-pointer ${
                rollCallTeamTab === "teamB"
                  ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              <span>{match.teamB.name} Roster</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px]">
                {teamBPresent}/{match.teamB.roster.length}
              </span>
            </button>
          </div>

          {/* Active Team Roll Call Players List */}
          <div className="space-y-3">
            {(rollCallTeamTab === "teamA" ? match.teamA.roster : match.teamB.roster).map((player) => (
              <RollCallPlayerRow
                key={player.id}
                player={player}
                onStatusChange={handleRollCallStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* End Match Confirmation Modal */}
      <EndMatchConfirmModal
        match={match}
        isOpen={endMatchModalOpen}
        onClose={() => setEndMatchModalOpen(false)}
        onConfirmEnd={handleConfirmEndMatch}
      />
    </div>
  )
}
