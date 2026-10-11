import type { RollCallPlayer, RollCallStatus } from "../../../types/organizer"

interface RollCallPlayerRowProps {
  player: RollCallPlayer
  onStatusChange: (playerId: string, status: RollCallStatus) => void
}

export default function RollCallPlayerRow({
  player,
  onStatusChange,
}: RollCallPlayerRowProps) {
  const isPresent = player.rollCallStatus === "present"
  const isNoShow = player.rollCallStatus === "no_show"

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-2xl border p-3.5 sm:p-4 transition ${
        isPresent
          ? "border-emerald-500/40 bg-emerald-950/10"
          : isNoShow
          ? "border-[#A60E13]/50 bg-[#A60E13]/10"
          : "border-[#1F1F24] bg-[#000000]"
      }`}
    >
      {/* Player Identity Details */}
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E]">
          <img
            src={player.photoUrl}
            alt={player.name}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-[#A60E13] px-1 font-mono text-[9px] font-black text-white">
            #{player.jerseyNumber}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-sans font-bold text-sm sm:text-base text-white">
              {player.name}
            </span>
            {player.isCaptain && (
              <span className="rounded-md border border-[#A60E13]/60 bg-[#A60E13]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#A60E13] uppercase">
                👑 Captain
              </span>
            )}
          </div>

          <div className="mt-0.5 flex items-center gap-2 text-xs">
            <span className="font-mono text-[#8E8E93] text-[11px]">
              {player.position}
            </span>
            <span className="text-[#1F1F24]">·</span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified ID
            </span>
          </div>

          {player.checkInTime && isPresent && (
            <p className="mt-0.5 font-mono text-[10px] text-[#8E8E93]">
              Checked in at {player.checkInTime}
            </p>
          )}
        </div>
      </div>

      {/* Large Pitch-Side Touch Action Buttons (Min height 48px) */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2.5 shrink-0">
        <button
          type="button"
          onClick={() => onStatusChange(player.id, "present")}
          className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 ${
            isPresent
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400/50"
              : "border border-[#1F1F24] bg-[#1C1C1E] text-[#8E8E93] hover:border-emerald-500 hover:text-white"
          }`}
          aria-label={`Mark ${player.name} as Present`}
        >
          <span>✓</span>
          <span>Present</span>
        </button>

        <button
          type="button"
          onClick={() => onStatusChange(player.id, "no_show")}
          className={`flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 ${
            isNoShow
              ? "bg-[#A60E13] text-white shadow-lg shadow-[#A60E13]/40 ring-2 ring-[#A60E13]/60"
              : "border border-[#1F1F24] bg-[#1C1C1E] text-[#8E8E93] hover:border-[#A60E13] hover:text-[#A60E13]"
          }`}
          aria-label={`Mark ${player.name} as No-Show`}
        >
          <span>✕</span>
          <span>No-Show</span>
        </button>
      </div>
    </div>
  )
}
