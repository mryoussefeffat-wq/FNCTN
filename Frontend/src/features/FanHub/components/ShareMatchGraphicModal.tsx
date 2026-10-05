import { useState } from "react"
import type { LiveMatchDetails } from "../../../types/fanhub"
import { copyToClipboard } from "../../../utils/formatters"

interface ShareMatchGraphicModalProps {
  isOpen: boolean
  match: LiveMatchDetails
  onClose: () => void
}

export default function ShareMatchGraphicModal({
  isOpen,
  match,
  onClose,
}: ShareMatchGraphicModalProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  if (!isOpen) return null

  async function handleCopyShareLink() {
    const shareText = `🔥 LIVE MATCH ALERT: ${match.teamA.name} ${match.scoreA} - ${match.scoreB} ${match.teamB.name} (${match.matchClock}) in the ${match.tournamentTitle}! Follow live on FNCTN Fan Hub: ${window.location.href}`
    await copyToClipboard(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleSimulateDownload() {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      const blob = new Blob([
        `FNCTN MATCH SCORE GRAPHIC\n${match.tournamentTitle}\n${match.teamA.name} ${match.scoreA} - ${match.scoreB} ${match.teamB.name}\nMinute: ${match.matchClock} (${match.period})\nGenerated via FNCTN Collegiate Arena\nhttps://fnctn.sports.eg`,
      ], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `FNCTN_Score_${match.teamA.uniBadge}_vs_${match.teamB.uniBadge}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl sm:rounded-3xl border border-line bg-card p-5 sm:p-7 shadow-2xl no-scrollbar [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink text-mute transition hover:text-white cursor-pointer active:scale-95 z-10"
          aria-label="Close share modal"
        >
          ✕
        </button>

        <div className="border-b border-line pb-3.5 pr-8">
          <span className="inline-block rounded-md border border-volt/40 bg-volt/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
            Social Media Share Center
          </span>
          <h2 className="display mt-1.5 text-xl sm:text-2xl text-white">
            Match Score Graphic
          </h2>
          <p className="text-xs text-mute">
            Instagram &amp; Twitter ready broadcast card for student fan clubs.
          </p>
        </div>

        {/* ---------------- HIGH-CONTRAST BROADCAST CARD ---------------- */}
        <div
          id="match-graphic-card"
          className="my-5 relative overflow-hidden rounded-2xl border border-volt/40 bg-gradient-to-br from-[#0c0d12] via-ink to-[#090b10] p-6 text-center shadow-2xl"
        >
          {/* Background Decorative Rings */}
          <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-volt/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-red-600/15 blur-2xl pointer-events-none" />

          {/* Top Graphic Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-line/60 pb-3">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-volt">
              FNCTN ARENA BROADCAST
            </span>
            <span className="rounded bg-card px-2 py-0.5 font-mono text-[9px] text-mute uppercase">
              {match.stage}
            </span>
          </div>

          {/* Tournament Title */}
          <p className="relative z-10 mt-3 font-mono text-[11px] text-mute uppercase tracking-wider">
            {match.tournamentTitle}
          </p>

          {/* Live Score Display */}
          <div className="relative z-10 my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Team A */}
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-line text-2xl shadow-inner mb-1.5">
                {match.teamA.logo}
              </span>
              <span className="font-bold text-white text-sm">
                {match.teamA.uniBadge}
              </span>
              <span className="text-[10px] text-mute font-mono">Titans</span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 font-mono text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tighter">
                <span>{match.scoreA}</span>
                <span className="text-volt">:</span>
                <span>{match.scoreB}</span>
              </div>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-red-400">
                🔴 {match.matchClock} · {match.period}
              </span>
            </div>

            {/* Team B */}
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-line text-2xl shadow-inner mb-1.5">
                {match.teamB.logo}
              </span>
              <span className="font-bold text-white text-sm">
                {match.teamB.uniBadge}
              </span>
              <span className="text-[10px] text-mute font-mono">Eagles</span>
            </div>
          </div>

          {/* Goal Scorers list */}
          <div className="relative z-10 rounded-xl border border-line/60 bg-ink/80 p-2.5 text-[11px] text-mute font-mono">
            <span>⚽ Scorers: K. Sherif (24&apos;, 58&apos;) · Z. Farouk (39&apos; pen)</span>
          </div>

          {/* Graphic Footer watermark */}
          <div className="relative z-10 mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-[10px] font-mono text-mute">
            <span>{match.sponsor.badge}</span>
            <span className="text-volt">fnctn.sports.eg</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-volt px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-md shadow-volt/20 cursor-pointer"
          >
            <span>{copied ? "✓ Copied to Clipboard!" : "Copy Share Link"}</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateDownload}
            disabled={isDownloading}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-volt hover:text-volt transition cursor-pointer"
          >
            <span>{isDownloading ? "Generating..." : "Download Card File"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
