import { useState } from "react"
import type { UniversityTeamClearance } from "../../../types/universityAdmin"

interface TeamClearanceModalProps {
  clearance: UniversityTeamClearance | null
  isOpen: boolean
  onClose: () => void
  onApproveTeam: (clearanceId: string, permitCode: string) => void
  onRejectTeam: (clearanceId: string, reason: string) => void
}

export default function TeamClearanceModal({
  clearance,
  isOpen,
  onClose,
  onApproveTeam,
  onRejectTeam,
}: TeamClearanceModalProps) {
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectBox, setShowRejectBox] = useState(false)

  if (!isOpen || !clearance) return null

  const verifiedCount = clearance.roster.filter((p) => p.isEnrolledVerified).length
  const totalCount = clearance.roster.length
  const isFullyVerified = verifiedCount === totalCount

  function handleApprove() {
    if (!clearance) return
    const permitCode = `DEAN-ATH-${Date.now().toString().slice(-6)}`
    onApproveTeam(clearance.id, permitCode)
    onClose()
  }

  function handleReject(e: React.FormEvent) {
    e.preventDefault()
    if (!clearance || !rejectReason.trim()) return
    onRejectTeam(clearance.id, rejectReason.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl my-auto text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-3">
            <img
              src={clearance.teamLogoUrl}
              alt={clearance.teamName}
              className="h-12 w-12 rounded-xl object-cover border border-[#1F1F24]"
            />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
                University Tournament Clearance Review
              </span>
              <h2 className="mt-0.5 font-sans font-bold text-xl sm:text-2xl text-white">
                {clearance.teamName}
              </h2>
              <p className="text-xs text-[#8E8E93]">
                Applying to represent University in <span className="text-white font-semibold">{clearance.targetTournamentTitle}</span> ({clearance.sport})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] text-sm text-[#8E8E93] hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Clearance Audit Banner */}
        <div className="mt-4">
          <div
            className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isFullyVerified
                ? "border-emerald-500/50 bg-emerald-950/20 text-emerald-400"
                : "border-amber-500/50 bg-amber-950/20 text-amber-300"
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base">{isFullyVerified ? "✓" : "⚠️"}</span>
                <span className="font-mono text-xs font-bold uppercase">
                  {isFullyVerified ? "Team 100% Verified" : "Action Required: Unverified Athletes"}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#8E8E93]">
                {verifiedCount} of {totalCount} athletes on this team hold verified university student status.
              </p>
            </div>

            <div className="shrink-0 font-mono text-sm font-black px-3 py-1 rounded-xl bg-black/40 border border-current">
              {verifiedCount} / {totalCount} Students
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="mt-4 space-y-2">
          <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
            Official Team Members &amp; Faculty Affiliation ({totalCount} Players)
          </span>

          <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
            {clearance.roster.map((player) => (
              <div
                key={player.studentId}
                className="flex items-center justify-between rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1C1C1E] font-mono text-[10px] font-bold text-[#8E8E93]">
                    #{player.jerseyNumber}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{player.name}</span>
                    <span className="font-mono text-[10px] text-[#8E8E93]">
                      {player.position} · {player.faculty}
                    </span>
                  </div>
                </div>

                <div>
                  {player.isEnrolledVerified ? (
                    <span className="rounded-md border border-emerald-500/40 bg-emerald-950/50 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400">
                      ✓ Verified Student
                    </span>
                  ) : (
                    <span className="rounded-md border border-amber-500/40 bg-amber-950/50 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-400">
                      ⏳ Verification Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Permit Details if Approved */}
        {clearance.status === "approved" && clearance.officialPermitCode && (
          <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 font-mono text-xs text-emerald-400">
            <span>Official University Representation Permit Issued: </span>
            <span className="font-bold text-white">{clearance.officialPermitCode}</span>
          </div>
        )}

        {/* Rejection Input Box */}
        {showRejectBox && (
          <form onSubmit={handleReject} className="mt-4 space-y-2 border-t border-[#1F1F24] pt-3 text-xs">
            <label className="block font-mono text-[10px] uppercase text-[#A60E13]">
              Reason for Denying University Representation *
            </label>
            <input
              type="text"
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Incomplete student verifications; unregistered coach or faculty disciplinary hold."
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-xs text-white placeholder-[#8E8E93]/50 focus:border-[#A60E13] focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowRejectBox(false)}
                className="rounded-lg border border-[#1F1F24] px-3 py-1.5 font-mono text-xs text-[#8E8E93]"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#A60E13] px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#BF1218]"
              >
                Confirm Denial
              </button>
            </div>
          </form>
        )}

        {/* Bottom Actions */}
        {!showRejectBox && (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#1F1F24] pt-4">
            <button
              type="button"
              onClick={() => setShowRejectBox(true)}
              className="rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-4 py-2.5 font-mono text-xs font-bold text-[#A60E13] hover:bg-[#A60E13] hover:text-white transition cursor-pointer"
            >
              Deny University Clearance
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2.5 font-mono text-xs text-[#8E8E93] hover:text-white transition cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="min-h-[44px] rounded-xl bg-emerald-600 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-900/40"
              >
                Grant Official University Permit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
