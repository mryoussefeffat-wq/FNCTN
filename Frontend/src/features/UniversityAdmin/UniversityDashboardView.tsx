import type {
  UniversityProfile,
  UniversityStudentReview,
  UniversityTeamClearance,
} from "../../types/universityAdmin"

interface UniversityDashboardViewProps {
  university: UniversityProfile
  studentReviews: UniversityStudentReview[]
  teamClearances: UniversityTeamClearance[]
  onOpenStudentQueue: () => void
  onOpenTeamQueue: () => void
  onInspectStudent: (student: UniversityStudentReview) => void
  onInspectTeam: (team: UniversityTeamClearance) => void
}

export default function UniversityDashboardView({
  university,
  studentReviews,
  teamClearances,
  onOpenStudentQueue,
  onOpenTeamQueue,
  onInspectStudent,
  onInspectTeam,
}: UniversityDashboardViewProps) {
  const pendingStudents = studentReviews.filter((s) => s.status === "pending")
  const approvedStudents = studentReviews.filter((s) => s.status === "approved")
  const pendingTeams = teamClearances.filter((t) => t.status === "pending")
  const approvedTeams = teamClearances.filter((t) => t.status === "approved")

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. INSTITUTION OVERVIEW BANNER ---------------- */}
      <div className="relative overflow-hidden rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={university.logoUrl}
              alt={university.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border border-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
                  Ministry of Higher Education Accreditation
                </span>
                <span className="rounded bg-[#1C1C1E] border border-white/10 px-2 py-0.5 font-mono text-[9px] text-[#8E8E93]">
                  {university.accreditationCode}
                </span>
              </div>
              <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
                {university.name}
              </h1>
              <p className="font-mono text-xs text-[#8E8E93]">
                {university.arabicName} · 📍 {university.campusLocation} · Athletic Director: <span className="text-white">{university.athleticDirectorName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenStudentQueue}
              className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#A60E13] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30"
            >
              <span>Verify Students</span>
              {pendingStudents.length > 0 && (
                <span className="rounded-full bg-white text-[#A60E13] px-1.5 py-0.2 text-[9px] font-black">
                  {pendingStudents.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenTeamQueue}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] transition cursor-pointer active:scale-95"
            >
              <span>Team Approvals</span>
              {pendingTeams.length > 0 && (
                <span className="rounded-full bg-[#A60E13] text-white px-1.5 py-0.2 text-[9px] font-black">
                  {pendingTeams.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 2. ATHLETIC DIRECTOR METRIC TILES ---------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Pending Student ID Verification Desk */}
        <div className="rounded-2xl border border-[#A60E13]/40 bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#A60E13] font-bold">
              Pending Student IDs
            </span>
            <span className="flex h-2 w-2 rounded-full bg-[#A60E13] animate-pulse" />
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {pendingStudents.length}
          </p>
          <span className="font-mono text-[11px] text-[#A60E13]">Awaiting Enrollment Check</span>
        </div>

        {/* Metric 2: Pending Team Tournament Clearances */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">
              Team Permits Pending
            </span>
            <span className="text-sm">🛡️</span>
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {pendingTeams.length}
          </p>
          <span className="font-mono text-[11px] text-[#8E8E93]">Awaiting Dean Permit</span>
        </div>

        {/* Metric 3: Total Verified Athletes */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">
              Verified Athletes
            </span>
            <span className="text-sm">🎓</span>
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-emerald-400">
            {university.verifiedAthletesCount + approvedStudents.length}
          </p>
          <span className="font-mono text-[11px] text-emerald-400">Officially Enrolled Students</span>
        </div>

        {/* Metric 4: Endorsed Teams */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-[#8E8E93]">
              Endorsed Teams
            </span>
            <span className="text-sm">🏆</span>
          </div>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-black text-white">
            {university.activeTeamsCount + approvedTeams.length}
          </p>
          <span className="font-mono text-[11px] text-[#8E8E93]">In Active Collegiate Circuit</span>
        </div>
      </div>

      {/* ---------------- 3. DUAL QUEUE ACTION SECTION ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Student Verifications Queue */}
        <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div>
              <h2 className="font-sans font-bold text-base sm:text-lg text-white">
                Urgent Student ID Queue
              </h2>
              <p className="text-xs text-[#8E8E93]">
                Confirm national ID &amp; university union card eligibility
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenStudentQueue}
              className="font-mono text-xs text-[#A60E13] hover:underline cursor-pointer"
            >
              View All ({studentReviews.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingStudents.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-[#8E8E93]">
                ✓ All student ID submissions for this university are up to date.
              </div>
            ) : (
              pendingStudents.slice(0, 3).map((stu) => (
                <div
                  key={stu.id}
                  className="flex items-center justify-between rounded-2xl border border-[#1F1F24] bg-[#000000] p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={stu.avatarUrl}
                      alt={stu.studentName}
                      className="h-10 w-10 rounded-xl object-cover border border-[#1F1F24]"
                    />
                    <div>
                      <span className="font-bold text-white block">{stu.studentName}</span>
                      <span className="font-mono text-[11px] text-[#8E8E93]">
                        {stu.faculty} · {stu.primarySport}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onInspectStudent(stu)}
                    className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-3 py-1.5 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
                  >
                    Inspect ID →
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Team Representation Requests Queue */}
        <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
            <div>
              <h2 className="font-sans font-bold text-base sm:text-lg text-white">
                Team Tournament Endorsements
              </h2>
              <p className="text-xs text-[#8E8E93]">
                Validate full team student status for tournament clearance
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenTeamQueue}
              className="font-mono text-xs text-[#A60E13] hover:underline cursor-pointer"
            >
              View All ({teamClearances.length}) →
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingTeams.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-[#8E8E93]">
                ✓ No pending team clearance requests at this time.
              </div>
            ) : (
              pendingTeams.slice(0, 3).map((team) => {
                const verifiedCount = team.roster.filter((p) => p.isEnrolledVerified).length
                return (
                  <div
                    key={team.id}
                    className="flex items-center justify-between rounded-2xl border border-[#1F1F24] bg-[#000000] p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={team.teamLogoUrl}
                        alt={team.teamName}
                        className="h-10 w-10 rounded-xl object-cover border border-[#1F1F24]"
                      />
                      <div>
                        <span className="font-bold text-white block">{team.teamName}</span>
                        <span className="font-mono text-[11px] text-[#8E8E93]">
                          {team.targetTournamentTitle} ({team.sport})
                        </span>
                        <span className="font-mono text-[10px] text-amber-400 block mt-0.5">
                          {verifiedCount} / {team.roster.length} Verified Team Members
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onInspectTeam(team)}
                      className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-3 py-1.5 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
                    >
                      Audit Team →
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
