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
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-line bg-card p-4 sm:p-8 shadow-2xl no-scrollbar [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink p-2 text-mute transition hover:text-white cursor-pointer active:scale-95 z-10"
          aria-label="Close hub"
        >
          ✕
        </button>

        {/* Sponsor Header */}
        <div className="border-b border-line pb-3.5 pr-10 sm:pb-4 sm:pr-0">
          <span className="inline-block rounded-md border border-volt/40 bg-volt/15 px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase text-volt">
            {event.sponsor.tagline}
          </span>
          <h2 className="display mt-2 text-2xl sm:text-3xl text-white">
            {event.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-mute">
            <span>📍 {event.venue}</span>
            <span>·</span>
            <span>📅 {event.date}</span>
            <span>·</span>
            <span className="font-bold text-volt">{event.teamsCount}</span>
          </div>
        </div>

        {/* Fan Services Section */}
        <div className="my-4 sm:my-5 rounded-2xl border border-line bg-ink p-3.5 sm:p-4">
          <p className="mb-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-volt">
            Spectator Fan Services Active:
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {event.fanServices.map((fs, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg bg-card p-2 sm:p-2.5 text-xs text-white"
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
            Participating University Rosters:
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {event.teams.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/70 p-2.5 sm:p-3 text-xs"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card font-mono text-[10px] font-bold text-volt">
                  {t.uni}
                </span>
                <span className="truncate font-bold text-white">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Summary */}
        <div className="rounded-xl border border-line/70 bg-card p-3.5 sm:p-4 text-xs text-mute">
          <p className="mb-1 font-bold text-white">
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
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-volt py-3 text-xs font-extrabold uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-[0.99] cursor-pointer"
          >
            Join as University Athlete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-line bg-ink px-6 py-3 font-mono text-xs text-white transition hover:border-volt hover:text-volt cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  )
}
