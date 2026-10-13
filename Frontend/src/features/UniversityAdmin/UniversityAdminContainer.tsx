import { useState } from "react"
import Logo from "../../components/Logo"
import type {
  UniversityAdminTab,
  UniversityProfile,
  UniversityStudentReview,
  UniversityTeamClearance,
} from "../../types/universityAdmin"
import {
  MOCK_UNIVERSITIES,
  MOCK_STUDENT_REVIEWS,
  MOCK_TEAM_CLEARANCES,
} from "./mockData"
import UniversitySelectorPill from "./components/UniversitySelectorPill"
import UniversityDashboardView from "./UniversityDashboardView"
import StudentIdVerificationView from "./StudentIdVerificationView"
import TeamApprovalsView from "./TeamApprovalsView"
import StudentIdInspectModal from "./components/StudentIdInspectModal"
import StudentRejectModal from "./components/StudentRejectModal"
import TeamClearanceModal from "./components/TeamClearanceModal"

interface UniversityAdminContainerProps {
  onBackToLanding: () => void
  onOpenFanHub?: () => void
  onOpenParticipantPortal: () => void
  onOpenOrganizer: () => void
}

export default function UniversityAdminContainer({
  onBackToLanding,
  onOpenFanHub,
  onOpenParticipantPortal,
  onOpenOrganizer,
}: UniversityAdminContainerProps) {
  const [activeTab, setActiveTab] = useState<UniversityAdminTab>("dashboard")
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("univ-cu")

  // State data
  const [universities] = useState<UniversityProfile[]>(MOCK_UNIVERSITIES)
  const [studentReviews, setStudentReviews] = useState<UniversityStudentReview[]>(MOCK_STUDENT_REVIEWS)
  const [teamClearances, setTeamClearances] = useState<UniversityTeamClearance[]>(MOCK_TEAM_CLEARANCES)

  // Active Modals
  const [inspectingStudent, setInspectingStudent] = useState<UniversityStudentReview | null>(null)
  const [rejectingStudent, setRejectingStudent] = useState<UniversityStudentReview | null>(null)
  const [inspectingTeam, setInspectingTeam] = useState<UniversityTeamClearance | null>(null)

  // Selected University Context
  const currentUniversity =
    universities.find((u) => u.id === selectedUniversityId) || universities[0]

  const universityStudents = studentReviews.filter((s) => s.universityId === selectedUniversityId)
  const universityTeams = teamClearances.filter((t) => t.universityId === selectedUniversityId)

  const pendingStudentCount = universityStudents.filter((s) => s.status === "pending").length
  const pendingTeamCount = universityTeams.filter((t) => t.status === "pending").length

  // Handlers
  function handleApproveStudent(studentId: string) {
    setStudentReviews((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, status: "approved", verifiedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
          : s
      )
    )

    // Update roster status for this student in all teams if applicable
    const approvedStudent = studentReviews.find((s) => s.id === studentId)
    if (approvedStudent) {
      setTeamClearances((prev) =>
        prev.map((team) => ({
          ...team,
          roster: team.roster.map((player) =>
            player.name.toLowerCase() === approvedStudent.studentName.toLowerCase() ||
            player.studentId === approvedStudent.id
              ? { ...player, isEnrolledVerified: true }
              : player
          ),
        }))
      )
    }
  }

  function handleConfirmRejectStudent(studentId: string, reason: string) {
    setStudentReviews((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, status: "rejected", rejectionReason: reason } : s
      )
    )
  }

  function handleApproveTeam(clearanceId: string, permitCode: string) {
    setTeamClearances((prev) =>
      prev.map((t) =>
        t.id === clearanceId
          ? {
              ...t,
              status: "approved",
              officialPermitCode: permitCode,
              approvedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            }
          : t
      )
    )
  }

  function handleRejectTeam(clearanceId: string, reason: string) {
    setTeamClearances((prev) =>
      prev.map((t) =>
        t.id === clearanceId ? { ...t, status: "rejected", rejectionReason: reason } : t
      )
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] font-sans text-white selection:bg-[#A60E13] selection:text-white pb-24 sm:pb-16">
      {/* ---------------- 1. STICKY UNIVERSITY ADMIN HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F24] bg-[#000000]/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          {/* Logo & Institution Selector */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-2 cursor-pointer text-left"
              aria-label="University Directorate Home"
            >
              <Logo size="text-xl sm:text-2xl" subtitle="University Directorate" />
            </button>

            <UniversitySelectorPill
              universities={universities}
              selectedUniversityId={selectedUniversityId}
              onSelectUniversity={(id) => setSelectedUniversityId(id)}
            />
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "dashboard" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("students")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`flex items-center gap-1.5 hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "students" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              <span>Student IDs</span>
              {pendingStudentCount > 0 && (
                <span className="rounded-full bg-[#A60E13] px-1.5 py-0.2 text-[9px] font-black text-white">
                  {pendingStudentCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("teams")
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={`flex items-center gap-1.5 hover:text-[#A60E13] transition cursor-pointer ${
                activeTab === "teams" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
              }`}
            >
              <span>Team Approvals</span>
              {pendingTeamCount > 0 && (
                <span className="rounded-full bg-amber-500 text-black px-1.5 py-0.2 text-[9px] font-black">
                  {pendingTeamCount}
                </span>
              )}
            </button>
          </nav>

          {/* Cross-App Navigation CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={onOpenOrganizer}
              className="hidden lg:flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
            >
              <span>Organizer</span>
            </button>

            <button
              type="button"
              onClick={onOpenParticipantPortal}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">Athlete Portal</span>
              <span className="sm:hidden">Athlete</span>
            </button>

            {onOpenFanHub && (
              <button
                type="button"
                onClick={onOpenFanHub}
                className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-3 py-1.5 font-mono text-xs text-white hover:bg-[#A60E13] transition cursor-pointer active:scale-95"
              >
                <span className="hidden sm:inline">Fan Hub</span>
                <span className="sm:hidden">Fans</span>
              </button>
            )}

            <button
              type="button"
              onClick={onBackToLanding}
              className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#8E8E93] hover:border-white transition cursor-pointer active:scale-95"
              title="Exit to Platform"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- 2. MAIN VIEW CONTENT ---------------- */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
        {activeTab === "dashboard" && (
          <UniversityDashboardView
            university={currentUniversity}
            studentReviews={universityStudents}
            teamClearances={universityTeams}
            onOpenStudentQueue={() => {
              setActiveTab("students")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onOpenTeamQueue={() => {
              setActiveTab("teams")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            onInspectStudent={(student) => setInspectingStudent(student)}
            onInspectTeam={(team) => setInspectingTeam(team)}
          />
        )}

        {activeTab === "students" && (
          <StudentIdVerificationView
            studentReviews={universityStudents}
            onInspectStudent={(student) => setInspectingStudent(student)}
            onApproveStudent={handleApproveStudent}
            onRejectStudentClick={(student) => setRejectingStudent(student)}
            onBackToDashboard={() => {
              setActiveTab("dashboard")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        )}

        {activeTab === "teams" && (
          <TeamApprovalsView
            teamClearances={universityTeams}
            onInspectTeam={(team) => setInspectingTeam(team)}
            onApproveTeam={handleApproveTeam}
            onDenyTeamClick={(team) => setInspectingTeam(team)}
            onBackToDashboard={() => {
              setActiveTab("dashboard")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        )}
      </main>

      {/* ---------------- 3. MODALS ---------------- */}
      {/* Student ID Inspection Modal */}
      <StudentIdInspectModal
        student={inspectingStudent}
        isOpen={Boolean(inspectingStudent)}
        onClose={() => setInspectingStudent(null)}
        onApprove={handleApproveStudent}
        onOpenRejectModal={(student) => {
          setInspectingStudent(null)
          setRejectingStudent(student)
        }}
      />

      {/* Student Rejection Modal */}
      <StudentRejectModal
        student={rejectingStudent}
        isOpen={Boolean(rejectingStudent)}
        onClose={() => setRejectingStudent(null)}
        onConfirmReject={handleConfirmRejectStudent}
      />

      {/* Team Clearance Audit & Permit Modal */}
      <TeamClearanceModal
        clearance={inspectingTeam}
        isOpen={Boolean(inspectingTeam)}
        onClose={() => setInspectingTeam(null)}
        onApproveTeam={handleApproveTeam}
        onRejectTeam={handleRejectTeam}
      />

      {/* ---------------- 4. MOBILE BOTTOM TAB NAVIGATION ---------------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#1F1F24] bg-[#000000]/95 backdrop-blur-xl px-2 py-2 flex items-center justify-around font-mono text-[10px]">
        <button
          type="button"
          onClick={() => {
            setActiveTab("dashboard")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "dashboard" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <span className="text-base">🏛️</span>
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("students")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "students" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <span className="text-base">🪪</span>
          <span>Student IDs</span>
          {pendingStudentCount > 0 && (
            <span className="absolute top-0 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#A60E13] text-[8px] font-black text-white">
              {pendingStudentCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("teams")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === "teams" ? "text-[#A60E13] font-bold" : "text-[#8E8E93]"
          }`}
        >
          <span className="text-base">🛡️</span>
          <span>Clearance</span>
          {pendingTeamCount > 0 && (
            <span className="absolute top-0 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black text-black">
              {pendingTeamCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onBackToLanding}
          className="flex flex-col items-center gap-1 py-1 px-3 text-[#8E8E93] hover:text-white transition"
        >
          <span className="text-base">🚪</span>
          <span>Exit</span>
        </button>
      </div>
    </div>
  )
}
