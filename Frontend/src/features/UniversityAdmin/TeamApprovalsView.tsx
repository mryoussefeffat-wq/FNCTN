import { useState } from "react"
import type { UniversityTeamClearance, UniversityClearanceStatus } from "../../types/universityAdmin"

interface TeamApprovalsViewProps {
  teamClearances: UniversityTeamClearance[]
  onInspectTeam: (clearance: UniversityTeamClearance) => void
  onApproveTeam: (clearanceId: string, permitCode: string) => void
  onDenyTeamClick: (clearance: UniversityTeamClearance) => void
  onBackToDashboard: () => void
}

export default function TeamApprovalsView({
  teamClearances,
  onInspectTeam,
  onApproveTeam,
  onDenyTeamClick,
  onBackToDashboard,
}: TeamApprovalsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | UniversityClearanceStatus>("all")
  const [sportFilter, setSportFilter] = useState<string>("all")

  const sports = Array.from(new Set(teamClearances.map((t) => t.sport)))

  const filteredTeams = teamClearances.filter((team) => {
    const matchesStatus = statusFilter === "all" || team.status === statusFilter
    const matchesSport = sportFilter === "all" || team.sport === sportFilter
    const matchesSearch =
      searchTerm === "" ||
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.targetTournamentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.captainName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSport && matchesSearch
  })

  const pendingCount = teamClearances.filter((t) => t.status === "pending").length

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. HEADER ROW ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-5">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer mb-1"
          >
            ← Back to University Dashboard
          </button>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Athletic Affairs &amp; Dean Clearance Desk
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Team Representation Endorsement
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Verify complete student enrollment teams before issuing official accreditation permits for university tournaments.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="rounded-2xl border border-amber-500/50 bg-amber-950/20 px-4 py-2 font-mono text-xs font-bold text-amber-300">
            {pendingCount} Teams Awaiting Endorsement
          </span>
        </div>
      </div>

      {/* ---------------- 2. SEARCH & FILTERS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        {/* Search Bar */}
        <div className="sm:col-span-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by team name, tournament, or team captain..."
              className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 pl-10 text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
            />
            <span className="absolute left-3.5 top-3.5 text-[#8E8E93] text-sm">🔍</span>
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 text-xs text-white focus:border-[#A60E13] focus:outline-none cursor-pointer"
          >
            <option value="all">All Clearance Statuses</option>
            <option value="pending">Pending Endorsement</option>
            <option value="approved">Approved &amp; Cleared</option>
            <option value="rejected">Denied Clearance</option>
          </select>
        </div>

        {/* Sport Filter */}
        <div className="sm:col-span-3">
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 text-xs text-white focus:border-[#A60E13] focus:outline-none cursor-pointer"
          >
            <option value="all">All Sports</option>
            {sports.map((sp) => (
              <option key={sp} value={sp}>
                {sp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------- 3. TEAM CLEARANCES LIST ---------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] px-1">
          <span>Showing {filteredTeams.length} Teams</span>
        </div>

        {filteredTeams.length === 0 ? (
          <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-10 text-center font-mono text-xs text-[#8E8E93]">
            No team clearance applications match your search filters.
          </div>
        ) : (
          filteredTeams.map((team) => {
            const verifiedAthletes = team.roster.filter((r) => r.isEnrolledVerified).length
            const totalAthletes = team.roster.length
            const isFullyVerified = verifiedAthletes === totalAthletes

            return (
              <div
                key={team.id}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 shadow-xl transition hover:border-white/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Team & Tournament Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={team.teamLogoUrl}
                      alt={team.teamName}
                      className="h-16 w-16 rounded-2xl object-cover border border-[#1F1F24] shrink-0"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-sans font-bold text-lg text-white">{team.teamName}</h3>
                        <span className="rounded bg-[#1C1C1E] border border-white/10 px-2 py-0.5 font-mono text-[10px] text-[#8E8E93]">
                          {team.sport}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                            team.status === "approved"
                              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                              : team.status === "rejected"
                                ? "bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13]"
                                : "bg-amber-950/50 border border-amber-500/40 text-amber-300"
                          }`}
                        >
                          ● {team.status === "approved" ? "Cleared" : team.status}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <span className="text-[#8E8E93]">
                          Representing in:{" "}
                          <strong className="text-white font-medium">{team.targetTournamentTitle}</strong>
                        </span>
                        <span className="text-[#8E8E93]">
                          Captain: <strong className="text-white">{team.captainName}</strong> (
                          {team.captainEmail})
                        </span>
                      </div>

                      {/* Team & Permit Status Row */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 border ${
                            isFullyVerified
                              ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-400"
                              : "border-amber-500/40 bg-amber-950/30 text-amber-300"
                          }`}
                        >
                          <span>{isFullyVerified ? "✓" : "⚠️"}</span>
                          <span>
                            Team: {verifiedAthletes}/{totalAthletes} Verified Students
                          </span>
                        </div>

                        {team.status === "approved" && team.officialPermitCode && (
                          <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1 text-white">
                            <span className="text-[#8E8E93]">Permit:</span>
                            <span className="font-bold text-emerald-400">{team.officialPermitCode}</span>
                          </div>
                        )}

                        {team.status === "rejected" && team.rejectionReason && (
                          <div className="text-xs text-[#A60E13]">
                            Denial reason: {team.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#1F1F24]">
                    <button
                      type="button"
                      onClick={() => onInspectTeam(team)}
                      className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95"
                    >
                      <span>📋 Audit Team &amp; Permit</span>
                    </button>

                    {team.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => {
                          const permitCode = `DEAN-ATH-${Date.now().toString().slice(-6)}`
                          onApproveTeam(team.id, permitCode)
                        }}
                        className="flex min-h-[42px] items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-950/40"
                      >
                        <span>✓ Grant Clearance</span>
                      </button>
                    )}

                    {team.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => onDenyTeamClick(team)}
                        className="flex min-h-[42px] items-center gap-1 rounded-xl border border-[#A60E13]/40 bg-[#A60E13]/10 px-3 py-2 font-mono text-xs font-bold text-[#A60E13] hover:bg-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
                      >
                        <span>✕ Deny</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
