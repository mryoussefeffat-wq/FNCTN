export type VerificationStatus =
  | "verified"
  | "under_review"
  | "action_required"
  | "not_uploaded"

export interface AthleteDocument {
  type: "student_id" | "national_id"
  status: VerificationStatus
  fileName?: string
  fileUrl?: string
  uploadedAt?: string
  rejectionReason?: string
}

export interface AthleteStats {
  goals: number
  assists: number
  matchesPlayed: number
  mvpAwards: number
  topSpeedKmH: number
}

export interface AthleteProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  university: string
  faculty: string
  academicYear: string
  studentIdNumber: string
  nationalIdNumber: string
  sports: string[]
  primaryPosition: string
  jerseyNumber: number
  dominantFoot: "Right" | "Left" | "Both"
  heightCm: number
  weightKg: number
  bio: string
  photoUrl: string
  studentIdDoc: AthleteDocument
  nationalIdDoc: AthleteDocument
  overallVerificationStatus: VerificationStatus
  scoutViews: number
  stats: AthleteStats
}

export interface TeamMember {
  id: string
  name: string
  role: "Captain" | "Player" | "Substitute"
  jerseyNumber: number
  position: string
  university: string
  avatarUrl: string
  verificationStatus: VerificationStatus
}

export interface TeamTournamentApplication {
  tournamentId: string
  tournamentTitle: string
  appliedAt: string
  status: "applied" | "approved" | "rejected"
  seedGroup?: string
}

export interface ParticipantTeam {
  id: string
  name: string
  code: string // 6-character unique join code e.g. "CAI-782"
  sport: string
  university: string
  logoUrl: string
  color: string
  captainId: string
  captainName: string
  createdAt: string
  record: {
    wins: number
    losses: number
    draws: number
  }
  roster: TeamMember[]
  appliedTournaments: TeamTournamentApplication[]
}

export interface UpcomingMatch {
  id: string
  tournamentTitle: string
  round: string
  dateTime: string
  dateFormatted: string
  timeFormatted: string
  countdownText: string
  venue: string
  pitch: string
  rollCallTime: string
  opponentTeam: string
  opponentUniversity: string
  opponentLogo: string
  jerseyColor: string
  referee: string
}

export interface ParticipantAlert {
  id: string
  type: "id_verification" | "match_roll_call" | "tournament_update" | "scout_interest"
  title: string
  message: string
  severity: "urgent" | "info" | "success"
  actionText?: string
  actionTarget?: "profile" | "teams" | "match_pass"
  timestamp: string
}
