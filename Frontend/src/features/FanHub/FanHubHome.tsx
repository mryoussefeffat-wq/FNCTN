import { useState, useMemo } from "react"
import type {
  FanHubTournament,
  FanHubStatusFilter,
  FanHubSportFilter,
  FanHubCityFilter,
  LiveMatchDetails,
} from "../../types/fanhub"
import LiveNowBanner from "./components/LiveNowBanner"

interface FanHubHomeProps {
  tournaments: FanHubTournament[]
  liveMatch?: LiveMatchDetails
  onSelectTournament: (id: string) => void
  onOpenLiveMatch: (matchId: string, tournamentId: string) => void
}

const SPORTS_LIST: FanHubSportFilter[] = [
  "All",
  "Football",
  "Basketball",
  "Padel",
  "Track & Field",
]

const CITIES_LIST: FanHubCityFilter[] = [
  "All",
  "Cairo",
  "New Cairo",
  "Giza",
  "Alexandria",
]

export default function FanHubHome({
  tournaments,
  liveMatch,
  onSelectTournament,
  onOpenLiveMatch,
}: FanHubHomeProps) {
  const [statusFilter, setStatusFilter] = useState<FanHubStatusFilter>("ongoing")
  const [sportFilter, setSportFilter] = useState<FanHubSportFilter>("All")
  const [cityFilter, setCityFilter] = useState<FanHubCityFilter>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter tournaments according to state
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t) => {
      // 1. Status Filter
      if (statusFilter !== "all" && t.statusCategory !== statusFilter) {
        return false
      }

      // 2. Sport Filter
      if (sportFilter !== "All" && t.sport !== sportFilter) {
        return false
      }

      // 3. City Filter
      if (cityFilter !== "All" && t.city !== cityFilter) {
        return false
      }

      // 4. Search Query (Title, Venue, Sponsor, Teams)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = t.title.toLowerCase().includes(q)
        const matchesVenue = t.primaryVenue.toLowerCase().includes(q)
        const matchesSponsor = t.sponsor.name.toLowerCase().includes(q)
        const matchesTeam = t.teams.some(
          (tm) =>
            tm.name.toLowerCase().includes(q) ||
            tm.uni.toLowerCase().includes(q) ||
            tm.uniBadge.toLowerCase().includes(q),
        )
        if (!matchesTitle && !matchesVenue && !matchesSponsor && !matchesTeam) {
          return false
        }
      }

      return true
    })
  }, [tournaments, statusFilter, sportFilter, cityFilter, searchQuery])

  const totalOngoing = tournaments.filter((t) => t.statusCategory === "ongoing").length
  const totalUpcoming = tournaments.filter((t) => t.statusCategory === "upcoming").length
  const totalPast = tournaments.filter((t) => t.statusCategory === "past").length

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:px-8 sm:py-10">
      {/* ---------------- LIVE NOW PULSING ALERT BANNER ---------------- */}
      {liveMatch && (
        <LiveNowBanner
          liveMatch={liveMatch}
          onOpenLiveMatch={onOpenLiveMatch}
        />
      )}

      {/* ---------------- HERO TITLE & QUICK STATS ---------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-volt">
            <span>🏟️ Spectator &amp; Fan Engagement</span>
          </div>
          <h1 className="display mt-3 text-3xl sm:text-4xl md:text-5xl text-white">
            THE FAN HUB
          </h1>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-mute">
            Follow live scores, inspect interactive tournament brackets, reserve spectator passes,
            and explore university team rosters across Egypt.
          </p>
        </div>

        {/* Quick telemetry indicators */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <div className="rounded-xl border border-line bg-card/80 px-3.5 py-2 text-center backdrop-blur-md">
            <span className="block font-mono text-lg font-black text-volt">
              {tournaments.length}
            </span>
            <span className="font-mono text-[10px] uppercase text-mute">Tournaments</span>
          </div>
          <div className="rounded-xl border border-line bg-card/80 px-3.5 py-2 text-center backdrop-blur-md">
            <span className="block font-mono text-lg font-black text-white">
              {totalOngoing}
            </span>
            <span className="font-mono text-[10px] uppercase text-mute">Ongoing</span>
          </div>
          <div className="rounded-xl border border-line bg-card/80 px-3.5 py-2 text-center backdrop-blur-md">
            <span className="block font-mono text-lg font-black text-white">
              16+
            </span>
            <span className="font-mono text-[10px] uppercase text-mute">Universities</span>
          </div>
        </div>
      </div>

      {/* ---------------- UNIVERSAL SEARCH & MULTI-FACET FILTERS ---------------- */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card/60 p-4 sm:p-5 backdrop-blur-md">
        {/* Row 1: Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tournament name, stadium, university, or sponsor..."
            className="w-full rounded-xl border border-line bg-ink/90 px-4 py-3 pl-11 text-base sm:text-sm text-white placeholder-mute/70 focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt transition"
          />
          <svg
            className="absolute left-3.5 top-3.5 h-5 w-5 text-mute"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-xs text-mute hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Row 2: Status Tabs (Ongoing, Upcoming, Past, All) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line/50 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute mr-1">
            Status:
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter("ongoing")}
            className={`min-h-[38px] rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold transition cursor-pointer ${
              statusFilter === "ongoing"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "border border-line bg-ink text-mute hover:text-white"
            }`}
          >
            Ongoing ({totalOngoing})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("upcoming")}
            className={`min-h-[38px] rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold transition cursor-pointer ${
              statusFilter === "upcoming"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "border border-line bg-ink text-mute hover:text-white"
            }`}
          >
            Upcoming ({totalUpcoming})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("past")}
            className={`min-h-[38px] rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold transition cursor-pointer ${
              statusFilter === "past"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "border border-line bg-ink text-mute hover:text-white"
            }`}
          >
            Past Champions ({totalPast})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`min-h-[38px] rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold transition cursor-pointer ${
              statusFilter === "all"
                ? "bg-volt text-ink shadow-md shadow-volt/20"
                : "border border-line bg-ink text-mute hover:text-white"
            }`}
          >
            All Tournaments
          </button>
        </div>

        {/* Row 3: Sport & City Facets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Sport Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute mr-1">
              Sport:
            </span>
            {SPORTS_LIST.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSportFilter(sp)}
                className={`min-h-[34px] rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                  sportFilter === sp
                    ? "border border-volt bg-volt/15 text-volt"
                    : "border border-line/70 bg-ink/70 text-mute hover:text-white"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute mr-1">
              City:
            </span>
            {CITIES_LIST.map((ct) => (
              <button
                key={ct}
                type="button"
                onClick={() => setCityFilter(ct)}
                className={`min-h-[34px] rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                  cityFilter === ct
                    ? "border border-volt bg-volt/15 text-volt"
                    : "border border-line/70 bg-ink/70 text-mute hover:text-white"
                }`}
              >
                {ct}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- TOURNAMENT CARD GRID ---------------- */}
      {filteredTournaments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-card/60 p-12 text-center">
          <span className="text-4xl">🔍</span>
          <h3 className="display mt-3 text-xl text-white">No Tournaments Found</h3>
          <p className="mt-1 max-w-sm text-xs text-mute">
            No events match your current filter selection. Try resetting filters or searching for another keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("all")
              setSportFilter("All")
              setCityFilter("All")
              setSearchQuery("")
            }}
            className="mt-4 rounded-xl bg-volt px-4 py-2 font-mono text-xs font-bold uppercase text-ink hover:brightness-110 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tourney) => {
            const lowestPrice = Math.min(...tourney.tickets.map((t) => t.price))
            return (
              <article
                key={tourney.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-card transition duration-300 hover:border-volt/60 hover:shadow-2xl hover:shadow-volt/5"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-ink">
                  <img
                    src={tourney.coverImage}
                    alt={tourney.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                  {/* Status & Sponsor Overlay */}
                  <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-1.5">
                    {tourney.isLiveNow ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-600/30 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-red-300 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-red-400" />
                        LIVE NOW
                      </span>
                    ) : tourney.statusCategory === "ongoing" ? (
                      <span className="rounded-full border border-volt/40 bg-volt/20 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-volt backdrop-blur-md">
                        ONGOING
                      </span>
                    ) : tourney.statusCategory === "upcoming" ? (
                      <span className="rounded-full border border-blue-400/40 bg-blue-500/20 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-blue-300 backdrop-blur-md">
                        UPCOMING
                      </span>
                    ) : (
                      <span className="rounded-full border border-line bg-ink/70 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase text-mute backdrop-blur-md">
                        CONCLUDED
                      </span>
                    )}

                    <span className="rounded-full border border-line/80 bg-ink/80 px-2 py-0.5 font-mono text-[9px] text-white backdrop-blur-md">
                      {tourney.city}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-mute">
                      <span className="text-volt font-bold">{tourney.sport}</span>
                      <span>·</span>
                      <span>📅 {tourney.dateRange}</span>
                    </div>

                    <h3 className="display mt-2 text-lg sm:text-xl text-white group-hover:text-volt transition">
                      {tourney.title}
                    </h3>

                    <p className="mt-1 text-xs text-mute flex items-center gap-1.5">
                      <span>📍</span>
                      <span className="truncate">{tourney.primaryVenue}</span>
                    </p>

                    {/* Dedicated Sponsor Showcase Section */}
                    <div className="mt-3 border-t border-line/60 pt-2.5">
                      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                        Presented By:
                      </p>
                      <div className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/70 p-2">
                        <span className="flex h-6 px-2 items-center justify-center rounded-lg bg-card border border-volt/30 font-mono text-[9px] font-black text-volt shrink-0 shadow-sm">
                          {tourney.sponsor.badge}
                        </span>
                        <div className="min-w-0 flex-1 truncate">
                          <span className="block font-bold text-white text-[11px] truncate">
                            {tourney.sponsor.name}
                          </span>
                          <span className="block font-mono text-[9px] text-mute truncate">
                            {tourney.sponsor.tagline}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Spectator Services Icons */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {tourney.fanServices.slice(0, 3).map((fs, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md border border-line/60 bg-ink/80 px-2 py-1 text-[10px] text-white"
                          title={fs.description}
                        >
                          <span>{fs.icon}</span>
                          <span className="truncate max-w-[90px]">{fs.label}</span>
                        </span>
                      ))}
                      {tourney.fanServices.length > 3 && (
                        <span className="text-[10px] text-mute font-mono">
                          +{tourney.fanServices.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Teams / Tickets & CTA */}
                  <div className="mt-5 border-t border-line/80 pt-3.5">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono text-mute">{tourney.teamsCountLabel}</span>
                      <span className="font-mono font-bold text-volt">
                        {tourney.statusCategory === "past"
                          ? "Champion Trophy"
                          : lowestPrice === 0
                            ? "Free Spectator Pass"
                            : `Tickets from EGP ${lowestPrice}`}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectTournament(tourney.id)}
                        className="flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-volt px-4 py-2 text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 cursor-pointer shadow-md shadow-volt/20"
                      >
                        <span>View Tournament Hub</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>

                      {tourney.isLiveNow && liveMatch && (
                        <button
                          type="button"
                          onClick={() => onOpenLiveMatch(liveMatch.id, tourney.id)}
                          className="flex min-h-[42px] items-center justify-center gap-1 rounded-xl border border-red-500/50 bg-red-600/20 px-3 py-2 font-mono text-[11px] font-bold uppercase text-red-300 transition hover:bg-red-600/30 cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                          <span>Watch Live</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
