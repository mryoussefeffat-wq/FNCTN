import { useState } from "react"
import { copyToClipboard } from "../utils/formatters"

interface LiveMatchModalProps {
  isOpen: boolean
  onClose: () => void
  onSignUpAthlete: () => void
}

export default function LiveMatchModal({
  isOpen,
  onClose,
  onSignUpAthlete,
}: LiveMatchModalProps) {
  const [copiedLink, setCopiedLink] = useState(false)

  if (!isOpen) return null

  async function handleShareMatchGraphic() {
    await copyToClipboard(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-8 shadow-2xl no-scrollbar [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] text-[#8E8E93] transition hover:text-white cursor-pointer active:scale-95 z-10"
          aria-label="Close viewer"
        >
          ✕
        </button>

        {/* Header / Sponsor Slot */}
        <div className="border-b border-[#1F1F24] pb-3.5 pr-10 sm:pb-4 sm:pr-0">
          <span className="inline-block rounded-md border border-[#A60E13]/40 bg-[#A60E13]/15 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase text-white">
            ⚡ Presented by Red Bull
          </span>
          <h2 className="font-sans font-semibold mt-2 text-xl sm:text-2xl text-white">
            Live Match Viewer
          </h2>
          <p className="mt-1 font-mono text-[11px] sm:text-xs text-[#8E8E93]">
            Capital University Football Championship &apos;26 · Quarter-Final
            Match
          </p>
        </div>

        {/* Big Live Scoreboard */}
        <div className="my-4 sm:my-6 rounded-2xl border border-[#1F1F24] bg-[#000000] p-3.5 sm:p-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase text-[#A60E13]">
            <span className="h-2 w-2 animate-ping rounded-full bg-[#A60E13]" />
            <span>Live 67&apos; Minutes · Second Half</span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-6 py-2">
            <div className="flex flex-col items-center">
              <div className="mb-1.5 sm:mb-2 flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] font-mono text-xs sm:text-lg font-bold text-white shadow-inner">
                AUC
              </div>
              <h4 className="font-sans font-semibold text-sm sm:text-xl truncate max-w-[100px] sm:max-w-none text-white">
                AUC Titans
              </h4>
              <p className="font-mono text-[10px] sm:text-xs text-[#8E8E93]">
                24&apos;, 58&apos;
              </p>
            </div>

            <div className="font-mono text-3xl sm:text-6xl font-black tabular-nums text-white">
              2 <span className="text-[#A60E13]">:</span> 1
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-1.5 sm:mb-2 flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] font-mono text-xs sm:text-lg font-bold text-white shadow-inner">
                GUC
              </div>
              <h4 className="font-sans font-semibold text-sm sm:text-xl truncate max-w-[100px] sm:max-w-none text-white">
                GUC Eagles
              </h4>
              <p className="font-mono text-[10px] sm:text-xs text-[#8E8E93]">
                39&apos; (Pen)
              </p>
            </div>
          </div>
        </div>

        {/* Sponsor Ad Banner Slot */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-[#A60E13]/30 bg-[#0A0A0A] p-3 sm:p-3.5 text-xs">
          <div>
            <p className="font-semibold text-white text-[12px] sm:text-xs">
              Red Bull Student Energy Station
            </p>
            <p className="text-[11px] text-white/70 font-normal">
              Free can for every collegiate student card presented at gate 3.
            </p>
          </div>
          <span className="self-start sm:self-auto font-mono text-[9px] sm:text-[10px] font-bold uppercase text-[#A60E13]">
            Official Sponsor
          </span>
        </div>

        {/* Match Telemetry / Key Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center font-mono text-xs">
          <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 sm:p-3">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase text-[#8E8E93]">
              Shots on Target
            </p>
            <p className="mt-1 text-sm sm:text-base font-bold text-white">
              7 - 4
            </p>
          </div>
          <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 sm:p-3">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase text-[#8E8E93]">
              Possession
            </p>
            <p className="mt-1 text-sm sm:text-base font-bold text-white">
              54% - 46%
            </p>
          </div>
          <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 sm:p-3">
            <p className="font-mono text-[9px] sm:text-[10px] uppercase text-[#8E8E93]">
              Top Speed
            </p>
            <p className="mt-1 text-sm sm:text-base font-bold text-[#A60E13]">
              34.2 km/h
            </p>
          </div>
        </div>

        {/* Social Share / Graphic Download */}
        <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={handleShareMatchGraphic}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-[0.99] cursor-pointer shadow-md shadow-[#A60E13]/30"
          >
            <span>
              {copiedLink ? "✓ Match Link Copied!" : "Download Match Graphic"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose()
              onSignUpAthlete()
            }}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-3 font-mono text-xs text-white transition hover:border-[#A60E13] hover:text-[#A60E13] cursor-pointer"
          >
            Sign Up as Player
          </button>
        </div>
      </div>
    </div>
  )
}
