/**
 * Domain Interfaces for FNCTN University Admin Pages
 * Section: University Admin Pages in fnctn_frontend_architecture.md
 */

export type UniversityClearanceStatus = "pending" | "approved" | "rejected"

export type UniversityAdminTab = "dashboard" | "students" | "teams"

export interface UniversityProfile {
  id: string
  name: string
  arabicName: string
  shortCode: string
  logoUrl: string
  campusLocation: string
  accreditationCode: string
  athleticDirectorName: string
  contactEmail: string
  verifiedAthletesCount: number
  activeTeamsCount: number
}

export interface UniversityStudentReview {
  id: string
  universityId: string
  studentName: string
  studentAcademicId: string
  nationalIdNumber: string
  faculty: string
  academicYear: string
  primarySport: string
  avatarUrl: string
  studentIdCardUrl: string
  nationalIdFrontUrl: string
  nationalIdBackUrl: string
  submittedAt: string
  status: UniversityClearanceStatus
  rejectionReason?: string
  verifiedAt?: string
}

export interface TeamRosterMember {
  studentId: string
  name: string
  jerseyNumber: number
  position: string
  faculty: string
  isEnrolledVerified: boolean
}

export interface UniversityTeamClearance {
  id: string
  universityId: string
  teamName: string
  teamLogoUrl: string
  sport: string
  targetTournamentId: string
  targetTournamentTitle: string
  captainName: string
  captainEmail: string
  roster: TeamRosterMember[]
  submittedAt: string
  status: UniversityClearanceStatus
  officialPermitCode?: string
  rejectionReason?: string
  approvedAt?: string
}
