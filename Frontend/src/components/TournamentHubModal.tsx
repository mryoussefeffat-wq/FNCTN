import type { TournamentEvent } from "../types/tournament"

interface TournamentHubModalProps {
  isOpen: boolean
  event: TournamentEvent | null
  onClose: () => void
  onSignUpAthlete: () => void
}

export default function TournamentHubModal({
  isOpen,
  event,
  onClose,
  onSignUpAthlete,
}: TournamentHubModalProps) {
  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-8 shadow-2xl no-scrollbar [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] p-2 text-[#8E8E93] transition hover:text-white cursor-pointer active:scale-95 z-10"
          aria-label="Close hub"
        >
          ✕
        </button>

        {/* Sponsor Header */}
        <div className="border-b border-[#1F1F24] pb-3.5 pr-10 sm:pb-4 sm:pr-0">
          <span className="inline-block rounded-md border border-[#A60E13]/40 bg-[#A60E13]/15 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase text-white">
            {event.sponsor.tagline}
          </span>
          <h2 className="font-sans font-semibold mt-2 text-2xl sm:text-3xl text-white">
            {event.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-[#8E8E93]">
            <span>📍 {event.venue}</span>
            <span>·</span>
            <span>📅 {event.date}</span>
            <span>·</span>
            <span className="font-bold text-[#A60E13]">{event.teamsCount}</span>
          </div>
        </div>

        {/* Fan Services Section */}
        <div className="my-4 sm:my-5 rounded-2xl border border-[#1F1F24] bg-[#000000] p-3.5 sm:p-4">
          <p className="mb-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A60E13] font-bold">
            Spectator Fan Services Active:
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {event.fanServices.map((fs, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg bg-[#0A0A0A] border border-[#1F1F24] p-2 sm:p-2.5 text-xs text-white"
              >
                <span className="text-sm sm:text-base">{fs.icon}</span>
                <span className="text-[10px] sm:text-[11px] font-medium truncate">
                  {fs.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Participating Teams List */}
        <div className="mb-4 sm:mb-5">
          <h4 className="mb-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
            Participating University Teams:
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {event.teams.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 sm:p-3 text-xs"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#A60E13]/30 font-mono text-[10px] font-bold text-[#A60E13]">
                  {t.uni}
                </span>
                <span className="truncate font-semibold text-white">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Summary */}
        <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-3.5 sm:p-4 text-xs text-white/80 font-normal">
          <p className="mb-1 font-semibold text-white">
            Official Tournament Regulations:
          </p>
          <p className="leading-relaxed">{event.rulesSummary}</p>
        </div>

        {/* CTA */}
        <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              onSignUpAthlete()
            }}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-[0.99] cursor-pointer shadow-md shadow-[#A60E13]/30"
          >
            Join as University Athlete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-[#1F1F24] bg-[#000000] px-6 py-3 font-mono text-xs text-white transition hover:border-[#A60E13] hover:text-[#A60E13] cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}
