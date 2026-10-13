import { useState } from "react"
import type { UniversityStudentReview, UniversityClearanceStatus } from "../../types/universityAdmin"

interface StudentIdVerificationViewProps {
  studentReviews: UniversityStudentReview[]
  onInspectStudent: (student: UniversityStudentReview) => void
  onApproveStudent: (studentId: string) => void
  onRejectStudentClick: (student: UniversityStudentReview) => void
  onBackToDashboard: () => void
}

export default function StudentIdVerificationView({
  studentReviews,
  onInspectStudent,
  onApproveStudent,
  onRejectStudentClick,
  onBackToDashboard,
}: StudentIdVerificationViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | UniversityClearanceStatus>("all")
  const [facultyFilter, setFacultyFilter] = useState<string>("all")

  // Extract unique faculties
  const faculties = Array.from(new Set(studentReviews.map((s) => s.faculty)))

  const filteredStudents = studentReviews.filter((student) => {
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesFaculty = facultyFilter === "all" || student.faculty === facultyFilter
    const matchesSearch =
      searchTerm === "" ||
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentAcademicId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nationalIdNumber.includes(searchTerm) ||
      student.faculty.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesFaculty && matchesSearch
  })

  const pendingCount = studentReviews.filter((s) => s.status === "pending").length

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. HEADER ROW ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-5">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer mb-1"
          >
            ← Back to University Dashboard
          </button>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            University Registrar Verification Queue
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Student ID &amp; National ID Desk
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Inspect student documentation, confirm active semester enrollment, and approve athlete credentials.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="rounded-2xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-4 py-2 font-mono text-xs font-bold text-white">
            {pendingCount} Awaiting Verification
          </span>
        </div>
      </div>

      {/* ---------------- 2. SEARCH & ADVANCED FILTERS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        {/* Search Bar */}
        <div className="sm:col-span-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, academic ID, or National ID..."
              className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 pl-10 text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
            />
            <span className="absolute left-3.5 top-3.5 text-[#8E8E93] text-sm">🔍</span>
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 text-xs text-white focus:border-[#A60E13] focus:outline-none cursor-pointer"
          >
            <option value="all">All Verification Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved / Verified</option>
            <option value="rejected">Rejected / Ineligible</option>
          </select>
        </div>

        {/* Faculty Filter */}
        <div className="sm:col-span-3">
          <select
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="w-full rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-3 text-xs text-white focus:border-[#A60E13] focus:outline-none cursor-pointer"
          >
            <option value="all">All Faculties</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------- 3. STUDENT CARDS LIST ---------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] px-1">
          <span>Showing {filteredStudents.length} Students</span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-10 text-center font-mono text-xs text-[#8E8E93]">
            No student verification records match your filters.
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 shadow-xl transition hover:border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Student Profile & Academic Details */}
                <div className="flex items-start gap-4">
                  <img
                    src={student.avatarUrl}
                    alt={student.studentName}
                    className="h-14 w-14 rounded-2xl object-cover border border-[#1F1F24] shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                        {student.studentName}
                      </h3>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                          student.status === "approved"
                            ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                            : student.status === "rejected"
                              ? "bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13]"
                              : "bg-amber-950/50 border border-amber-500/40 text-amber-300"
                        }`}
                      >
                        ● {student.status}
                      </span>
                      <span className="rounded bg-[#1C1C1E] border border-white/10 px-2 py-0.5 font-mono text-[9px] text-[#8E8E93]">
                        {student.primarySport}
                      </span>
                    </div>

                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-0.5 font-mono text-xs text-[#8E8E93]">
                      <span>Faculty: <strong className="text-white font-sans">{student.faculty}</strong></span>
                      <span>Academic ID: <strong className="text-white">{student.studentAcademicId}</strong></span>
                      <span>National ID: <strong className="text-white">{student.nationalIdNumber}</strong></span>
                    </div>

                    {student.rejectionReason && (
                      <div className="mt-2 text-xs text-[#A60E13] font-mono">
                        Reason: {student.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1F1F24]">
                  <button
                    type="button"
                    onClick={() => onInspectStudent(student)}
                    className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95"
                  >
                    <span>🔍 Inspect Documents</span>
                  </button>

                  {student.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => onApproveStudent(student.id)}
                      className="flex min-h-[42px] items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-950/40"
                    >
                      <span>✓ Verify</span>
                    </button>
                  )}

                  {student.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => onRejectStudentClick(student)}
                      className="flex min-h-[42px] items-center gap-1 rounded-xl border border-[#A60E13]/40 bg-[#A60E13]/10 px-3 py-2 font-mono text-xs font-bold text-[#A60E13] hover:bg-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
                    >
                      <span>✕ Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
