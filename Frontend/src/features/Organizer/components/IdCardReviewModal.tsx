import { useState } from "react"
import type { PlayerReviewItem, IdVerificationStatus } from "../../../types/organizer"

interface IdCardReviewModalProps {
  player: PlayerReviewItem | null
  isOpen: boolean
  onClose: () => void
  onResolve: (playerId: string, status: IdVerificationStatus, reason?: string) => void
}

export default function IdCardReviewModal({
  player,
  isOpen,
  onClose,
  onResolve,
}: IdCardReviewModalProps) {
  const [activeCardTab, setActiveCardTab] = useState<"student" | "nat_front" | "nat_back">("student")
  const [showRejectPrompt, setShowRejectPrompt] = useState(false)
  const [rejectReason, setRejectReason] = useState("Blurred document image - unreadable details")

  if (!isOpen || !player) return null

  function handleApprove() {
    onResolve(player!.id, "verified")
    setShowRejectPrompt(false)
    onClose()
  }

  function handleConfirmReject() {
    onResolve(player!.id, "rejected", rejectReason)
    setShowRejectPrompt(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setShowRejectPrompt(false)
            onClose()
          }}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] text-sm text-[#8E8E93] hover:text-white transition cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#1F1F24] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
              Collegiate ID Accreditation Desk
            </span>
            <span className="rounded-md border border-[#1F1F24] bg-[#1C1C1E] px-2 py-0.5 font-mono text-[9px] text-[#8E8E93]">
              {player.tournamentTitle}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3.5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E]">
              <img
                src={player.avatarUrl}
                alt={player.playerName}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 rounded-tl-md bg-[#A60E13] px-1 font-mono text-[9px] font-bold text-white">
                #{player.jerseyNumber}
              </span>
            </div>

            <div>
              <h2 className="font-sans font-bold text-lg sm:text-xl text-white">
                {player.playerName}
              </h2>
              <p className="font-mono text-xs text-[#8E8E93]">
                {player.position} · <span className="text-white font-medium">{player.teamName}</span> ({player.university})
              </p>
            </div>
          </div>
        </div>

        {/* Document Metadata Strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-[#1F1F24] bg-[#000000] p-3 text-xs">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
              University Academic ID
            </span>
            <span className="font-mono font-bold text-white tracking-wide">
              {player.studentAcademicId}
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
              Egyptian National ID #
            </span>
            <span className="font-mono font-bold text-white tracking-wide">
              {player.nationalIdNumber}
            </span>
          </div>
        </div>

        {/* Document Switcher Tabs */}
        <div className="mt-4 flex items-center gap-1.5 border-b border-[#1F1F24] pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveCardTab("student")}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
              activeCardTab === "student"
                ? "bg-[#A60E13] text-white font-bold shadow-sm"
                : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
            }`}
          >
            🎓 University Student ID
          </button>

          <button
            type="button"
            onClick={() => setActiveCardTab("nat_front")}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
              activeCardTab === "nat_front"
                ? "bg-[#A60E13] text-white font-bold shadow-sm"
                : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
            }`}
          >
            🪪 National ID (Front)
          </button>

          <button
            type="button"
            onClick={() => setActiveCardTab("nat_back")}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
              activeCardTab === "nat_back"
                ? "bg-[#A60E13] text-white font-bold shadow-sm"
                : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
            }`}
          >
            🪪 National ID (Back)
          </button>
        </div>

        {/* Document Preview Box */}
        <div className="mt-3 relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#000000] flex items-center justify-center p-2">
          <img
            src={
              activeCardTab === "student"
                ? player.studentIdCardUrl
                : activeCardTab === "nat_front"
                ? player.nationalIdCardFrontUrl
                : player.nationalIdCardBackUrl
            }
            alt="Submitted ID document preview"
            className="h-full w-full object-contain rounded-xl"
          />

          <span className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-[10px] text-white border border-white/10 backdrop-blur-sm">
            Submitted: {player.submittedAt}
          </span>
        </div>

        {/* Rejection Reason Form (Conditional) */}
        {showRejectPrompt && (
          <div className="mt-4 rounded-2xl border border-[#A60E13]/50 bg-[#A60E13]/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#A60E13] uppercase">
                Select Reason for Rejection
              </span>
              <button
                type="button"
                onClick={() => setShowRejectPrompt(false)}
                className="text-xs text-[#8E8E93] hover:text-white"
              >
                Cancel
              </button>
            </div>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
            >
              <option value="Blurred document image - unreadable details">
                Blurred document image - unreadable details
              </option>
              <option value="Expired academic student ID card">
                Expired academic student ID card
              </option>
              <option value="Name on National ID does not match roster submission">
                Name on National ID does not match roster submission
              </option>
              <option value="Not an official accredited Egyptian university card">
                Not an official accredited Egyptian university card
              </option>
            </select>

            <button
              type="button"
              onClick={handleConfirmReject}
              className="w-full min-h-[44px] rounded-xl bg-[#A60E13] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer shadow-md shadow-[#A60E13]/30"
            >
              Confirm Rejection &amp; Notify Captain
            </button>
          </div>
        )}

        {/* Bottom Pitch-Side Resolution Buttons */}
        {!showRejectPrompt && (
          <div className="mt-5 grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRejectPrompt(true)}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8E8E93] hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95"
            >
              <span>✕</span> Reject ID
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-900/30"
            >
              <span>✓</span> Approve &amp; Accredit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
