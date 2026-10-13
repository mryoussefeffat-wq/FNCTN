import type { ParticipantTeam } from "../../../types/participant"

interface LeaveTeamConfirmModalProps {
  isOpen: boolean
  team: ParticipantTeam | null
  userId: string
  onClose: () => void
  onConfirmLeave: (teamId: string) => void
}

export default function LeaveTeamConfirmModal({
  isOpen,
  team,
  userId,
  onClose,
  onConfirmLeave,
}: LeaveTeamConfirmModalProps) {
  if (!isOpen || !team) return null

  const isCaptain = team.captainId === userId

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl text-white no-scrollbar">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95 z-10"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Warning Icon & Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13] text-2xl mb-3">
            ⚠️
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
            Mandatory Confirmation
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            Leave {team.name}?
          </h2>
        </div>

        {/* Warning Message Card */}
        <div className="mt-4 rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-xs font-mono space-y-2">
          <p className="text-white font-bold">
            Leaving this team will remove you from active competition.
          </p>
          <p className="text-[#8E8E93] leading-relaxed">
            You will lose tournament eligibility under <strong className="text-white">{team.name}</strong>, and
            your pitch-side digital accreditation pass for this team&apos;s matches will be revoked.
          </p>
          {isCaptain && (
            <div className="mt-2 rounded-lg border border-[#A60E13]/40 bg-[#A60E13]/15 p-2.5 text-[#A60E13] text-[11px]">
              👑 <strong>Captain Notice:</strong> You are currently the registered Captain of this team. Leaving will transfer captaincy to the next active team player or disband the team if no other players remain.
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              onConfirmLeave(team.id)
              onClose()
            }}
            className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-lg shadow-[#A60E13]/30 cursor-pointer"
          >
            <span>Confirm &amp; Leave Team</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
