import { useState } from "react"
import type { CommitteeTournament } from "../../../types/organizer"

interface OrganizerDashboardViewProps {
  tournaments: CommitteeTournament[]
  pendingIdCount: number
  pendingFeeCount: number
  onCreateTournamentClick: () => void
  onOpenPitchController: (tournamentId: string) => void
  onOpenReviewDesk: (tournamentId: string) => void
  onOpenSetup: (tournamentId: string) => void
  onDeleteTournament?: (tournamentId: string) => void
}

type FilterTab = "all" | "live" | "upcoming" | "completed"

export default function OrganizerDashboardView({
  tournaments,
  pendingIdCount,
  pendingFeeCount,
  onCreateTournamentClick,
  onOpenPitchController,
  onOpenReviewDesk,
  onOpenSetup,
  onDeleteTournament,
}: OrganizerDashboardViewProps) {
  const [filter, setFilter] = useState<FilterTab>("all")

  const totalCollectedFees = tournaments.reduce((acc, t) => acc + t.collectedFeesEgp, 0)
  const totalEnrolledTeams = tournaments.reduce((acc, t) => acc + t.enrolledTeamsCount, 0)
  const activeCount = tournaments.filter((t) => t.status === "live").length

  const filteredTournaments = tournaments.filter((t) => {
    if (filter === "all") return true
    return t.status === filter
  })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. DASHBOARD HEADER & CREATE CTA ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1F1F24] pb-5 gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Tournament Committee Command Center
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Organizer Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Oversee collegiate championship fixtures, verify student-athlete teams, and control pitch-side match days.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateTournamentClick}
          className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30 shrink-0"
        >
          <span>+ Create New Tournament</span>
        </button>
      </div>

      {/* ---------------- 2. COMMITTEE KEY PERFORMANCE CARDS ---------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">Active Fixtures</span>
            <span className="flex h-2 w-2 rounded-full bg-[#A60E13] animate-pulse" />
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {activeCount}
          </p>
          <span className="font-mono text-[11px] text-emerald-400">Live Tournament Hubs</span>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">Teams Enrolled</span>
            <span className="text-sm">🛡️</span>
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {totalEnrolledTeams}
          </p>
          <span className="font-mono text-[11px] text-[#8E8E93]">Across 16 Universities</span>
        </div>

        {/* Metric 3: Pending Verifications */}
        <div className="rounded-2xl border border-[#A60E13]/40 bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#A60E13] font-bold">
              Pending ID Desk
            </span>
            <span className="rounded-full bg-[#A60E13] px-1.5 py-0.5 font-mono text-[9px] font-black text-white">
              {pendingIdCount}
            </span>
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {pendingIdCount} IDs
          </p>
          <span className="font-mono text-[11px] text-[#A60E13]">Action required pre-match</span>
        </div>

        {/* Metric 4: Collected Fees */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">Fees Collected</span>
            <span className="text-sm">💳</span>
          </div>
          <p className="mt-2 font-mono text-xl sm:text-2xl font-black text-emerald-400">
            {totalCollectedFees.toLocaleString()} EGP
          </p>
          <span className="font-mono text-[11px] text-[#8E8E93]">
            {pendingFeeCount} fees pending review
          </span>
        </div>
      </div>

      {/* ---------------- 3. TOURNAMENTS LIST & FILTER TABS ---------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-2">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                filter === "all"
                  ? "bg-[#A60E13] text-white font-bold"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              All ({tournaments.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("live")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                filter === "live"
                  ? "bg-[#A60E13] text-white font-bold"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              Live ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("upcoming")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                filter === "upcoming"
                  ? "bg-[#A60E13] text-white font-bold"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setFilter("completed")}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                filter === "completed"
                  ? "bg-[#A60E13] text-white font-bold"
                  : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
              }`}
            >
              Completed
            </button>
          </div>

          <span className="font-mono text-xs text-[#8E8E93] hidden sm:inline">
            Showing {filteredTournaments.length} Tournament Fixtures
          </span>
        </div>

        {/* Tournament Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {filteredTournaments.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl transition hover:border-white/20"
            >
              {/* Card Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F24] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase text-[#A60E13]">
                      {t.sport} · {t.universityLeague}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                        t.status === "live"
                          ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                          : "bg-[#1C1C1E] text-[#8E8E93]"
                      }`}
                    >
                      {t.status === "live" ? "● Live In Progress" : "Upcoming"}
                    </span>
                  </div>

                  <h3 className="mt-1 font-sans font-bold text-lg sm:text-2xl text-white">
                    {t.title}
                  </h3>

                  <p className="mt-0.5 font-mono text-xs text-[#8E8E93]">
                    📍 {t.venue} ({t.pitchName}) · 🗓️ {t.startDate} - {t.endDate}
                  </p>
                </div>

                {/* Teams Capacity Badge */}
                <div className="shrink-0 rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 sm:text-right">
                  <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
                    Enrolled Capacity
                  </span>
                  <span className="font-mono text-base font-black text-white">
                    {t.enrolledTeamsCount} / {t.maxTeams} Teams
                  </span>
                </div>
              </div>

              {/* Middle Financial & Service Badges */}
              <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-3">
                  <span className="font-mono text-[10px] text-[#8E8E93] uppercase block">
                    Entry Fee / Team
                  </span>
                  <span className="font-mono font-bold text-white">
                    {t.entryFeeEgp.toLocaleString()} EGP
                  </span>
                </div>

                <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-3">
                  <span className="font-mono text-[10px] text-[#8E8E93] uppercase block">
                    Collected Fees
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {t.collectedFeesEgp.toLocaleString()} / {t.totalExpectedFeesEgp.toLocaleString()} EGP
                  </span>
                </div>

                <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-3">
                  <span className="font-mono text-[10px] text-[#8E8E93] uppercase block">
                    Active Fan Services
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    {t.fanServices.filter((s) => s.enabled).map((s) => (
                      <span key={s.id} title={s.label} className="text-sm">
                        {s.icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action CTAs (Pitch-Side Optimized) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1F1F24]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenReviewDesk(t.id)}
                    className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95"
                  >
                    <span>🛡️ ID &amp; Payment Desk</span>
                    {t.pendingVerificationsCount > 0 && (
                      <span className="rounded-full bg-[#A60E13] px-1.5 py-0.2 font-mono text-[9px] font-black text-white">
                        {t.pendingVerificationsCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenSetup(t.id)}
                    className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95"
                  >
                    <span>⚙️ Setup &amp; Rules</span>
                  </button>

                  {onDeleteTournament && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${t.title}"?`)) {
                          onDeleteTournament(t.id)
                        }
                      }}
                      title="Delete Tournament"
                      className="flex min-h-[42px] items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-3 py-2 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] hover:border-[#A60E13]/50 transition cursor-pointer active:scale-95"
                    >
                      🗑️
                    </button>
                  )}
                </div>

                {/* Primary Pitch Day Controller Action */}
                <button
                  type="button"
                  onClick={() => onOpenPitchController(t.id)}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30"
                >
                  <span>⚽ Match Day Controller</span>
                  <span className="text-[10px] opacity-80">(Roll Call &amp; Live Score)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
