import type { PublicTeam } from "../../../types/fanhub"

interface TeamsTabProps {
  teams: PublicTeam[]
  onSelectTeam: (teamId: string) => void
}

export default function TeamsTab({ teams, onSelectTeam }: TeamsTabProps) {
  if (!teams || teams.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-card/80 p-8 text-center text-xs text-mute">
        Participating university teams list is currently being finalized by the organizing committee.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="border-b border-line/80 pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
            🎓 University Athletic Programs
          </div>
          <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
            Participating University Teams
          </h3>
          <p className="text-xs text-mute">
            Explore university delegation squads, season win/loss records, and active athlete teams.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((tm) => (
            <div
              key={tm.id}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink/70 p-4 transition hover:border-volt/60 hover:shadow-xl hover:shadow-volt/5"
            >
              <div>
                {/* Team Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-line text-2xl shadow-inner">
                      {tm.logo}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {tm.name}
                      </h4>
                      <span className="font-mono text-xs text-volt font-bold">
                        {tm.uni}
                      </span>
                    </div>
                  </div>

                  <span className="rounded-lg border border-line bg-card px-2 py-1 font-mono text-[10px] font-bold text-mute">
                    Seed #{tm.seed}
                  </span>
                </div>

                {/* Team Details */}
                <div className="mt-4 space-y-1.5 text-xs border-t border-line/60 pt-3">
                  <div className="flex items-center justify-between text-mute">
                    <span>Head Coach:</span>
                    <span className="font-medium text-white">{tm.coach}</span>
                  </div>
                  <div className="flex items-center justify-between text-mute">
                    <span>Captain:</span>
                    <span className="font-medium text-white">{tm.captain}</span>
                  </div>
                </div>

                {/* Win / Loss Record Bar */}
                <div className="mt-3.5 rounded-xl border border-line/70 bg-card/60 p-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-mute">Season Record:</span>
                    <span className="font-bold text-white">
                      {tm.record.won}W · {tm.record.drawn}D · {tm.record.lost}L
                    </span>
                  </div>
                </div>

                {/* Trophies preview */}
                {tm.trophies.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-300">
                    <span>🏆</span>
                    <span className="truncate">{tm.trophies[0].title}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => onSelectTeam(tm.id)}
                className="mt-4 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-card border border-line py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:border-volt hover:text-volt active:scale-95 cursor-pointer"
              >
                <span>View Team Profile</span>
                <span className="text-volt">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
