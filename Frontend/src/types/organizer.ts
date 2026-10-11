/**
 * Domain Interfaces for FNCTN Organizer Pages (Tournament Committee)
 * Section 3: Organizer Pages in fnctn_frontend_architecture.md
 */

export type TournamentStatus = "live" | "upcoming" | "completed"

export interface OrganizerSponsor {
  id: string
  name: string
  tier: "Title" | "Presenting" | "Official Partner" | "Supporter"
  logoUrl: string
  tagline?: string
}

export interface OrganizerFanService {
  id: string
  icon: string
  label: string
  enabled: boolean
}

export interface TournamentRules {
  matchDurationMinutes: number
  extraTimeEnabled: boolean
  penaltyShootoutEnabled: boolean
  maxSubstitutes: number
  summary: string
}

export interface CommitteeTournament {
  id: string
  title: string
  sport: "Football" | "Basketball" | "Padel" | "Track & Field"
  universityLeague: string
  status: TournamentStatus
  startDate: string
  endDate: string
  venue: string
  pitchName: string
  maxTeams: number
  enrolledTeamsCount: number
  entryFeeEgp: number
  paymentInstructions: string
  rules: TournamentRules
  fanServices: OrganizerFanService[]
  sponsors: OrganizerSponsor[]
  collectedFeesEgp: number
  totalExpectedFeesEgp: number
  pendingVerificationsCount: number
}

// Verification Desk Types
export type IdVerificationStatus = "pending" | "verified" | "rejected"

export interface PlayerReviewItem {
  id: string
  tournamentId: string
  tournamentTitle: string
  teamId: string
  teamName: string
  university: string
  playerName: string
  jerseyNumber: number
  position: string
  avatarUrl: string
  studentIdCardUrl: string
  nationalIdCardFrontUrl: string
  nationalIdCardBackUrl: string
  studentAcademicId: string
  nationalIdNumber: string
  submittedAt: string
  status: IdVerificationStatus
  rejectionReason?: string
}

export type PaymentReviewStatus = "paid" | "pending" | "rejected"

export interface TeamPaymentItem {
  id: string
  tournamentId: string
  tournamentTitle: string
  teamId: string
  teamName: string
  university: string
  amountEgp: number
  method: "InstaPay" | "Bank Transfer" | "Cash Desk"
  referenceCode: string
  receiptImageUrl: string
  submittedAt: string
  status: PaymentReviewStatus
  rejectionReason?: string
  rosterCount: number
  rosterVerifiedCount: number
}

// Match Day Controller Types
export type RollCallStatus = "present" | "no_show" | "unmarked"

export interface RollCallPlayer {
  id: string
  name: string
  jerseyNumber: number
  position: string
  photoUrl: string
  isCaptain: boolean
  verificationStatus: "verified" | "pending" | "rejected"
  rollCallStatus: RollCallStatus
  checkInTime?: string
}

export type MatchPeriod =
  | "Pre-Match Roll Call"
  | "1st Half"
  | "Halftime"
  | "2nd Half"
  | "Extra Time"
  | "Penalties"
  | "Full-Time (Ended)"

export interface MatchEvent {
  id: string
  minute: number
  type: "goal" | "yellow_card" | "red_card" | "substitution"
  team: "teamA" | "teamB"
  playerName: string
  details?: string
}

export interface LiveMatchControllerState {
  id: string
  tournamentId: string
  tournamentTitle: string
  stage: string
  pitch: string
  scheduledTime: string
  teamA: {
    id: string
    name: string
    university: string
    logoUrl: string
    score: number
    roster: RollCallPlayer[]
  }
  teamB: {
    id: string
    name: string
    university: string
    logoUrl: string
    score: number
    roster: RollCallPlayer[]
  }
  clockSeconds: number
  clockRunning: boolean
  period: MatchPeriod
  events: MatchEvent[]
  isEnded: boolean
  winnerTeamId?: string
}
