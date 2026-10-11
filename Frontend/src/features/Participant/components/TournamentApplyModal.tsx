import { useState } from "react"
import type { ParticipantTeam, TeamTournamentApplication } from "../../../types/participant"
import { AVAILABLE_COLLEGIATE_TOURNAMENTS } from "../mockData"

interface TournamentApplyModalProps {
  isOpen: boolean
  onClose: () => void
  team: ParticipantTeam
  onApplyTournament: (application: TeamTournamentApplication) => void
}

export default function TournamentApplyModal({
  isOpen,
  onClose,
  team,
  onApplyTournament,
}: TournamentApplyModalProps) {
  const [selectedTournamentId, setSelectedTournamentId] = useState(
    AVAILABLE_COLLEGIATE_TOURNAMENTS[0].id
  )
  const [confirmedByCaptain, setConfirmedByCaptain] = useState(false)

  if (!isOpen) return null

  const selectedTourney =
    AVAILABLE_COLLEGIATE_TOURNAMENTS.find((t) => t.id === selectedTournamentId) ||
    AVAILABLE_COLLEGIATE_TOURNAMENTS[0]

  // Eligibility Checks
  const totalRoster = team.roster.length
  const verifiedCount = team.roster.filter((m) => m.verificationStatus === "verified").length
  const meetsMinRoster = totalRoster >= selectedTourney.minRoster
  const allIdsVerified = verifiedCount === totalRoster && totalRoster > 0
  const isEligibleToApply = meetsMinRoster && allIdsVerified && confirmedByCaptain

  const alreadyApplied = team.appliedTournaments.some(
    (app) => app.tournamentId === selectedTourney.id
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isEligibleToApply || alreadyApplied) return

    onApplyTournament({
      tournamentId: selectedTourney.id,
      tournamentTitle: selectedTourney.title,
      appliedAt: new Date().toISOString().split("T")[0],
      status: "applied",
      seedGroup: "Group Stage Qualification",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl text-white no-scrollbar">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95 z-10"
        >
          ✕
        </button>

        <div className="border-b border-[#1F1F24] pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
            Collegiate League Application
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            Apply Team to Tournament
          </h2>
          <p className="mt-1 text-xs text-[#8E8E93]">
            Applying registers <strong className="text-white">{team.name}</strong> for official bracket seeding.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Tournament Selector */}
          <div>
            <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
              Select Collegiate Tournament *
            </label>
            <div className="space-y-2">
              {AVAILABLE_COLLEGIATE_TOURNAMENTS.map((t) => {
                const isSelected = t.id === selectedTournamentId
                const isAlreadyIn = team.appliedTournaments.some((a) => a.tournamentId === t.id)
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTournamentId(t.id)}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? "border-[#A60E13] bg-[#A60E13]/10"
                        : "border-[#1F1F24] bg-[#000000] hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-sm text-white">
                          {t.title}
                        </span>
                        {isAlreadyIn && (
                          <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                            Application Active
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[11px] text-[#8E8E93] mt-0.5">
                        📅 {t.dates} · 📍 {t.venue}
                      </p>
                      <p className="font-mono text-[10px] text-white/70 mt-1">
                        Entry Fee: {t.entryFee} · Roster: Min {t.minRoster} Players
                      </p>
                    </div>

                    <span
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? "border-[#A60E13] bg-[#A60E13]"
                          : "border-[#1F1F24] bg-transparent"
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Team Eligibility Checklist */}
          <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-xs font-mono">
            <h4 className="font-bold text-white uppercase text-[11px] border-b border-[#1F1F24] pb-2 mb-3">
              Official Eligibility Verification Checklist
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span>1. Minimum Roster Size (Min {selectedTourney.minRoster} Players):</span>
                <span className={meetsMinRoster ? "text-emerald-400 font-bold" : "text-[#A60E13] font-bold"}>
                  {meetsMinRoster ? `✓ ${totalRoster} / ${selectedTourney.minRoster} Registered` : `⚠️ ${totalRoster} / ${selectedTourney.minRoster} Registered`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>2. 100% Student &amp; National ID Verification:</span>
                <span className={allIdsVerified ? "text-emerald-400 font-bold" : "text-[#A60E13] font-bold"}>
                  {allIdsVerified ? `✓ ${verifiedCount}/${totalRoster} Verified` : `⚠️ Only ${verifiedCount}/${totalRoster} Verified`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>3. University Delegation Clearance:</span>
                <span className="text-emerald-400 font-bold">✓ {team.university} Cleared</span>
              </div>
            </div>

            {!allIdsVerified && (
              <div className="mt-3 rounded-lg border border-[#A60E13]/50 bg-[#A60E13]/10 p-2 text-[11px] text-[#A60E13]">
                Every registered team player must upload their Student ID and National ID in their Profile before application can be submitted.
              </div>
            )}
          </div>

          {/* Captain Confirmation */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/90">
            <input
              type="checkbox"
              checked={confirmedByCaptain}
              onChange={(e) => setConfirmedByCaptain(e.target.checked)}
              className="mt-0.5 rounded border-[#1F1F24] text-[#A60E13] focus:ring-[#A60E13]"
            />
            <span>
              I certify as Team Captain that all rostered players are actively enrolled collegiate students representing {team.university}.
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!isEligibleToApply || alreadyApplied}
              className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {alreadyApplied ? "Already Registered" : "Submit Tournament Application"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[46px] rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
