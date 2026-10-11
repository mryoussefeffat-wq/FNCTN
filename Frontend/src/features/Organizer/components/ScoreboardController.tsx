import { useState } from "react"
import type { LiveMatchControllerState, MatchPeriod, MatchEvent } from "../../../types/organizer"

interface ScoreboardControllerProps {
  match: LiveMatchControllerState
  onScoreChange: (team: "teamA" | "teamB", delta: number) => void
  onToggleClock: () => void
  onResetClock: () => void
  onPeriodChange: (period: MatchPeriod) => void
  onAddEvent: (event: Omit<MatchEvent, "id">) => void
  onEndMatch: () => void
}

const PERIODS: MatchPeriod[] = [
  "Pre-Match Roll Call",
  "1st Half",
  "Halftime",
  "2nd Half",
  "Extra Time",
  "Penalties",
]

export default function ScoreboardController({
  match,
  onScoreChange,
  onToggleClock,
  onResetClock,
  onPeriodChange,
  onAddEvent,
  onEndMatch,
}: ScoreboardControllerProps) {
  const [quickEventOpen, setQuickEventOpen] = useState(false)
  const [eventType, setEventType] = useState<"goal" | "yellow_card" | "red_card">("goal")
  const [eventTeam, setEventTeam] = useState<"teamA" | "teamB">("teamA")
  const [eventPlayer, setEventPlayer] = useState("")
  const [eventDetails, setEventDetails] = useState("")

  const minutes = Math.floor(match.clockSeconds / 60)
  const seconds = match.clockSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  function handleLogEvent(e: React.FormEvent) {
    e.preventDefault()
    if (!eventPlayer.trim()) return

    onAddEvent({
      minute: Math.max(1, Math.floor(match.clockSeconds / 60)),
      type: eventType,
      team: eventTeam,
      playerName: eventPlayer.trim(),
      details: eventDetails.trim() || undefined,
    })

    // If goal, auto-increment score
    if (eventType === "goal") {
      onScoreChange(eventTeam, 1)
    }

    setQuickEventOpen(false)
    setEventPlayer("")
    setEventDetails("")
  }

  const activeRoster = eventTeam === "teamA" ? match.teamA.roster : match.teamB.roster

  return (
    <div className="space-y-6">
      {/* ---------------- 1. BIG DIGITAL SCOREBOARD & CLOCK CONTROLLER ---------------- */}
      <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl">
        {/* Match Header & Period Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#A60E13] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#A60E13]">
              Pitch-Side Live Match Controller
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-mono text-[10px] text-[#8E8E93] uppercase">Period:</label>
            <select
              value={match.period}
              onChange={(e) => onPeriodChange(e.target.value as MatchPeriod)}
              className="rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-1.5 font-mono text-xs font-bold text-white focus:border-[#A60E13] focus:outline-none"
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center Clock Timer Display & Controls */}
        <div className="my-6 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl sm:text-6xl font-black text-white tracking-widest bg-[#000000] px-6 py-2 rounded-2xl border border-[#1F1F24] shadow-inner">
            {formattedTime}
          </span>
          <span className="mt-2 font-mono text-xs text-[#8E8E93] uppercase">
            {match.period} · {match.pitch}
          </span>

          <div className="mt-3.5 flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleClock}
              className={`flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 shadow-md ${
                match.clockRunning
                  ? "bg-amber-600 text-white hover:bg-amber-500 shadow-amber-900/30"
                  : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/30"
              }`}
            >
              <span>{match.clockRunning ? "⏸ Pause Clock" : "▶ Start Clock"}</span>
            </button>

            <button
              type="button"
              onClick={onResetClock}
              className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95"
            >
              <span>↺ Reset</span>
            </button>
          </div>
        </div>

        {/* Big Teams Score Displays with Oversized +1 / -1 Touch Targets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Team A Score Controller */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E] flex items-center justify-center font-mono font-bold text-sm">
                  {match.teamA.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-white">
                    {match.teamA.name}
                  </h3>
                  <p className="font-mono text-[10px] text-[#8E8E93]">
                    {match.teamA.university}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#A60E13] font-bold">
                Home Roster
              </span>
            </div>

            <div className="my-5 flex items-center justify-center">
              <span className="font-mono text-6xl sm:text-7xl font-black text-white">
                {match.teamA.score}
              </span>
            </div>

            {/* Oversized +1 and -1 Touch Buttons (Min Height 56px) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onScoreChange("teamA", -1)}
                disabled={match.teamA.score <= 0}
                className="flex min-h-[56px] items-center justify-center gap-1.5 rounded-2xl border border-[#1F1F24] bg-[#1C1C1E] text-xl font-black text-[#8E8E93] hover:text-white hover:border-[#A60E13] transition cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={`Subtract 1 from ${match.teamA.name}`}
              >
                <span>-1</span>
              </button>

              <button
                type="button"
                onClick={() => onScoreChange("teamA", 1)}
                className="flex min-h-[56px] items-center justify-center gap-1.5 rounded-2xl bg-[#A60E13] text-xl font-black text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/30"
                aria-label={`Add 1 to ${match.teamA.name}`}
              >
                <span>+1</span>
              </button>
            </div>
          </div>

          {/* Team B Score Controller */}
          <div className="relative overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E] flex items-center justify-center font-mono font-bold text-sm">
                  {match.teamB.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-white">
                    {match.teamB.name}
                  </h3>
                  <p className="font-mono text-[10px] text-[#8E8E93]">
                    {match.teamB.university}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#8E8E93] font-bold">
                Away Roster
              </span>
            </div>

            <div className="my-5 flex items-center justify-center">
              <span className="font-mono text-6xl sm:text-7xl font-black text-white">
                {match.teamB.score}
              </span>
            </div>

            {/* Oversized +1 and -1 Touch Buttons (Min Height 56px) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onScoreChange("teamB", -1)}
                disabled={match.teamB.score <= 0}
                className="flex min-h-[56px] items-center justify-center gap-1.5 rounded-2xl border border-[#1F1F24] bg-[#1C1C1E] text-xl font-black text-[#8E8E93] hover:text-white hover:border-[#A60E13] transition cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={`Subtract 1 from ${match.teamB.name}`}
              >
                <span>-1</span>
              </button>

              <button
                type="button"
                onClick={() => onScoreChange("teamB", 1)}
                className="flex min-h-[56px] items-center justify-center gap-1.5 rounded-2xl bg-[#A60E13] text-xl font-black text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/30"
                aria-label={`Add 1 to ${match.teamB.name}`}
              >
                <span>+1</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Pitch Controller Actions: Quick Event Logger & End Match */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#1F1F24] pt-5">
          <button
            type="button"
            onClick={() => setQuickEventOpen(!quickEventOpen)}
            className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-white transition cursor-pointer active:scale-95"
          >
            <span>⚡ Log Match Event</span>
            <span className="text-[10px] text-[#8E8E93]">(Goal / Card)</span>
          </button>

          {/* End Match Button: Required by Architecture */}
          <button
            type="button"
            onClick={onEndMatch}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A60E13] to-[#800A0E] px-6 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-white hover:from-[#BF1218] hover:to-[#A60E13] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/40"
          >
            <span>🏁 End Match &amp; Advance Bracket</span>
          </button>
        </div>
      </div>

      {/* ---------------- 2. QUICK EVENT LOGGER MODAL / EXPANDED FORM ---------------- */}
      {quickEventOpen && (
        <form
          onSubmit={handleLogEvent}
          className="rounded-2xl border border-[#A60E13]/50 bg-[#0A0A0A] p-4 sm:p-6 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <span className="font-mono text-xs font-bold uppercase text-[#A60E13]">
              Log Pitch Match Event (Minute {minutes}&apos;)
            </span>
            <button
              type="button"
              onClick={() => setQuickEventOpen(false)}
              className="text-xs text-[#8E8E93] hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Event Type */}
            <div>
              <label className="block font-mono text-[10px] text-[#8E8E93] uppercase mb-1">
                Event Type *
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as any)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              >
                <option value="goal">⚽ Goal (+1 Score)</option>
                <option value="yellow_card">🟨 Yellow Card</option>
                <option value="red_card">🟥 Red Card</option>
              </select>
            </div>

            {/* Team */}
            <div>
              <label className="block font-mono text-[10px] text-[#8E8E93] uppercase mb-1">
                Team *
              </label>
              <select
                value={eventTeam}
                onChange={(e) => setEventTeam(e.target.value as any)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              >
                <option value="teamA">{match.teamA.name}</option>
                <option value="teamB">{match.teamB.name}</option>
              </select>
            </div>

            {/* Player */}
            <div>
              <label className="block font-mono text-[10px] text-[#8E8E93] uppercase mb-1">
                Player *
              </label>
              <input
                type="text"
                required
                value={eventPlayer}
                onChange={(e) => setEventPlayer(e.target.value)}
                placeholder="e.g. Omar Hassan (#9)"
                list="roster-suggestions"
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
              <datalist id="roster-suggestions">
                {activeRoster.map((p) => (
                  <option key={p.id} value={`${p.name} (#${p.jerseyNumber})`} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-[#8E8E93] uppercase mb-1">
              Event Details (Optional)
            </label>
            <input
              type="text"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              placeholder="e.g. Penalty conversion, Header from cross, Tactical foul"
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[44px] rounded-xl bg-[#A60E13] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30"
          >
            Submit &amp; Broadcast Event to Fan Hub
          </button>
        </form>
      )}

      {/* ---------------- 3. MATCH EVENTS TIMELINE FEED ---------------- */}
      <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
        <h4 className="font-mono text-xs font-bold uppercase text-[#8E8E93] mb-3">
          Match Events Timeline ({match.events.length})
        </h4>

        {match.events.length === 0 ? (
          <p className="font-mono text-xs text-[#8E8E93]">No match events recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {[...match.events].reverse().map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-[#A60E13] w-8">
                    {ev.minute}&apos;
                  </span>
                  <span>
                    {ev.type === "goal" ? "⚽" : ev.type === "yellow_card" ? "🟨" : "🟥"}
                  </span>
                  <span className="font-bold text-white">{ev.playerName}</span>
                  <span className="text-[#8E8E93]">
                    ({ev.team === "teamA" ? match.teamA.name : match.teamB.name})
                  </span>
                </div>

                {ev.details && (
                  <span className="font-mono text-[11px] text-[#8E8E93] hidden sm:inline">
                    {ev.details}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
