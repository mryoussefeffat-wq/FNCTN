import type { PublicPlayer } from "../../types/fanhub"

interface PublicPlayerProfileProps {
  player: PublicPlayer
  onBack: () => void
  onSelectTeam: (teamId: string) => void
}

export default function PublicPlayerProfile({
  player,
  onBack,
  onSelectTeam,
}: PublicPlayerProfileProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10">
      {/* ---------------- BREADCRUMBS & BACK BUTTON ---------------- */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[40px] items-center gap-2 rounded-xl border border-line bg-card/80 px-4 py-2 font-mono text-xs text-mute hover:border-volt hover:text-white transition cursor-pointer active:scale-95"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <span className="font-mono text-[11px] text-mute uppercase">
          Public Player Profile · {player.id}
        </span>
      </div>

      {/* ---------------- ATHLETE PROFILE HERO CARD ---------------- */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-3xl border-2 border-volt/60 bg-ink shadow-2xl">
            <img
              src={player.avatar}
              alt={player.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-ink font-mono text-xs font-black text-volt border border-volt/40">
              #{player.jerseyNumber}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-volt/40 bg-volt/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
                {player.sport}
              </span>
              <span className="rounded-md border border-line bg-ink px-2.5 py-0.5 font-mono text-[10px] text-mute uppercase">
                {player.position}
              </span>
            </div>

            <h1 className="display mt-2 text-2xl sm:text-3xl lg:text-4xl text-white">
              {player.name}
            </h1>

            <p className="font-mono text-xs sm:text-sm text-volt font-bold mt-1">
              {player.uni}
            </p>

            <button
              type="button"
              onClick={() => onSelectTeam(player.teamId)}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-white/80 hover:text-volt transition cursor-pointer"
            >
              <span>Current Squad: <strong>{player.teamName}</strong></span>
              <span className="text-volt">→</span>
            </button>
          </div>
        </div>

        {player.bio && (
          <p className="mt-5 border-t border-line/60 pt-4 text-xs sm:text-sm text-mute leading-relaxed">
            {player.bio}
          </p>
        )}
      </section>

      {/* ---------------- PUBLIC KEY STATS (NO PRIVATE DOCS) ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="border-b border-line/80 pb-4">
          <span className="font-mono text-[10px] uppercase text-volt font-bold">
            Season Performance Radar
          </span>
          <h3 className="display mt-1 text-xl sm:text-2xl text-white">
            Official Competition Statistics
          </h3>
          <p className="text-xs text-mute">
            Verified stats compiled across all EUSF and FNCTN university fixtures.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="rounded-2xl border border-line/70 bg-ink/70 p-4 text-center">
            <span className="block font-mono text-[10px] uppercase text-mute">Matches</span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 block">
              {player.stats.matches}
            </span>
          </div>

          <div className="rounded-2xl border border-volt/40 bg-volt/10 p-4 text-center">
            <span className="block font-mono text-[10px] uppercase text-volt font-bold">
              Goals / Points
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-volt mt-1 block">
              {player.stats.goalsOrPoints}
            </span>
          </div>

          <div className="rounded-2xl border border-line/70 bg-ink/70 p-4 text-center">
            <span className="block font-mono text-[10px] uppercase text-mute">Assists</span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 block">
              {player.stats.assists ?? 0}
            </span>
          </div>

          <div className="rounded-2xl border border-line/70 bg-ink/70 p-4 text-center">
            <span className="block font-mono text-[10px] uppercase text-mute">MVP Awards</span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400 mt-1 block">
              ⭐ {player.stats.mvpAwards}
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- PRIVACY NOTICE (CRITICAL SPEC REQUIREMENT) ---------------- */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-4 sm:p-5 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold uppercase text-[11px] mb-1">
          <span>🔒 Strict Privacy Safeguard Active</span>
        </div>
        <p className="text-mute leading-relaxed text-[11px] sm:text-xs">
          In strict accordance with FNCTN platform security rules, this athlete&apos;s National ID
          card, university student card photo, and personal telephone contacts remain 100% private
          and are accessible only to verified tournament organizers and scouting officials.
        </p>
      </div>
    </div>
  )
}
