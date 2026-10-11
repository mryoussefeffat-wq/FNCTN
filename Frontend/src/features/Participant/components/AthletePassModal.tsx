import type { AthleteProfile, UpcomingMatch } from "../../../types/participant"

interface AthletePassModalProps {
  isOpen: boolean
  onClose: () => void
  athlete: AthleteProfile
  match?: UpcomingMatch
  teamName: string
}

export default function AthletePassModal({
  isOpen,
  onClose,
  athlete,
  match,
  teamName,
}: AthletePassModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl text-white no-scrollbar">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95 z-10"
          aria-label="Close match pass"
        >
          ✕
        </button>

        {/* Digital Accreditation Header */}
        <div className="text-center border-b border-[#1F1F24] pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A60E13]/40 bg-[#A60E13]/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#A60E13]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-ping" />
            Official Collegiate Accreditation
          </div>
          <h2 className="mt-2 text-xl font-bold font-sans tracking-tight text-white">
            ATHLETE MATCH DAY PASS
          </h2>
          <p className="mt-0.5 text-xs text-[#8E8E93] font-mono">
            License #EGY-2026-0941 · Verified Pitch Access
          </p>
        </div>

        {/* Main Accreditation ID Card */}
        <div className="mt-5 relative overflow-hidden rounded-2xl border-2 border-[#A60E13]/60 bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0A] p-4 sm:p-5 shadow-2xl">
          {/* Hologram security ribbon */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#A60E13] via-white/80 to-[#A60E13]" />

          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={athlete.photoUrl}
                alt={`${athlete.firstName} ${athlete.lastName}`}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#A60E13] text-[11px] font-black text-white shadow-md border-2 border-[#0A0A0A]">
                #{athlete.jerseyNumber}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-block rounded bg-[#000000]/70 px-2 py-0.5 font-mono text-[9px] font-bold text-[#A60E13] uppercase">
                {athlete.primaryPosition}
              </span>
              <h3 className="mt-1 font-sans text-lg sm:text-xl font-bold text-white truncate">
                {athlete.firstName} {athlete.lastName}
              </h3>
              <p className="text-xs font-semibold text-white/90 truncate">
                {athlete.university}
              </p>
              <p className="font-mono text-[11px] text-[#8E8E93] truncate">
                Team: <span className="text-white font-bold">{teamName}</span>
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  ✓
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  IDs Verified &amp; Cleared
                </span>
              </div>
            </div>
          </div>

          {/* Match Assignment Details */}
          {match && (
            <div className="mt-4 rounded-xl border border-[#1F1F24] bg-[#000000]/80 p-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#1F1F24] pb-2 font-mono text-[10px]">
                <span className="text-[#8E8E93] uppercase">NEXT FIXTURE</span>
                <span className="text-[#A60E13] font-bold">{match.round}</span>
              </div>
              <div className="mt-2 flex items-center justify-between font-sans">
                <span className="font-bold text-white text-sm">{teamName}</span>
                <span className="font-mono text-xs text-[#8E8E93]">vs</span>
                <span className="font-bold text-white text-sm">{match.opponentTeam}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#8E8E93] pt-2 border-t border-[#1F1F24]/60">
                <div>
                  <span className="block text-[9px] uppercase">VENUE &amp; PITCH</span>
                  <span className="text-white font-medium">{match.pitch}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase">ROLL CALL DEADLINE</span>
                  <span className="text-[#A60E13] font-bold">{match.rollCallTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Official Scannable Barcode & QR code for match referee roll call */}
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-3 text-black">
            {/* High-contrast pitch check-in barcode */}
            <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#000_0px,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_7px,transparent_7px,transparent_9px,#000_9px,#000_13px,transparent_13px,transparent_15px)] rounded" />
            <div className="mt-2 flex w-full items-center justify-between font-mono text-[9px] font-bold tracking-widest text-black">
              <span>SCAN AT PITCH DESK</span>
              <span>{athlete.studentIdNumber}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              alert("Digital Pass saved to offline device storage!")
            }}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
          >
            <span>Save Offline Pass</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] items-center justify-center rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
