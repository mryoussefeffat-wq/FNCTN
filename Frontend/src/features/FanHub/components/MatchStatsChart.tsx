interface MatchStatsChartProps {
  teamAName: string
  teamBName: string
  stats: {
    possession: [number, number]
    shotsOnTarget: [number, number]
    fouls: [number, number]
    corners: [number, number]
  }
}

export default function MatchStatsChart({
  teamAName,
  teamBName,
  stats,
}: MatchStatsChartProps) {
  const statRows = [
    {
      label: "Ball Possession",
      valA: stats.possession[0],
      valB: stats.possession[1],
      isPercentage: true,
    },
    {
      label: "Shots on Target",
      valA: stats.shotsOnTarget[0],
      valB: stats.shotsOnTarget[1],
      isPercentage: false,
    },
    {
      label: "Corner Kicks",
      valA: stats.corners[0],
      valB: stats.corners[1],
      isPercentage: false,
    },
    {
      label: "Fouls Committed",
      valA: stats.fouls[0],
      valB: stats.fouls[1],
      isPercentage: false,
    },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink/70 p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-xs">
        <span className="font-bold text-white truncate max-w-[120px]">{teamAName}</span>
        <span className="text-volt uppercase font-bold tracking-wider">Live Match Telemetry</span>
        <span className="font-bold text-white truncate max-w-[120px] text-right">{teamBName}</span>
      </div>

      <div className="space-y-4">
        {statRows.map((row, idx) => {
          const total = row.valA + row.valB || 1
          const pctA = Math.round((row.valA / total) * 100)
          const pctB = 100 - pctA

          return (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">
                  {row.valA}
                  {row.isPercentage && "%"}
                </span>
                <span className="text-[11px] text-mute">{row.label}</span>
                <span className="font-bold text-white">
                  {row.valB}
                  {row.isPercentage && "%"}
                </span>
              </div>

              {/* Dual Visual Bar */}
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-card">
                <div
                  style={{ width: `${pctA}%` }}
                  className="h-full bg-volt transition-all duration-500 rounded-l-full"
                />
                <div
                  style={{ width: `${pctB}%` }}
                  className="h-full bg-blue-500 transition-all duration-500 rounded-r-full"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
