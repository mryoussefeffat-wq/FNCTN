import type { LiveMatchControllerState } from "../../../types/organizer"

interface EndMatchConfirmModalProps {
  match: LiveMatchControllerState | null
  isOpen: boolean
  onClose: () => void
  onConfirmEnd: (winnerTeamId: string) => void
}

export default function EndMatchConfirmModal({
  match,
  isOpen,
  onClose,
  onConfirmEnd,
}: EndMatchConfirmModalProps) {
  if (!isOpen || !match) return null

  const isTeamAWinner = match.teamA.score > match.teamB.score
  const isTeamBWinner = match.teamB.score > match.teamA.score
  const isDraw = match.teamA.score === match.teamB.score

  const winner = isTeamAWinner
    ? match.teamA
    : isTeamBWinner
    ? match.teamB
    : null

  function handleConfirm() {
    const winnerId = winner ? winner.id : match!.teamA.id // default to teamA if tiebreak resolved
    onConfirmEnd(winnerId)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl text-white text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A60E13]/20 border border-[#A60E13]/50 text-3xl mb-4">
          🏁
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
          Official Match Finalization
        </span>

        <h2 className="mt-1 font-sans font-black text-2xl sm:text-3xl text-white">
          End This Match?
        </h2>

        {/* Scoreboard Result Snapshot */}
        <div className="mt-5 rounded-2xl border border-[#1F1F24] bg-[#000000] p-4">
          <div className="flex items-center justify-around">
            <div>
              <p className="font-sans font-bold text-base text-white">{match.teamA.name}</p>
              <p className="font-mono text-xs text-[#8E8E93]">{match.teamA.university}</p>
            </div>

            <div className="font-mono text-3xl font-black text-white px-4">
              {match.teamA.score} - {match.teamB.score}
            </div>

            <div>
              <p className="font-sans font-bold text-base text-white">{match.teamB.name}</p>
              <p className="font-mono text-xs text-[#8E8E93]">{match.teamB.university}</p>
            </div>
          </div>

          <div className="mt-3 border-t border-[#1F1F24] pt-3 text-xs font-mono">
            {winner ? (
              <span className="text-emerald-400 font-bold">
                🏆 Advancing to Next Round: {winner.name}
              </span>
            ) : (
              <span className="text-amber-400 font-bold">
                ⚖️ Drawn Match - Penalty Shootout / Coin Toss Required
              </span>
            )}
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-4 rounded-xl border border-[#A60E13]/40 bg-[#A60E13]/10 p-3.5 text-left text-xs leading-relaxed text-white/90">
          <p className="font-bold text-[#A60E13] mb-1">Notice to Match Official:</p>
          Ending this match finalizes the official referee scorecard, concludes the pitch controller session, and advances the winning team to the next round in the championship bracket.
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95"
          >
            Cancel &amp; Keep Live
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex min-h-[48px] items-center justify-center rounded-xl bg-[#A60E13] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/40"
          >
            Confirm &amp; End Match
          </button>
        </div>
      </div>
    </div>
  )
}
