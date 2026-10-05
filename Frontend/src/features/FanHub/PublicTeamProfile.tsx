import type { PublicTeam } from "../../types/fanhub"

interface PublicTeamProfileProps {
  team: PublicTeam
  onBack: () => void
  onSelectPlayer: (playerId: string) => void
}

export default function PublicTeamProfile({
  team,
  onBack,
  onSelectPlayer,
}: PublicTeamProfileProps) {
  const winRate =
    team.record.played > 0
      ? Math.round((team.record.won / team.record.played) * 100)
      : 0

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10">
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
          <span>Back to Hub</span>
        </button>

        <span className="font-mono text-[11px] text-mute uppercase">
          Team Profile · {team.uniBadge}
        </span>
      </div>

      {/* ---------------- TEAM HEADER BANNER ---------------- */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-3xl bg-ink border border-line text-4xl sm:text-5xl shadow-inner">
              {team.logo}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-volt/40 bg-volt/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
                  Seed #{team.seed}
                </span>
                <span className="font-mono text-xs text-mute">
                  {team.sport} Program
                </span>
              </div>

              <h1 className="display mt-1 text-2xl sm:text-3xl lg:text-4xl text-white">
                {team.name}
              </h1>

              <p className="font-mono text-xs text-volt font-bold mt-0.5">
                {team.uni}
              </p>
            </div>
          </div>

          {/* Record Quick Summary */}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-ink/70 p-3 self-start sm:self-center">
            <div className="text-center px-3 border-r border-line/60">
              <span className="block font-mono text-xs text-mute uppercase">Played</span>
              <span className="font-mono text-xl font-black text-white">
                {team.record.played}
              </span>
            </div>
            <div className="text-center px-3 border-r border-line/60">
              <span className="block font-mono text-xs text-mute uppercase">Won</span>
              <span className="font-mono text-xl font-black text-volt">
                {team.record.won}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="block font-mono text-xs text-mute uppercase">Win Rate</span>
              <span className="font-mono text-xl font-black text-emerald-400">
                {winRate}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SQUAD ROSTER LIST ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="border-b border-line/80 pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
            👥 Active Roster
          </div>
          <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
            Registered Student Athletes
          </h3>
          <p className="text-xs text-mute">
            Click on any athlete to inspect their public season performance record.
          </p>
        </div>

        {team.roster.length === 0 ? (
          <div className="p-8 text-center text-xs text-mute">
            Full player line sheet will be posted 24 hours prior to next fixture.
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {team.roster.map((player) => (
              <div
                key={player.id}
                onClick={() => onSelectPlayer(player.id)}
                className="group flex items-center justify-between rounded-2xl border border-line bg-ink/70 p-3.5 transition hover:border-volt cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-card">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-xs sm:text-sm group-hover:text-volt transition">
                      {player.name}
                    </span>
                    <span className="font-mono text-[10px] text-mute">
                      #{player.jerseyNumber} · {player.position}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-mute group-hover:text-volt transition">
                  Stats →
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- TROPHY CABINET ---------------- */}
      {team.trophies.length > 0 && (
        <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
          <div className="border-b border-line/80 pb-4">
            <span className="font-mono text-[10px] uppercase text-volt font-bold">
              Accolades
            </span>
            <h3 className="display mt-1 text-xl sm:text-2xl text-white">
              Trophy Cabinet &amp; Titles
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {team.trophies.map((trophy, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-line/70 bg-ink/70 p-3.5"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <span className="font-bold text-white text-xs sm:text-sm block">
                    {trophy.title}
                  </span>
                  <span className="font-mono text-[10px] text-volt">
                    {trophy.year} Champion
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
