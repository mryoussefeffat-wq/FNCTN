export type EventStatusTab = "live" | "upcoming" | "past"

export interface TournamentTeam {
  name: string
  uni: string
  seed: number
}

export interface FanService {
  icon: string
  label: string
}

export interface TournamentSponsor {
  name: string
  tagline: string
  badge: string
}

export interface TournamentEvent {
  id: string
  title: string
  sport: "Football" | "Basketball" | "Padel" | "Track & Field"
  statusCategory: EventStatusTab
  date: string
  venue: string
  sponsor: TournamentSponsor
  fanServices: FanService[]
  teamsCount: string
  prize?: string
  scoreOrWinner?: string
  matchClock?: string
  teams: TournamentTeam[]
  rulesSummary: string
  image: string
}
