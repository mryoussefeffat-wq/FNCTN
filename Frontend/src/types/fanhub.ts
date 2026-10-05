/**
 * Fan Hub TypeScript Domain Interfaces
 * Section 2: Fan Hub (Public App & Engagement)
 */

export type FanHubStatusFilter = "all" | "ongoing" | "upcoming" | "past"
export type FanHubSportFilter = "All" | "Football" | "Basketball" | "Padel" | "Track & Field"
export type FanHubCityFilter = "All" | "Cairo" | "New Cairo" | "Giza" | "Alexandria"

export interface TicketOption {
  id: string
  tier: string
  price: number // EGP
  status: "available" | "limited" | "sold_out"
  description: string
  perks: string[]
}

export interface VenueDetails {
  name: string
  address: string
  city: string
  capacity: string
  parkingInfo: string
  gateInfo: string
  mapEmbedUrl?: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface OrganizerContact {
  committee: string
  director: string
  email: string
  phone: string
  whatsapp: string
}

export interface FanServiceItem {
  icon: string
  label: string
  description?: string
}

export interface BracketTeamNode {
  id: string
  name: string
  uni: string
  seed: number
  score?: number
  isWinner?: boolean
}

export interface BracketMatchNode {
  id: string
  round: "Quarter-Finals" | "Semi-Finals" | "Final"
  matchNumber: number
  teamA: BracketTeamNode
  teamB: BracketTeamNode
  status: "scheduled" | "live" | "completed"
  time: string
  pitch: string
  winnerId?: string
}

export interface ChronologicalMatch {
  id: string
  tournamentId: string
  stage: string
  date: string
  time: string
  pitch: string
  teamA: {
    id: string
    name: string
    uni: string
    score?: number
  }
  teamB: {
    id: string
    name: string
    uni: string
    score?: number
  }
  status: "scheduled" | "live" | "completed"
  matchClock?: string
  highlight?: string
}

export interface NewsArticle {
  id: string
  title: string
  date: string
  category: "Announcement" | "Match Recap" | "Schedule Update" | "Fan Guide"
  snippet: string
  content: string
  image: string
  author: string
}

export interface MediaPhoto {
  id: string
  title: string
  caption: string
  url: string
  category: "Action" | "Crowd" | "Ceremony"
}

export interface PublicPlayer {
  id: string
  name: string
  uni: string
  teamId: string
  teamName: string
  sport: string
  position: string
  jerseyNumber: number
  avatar: string
  stats: {
    matches: number
    goalsOrPoints: number
    assists?: number
    cleanSheetsOrRebounds?: number
    mvpAwards: number
  }
  bio: string
}

export interface PublicTeam {
  id: string
  name: string
  uni: string
  uniBadge: string
  sport: string
  logo: string
  coach: string
  captain: string
  seed: number
  record: {
    played: number
    won: number
    drawn: number
    lost: number
  }
  trophies: {
    year: string
    title: string
  }[]
  roster: PublicPlayer[]
}

export interface MatchTimelineEvent {
  minute: number
  type: "goal" | "point" | "yellow_card" | "red_card" | "sub"
  team: "A" | "B"
  player: string
  detail?: string
}

export interface LiveMatchDetails {
  id: string
  tournamentId: string
  tournamentTitle: string
  sport: string
  stage: string
  teamA: PublicTeam
  teamB: PublicTeam
  scoreA: number
  scoreB: number
  matchClock: string
  period: string
  status: "live" | "halftime" | "fulltime"
  events: MatchTimelineEvent[]
  stats: {
    possession: [number, number]
    shotsOnTarget: [number, number]
    fouls: [number, number]
    corners: [number, number]
  }
  sponsor: {
    name: string
    tagline: string
    offerText: string
    badge: string
  }
}

export interface FanHubTournament {
  id: string
  title: string
  sport: "Football" | "Basketball" | "Padel" | "Track & Field"
  city: "Cairo" | "New Cairo" | "Giza" | "Alexandria"
  statusCategory: "ongoing" | "upcoming" | "past"
  isLiveNow?: boolean
  dateRange: string
  primaryVenue: string
  prizePool: string
  teamsCountLabel: string
  coverImage: string
  sponsor: {
    name: string
    tagline: string
    badge: string
    logoText: string
  }
  tickets: TicketOption[]
  venue: VenueDetails
  fanServices: FanServiceItem[]
  organizer: OrganizerContact
  rulesSummary: string
  bracket: BracketMatchNode[]
  schedule: ChronologicalMatch[]
  teams: PublicTeam[]
  news: NewsArticle[]
  mediaPhotos: MediaPhoto[]
}
