import { useState } from "react"
import type { UniversityStudentReview } from "../../../types/universityAdmin"

interface StudentIdInspectModalProps {
  student: UniversityStudentReview | null
  isOpen: boolean
  onClose: () => void
  onApprove: (studentId: string) => void
  onOpenRejectModal: (student: UniversityStudentReview) => void
}

type CardViewMode = "student_id" | "nat_front" | "nat_back"

export default function StudentIdInspectModal({
  student,
  isOpen,
  onClose,
  onApprove,
  onOpenRejectModal,
}: StudentIdInspectModalProps) {
  const [activeCard, setActiveCard] = useState<CardViewMode>("student_id")
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5 | 2>(1)

  if (!isOpen || !student) return null

  const currentImageUrl =
    activeCard === "student_id"
      ? student.studentIdCardUrl
      : activeCard === "nat_front"
        ? student.nationalIdFrontUrl
        : student.nationalIdBackUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl my-auto text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F24] pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
              University Registrar &amp; Athletic Clearance Desk
            </span>
            <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
              Student ID Verification: {student.studentName}
            </h2>
            <p className="mt-0.5 text-xs text-[#8E8E93]">
              Cross-reference student academic records with uploaded identification cards.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] text-sm text-[#8E8E93] hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Left Document Viewer / Right Academic Profile */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Document Inspection Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {/* Document Selector Pills */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCard("student_id")}
                  className={`rounded-xl px-3 py-1.5 transition cursor-pointer text-xs ${
                    activeCard === "student_id"
                      ? "bg-[#A60E13] text-white font-bold"
                      : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
                  }`}
                >
                  🎓 University Student ID
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCard("nat_front")}
                  className={`rounded-xl px-3 py-1.5 transition cursor-pointer text-xs ${
                    activeCard === "nat_front"
                      ? "bg-[#A60E13] text-white font-bold"
                      : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
                  }`}
                >
                  🪪 National ID (Front)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCard("nat_back")}
                  className={`rounded-xl px-3 py-1.5 transition cursor-pointer text-xs ${
                    activeCard === "nat_back"
                      ? "bg-[#A60E13] text-white font-bold"
                      : "bg-[#1C1C1E] text-[#8E8E93] hover:text-white"
                  }`}
                >
                  🔄 Back
                </button>
              </div>

              {/* Zoom Toggle */}
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
                className="flex items-center gap-1 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-2.5 py-1 font-mono text-[11px] text-[#8E8E93] hover:text-white transition cursor-pointer"
              >
                <span>🔍 {zoomLevel}x</span>
              </button>
            </div>

            {/* Document Display Window */}
            <div className="relative min-h-[260px] sm:min-h-[320px] max-h-[380px] w-full overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#000000] flex items-center justify-center p-2">
              <img
                src={currentImageUrl}
                alt="Identification Document"
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-200"
              />
              <div className="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[10px] text-[#8E8E93] backdrop-blur-sm">
                Document {activeCard === "student_id" ? "Student ID" : activeCard === "nat_front" ? "National ID Front" : "National ID Back"}
              </div>
            </div>
          </div>

          {/* Academic Records Cross-Reference Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3 rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-xs">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#A60E13] font-bold border-b border-[#1F1F24] pb-2">
                Student Registrar Data
              </h3>

              <div className="flex items-center gap-3">
                <img
                  src={student.avatarUrl}
                  alt={student.studentName}
                  className="h-12 w-12 rounded-xl object-cover border border-[#1F1F24]"
                />
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">{student.studentName}</h4>
                  <span className="font-mono text-[11px] text-[#8E8E93]">{student.primarySport} Athlete</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#8E8E93] uppercase block">Faculty / School:</span>
                  <span className="text-white font-sans font-semibold">{student.faculty}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#8E8E93] uppercase block">Academic Year:</span>
                  <span className="text-white">{student.academicYear}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#8E8E93] uppercase block">Student ID Number:</span>
                  <span className="text-white font-bold tracking-wider">{student.studentAcademicId}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#8E8E93] uppercase block">Egyptian National ID:</span>
                  <span className="text-white tracking-widest">{student.nationalIdNumber}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#8E8E93] uppercase block">Submission Date:</span>
                  <span className="text-[#8E8E93]">{student.submittedAt}</span>
                </div>
              </div>

              {/* Status Notice */}
              <div className="pt-2 border-t border-[#1F1F24]">
                <span className="text-[10px] uppercase text-[#8E8E93] block">Current Verification:</span>
                <span
                  className={`inline-block mt-0.5 rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                    student.status === "approved"
                      ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                      : student.status === "rejected"
                        ? "bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13]"
                        : "bg-amber-950/40 border border-amber-500/40 text-amber-400"
                  }`}
                >
                  ● {student.status}
                </span>
                {student.rejectionReason && (
                  <p className="mt-1 text-[11px] text-[#A60E13]">{student.rejectionReason}</p>
                )}
              </div>
            </div>

            {/* Quick Resolution Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onApprove(student.id)
                  onClose()
                }}
                className="w-full min-h-[46px] rounded-xl bg-emerald-600 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-900/40 flex items-center justify-center gap-2"
              >
                <span>✓ Confirm Enrollment &amp; Verify Student</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenRejectModal(student)}
                className="w-full min-h-[42px] rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-4 py-2 font-mono text-xs font-bold text-[#A60E13] hover:bg-[#A60E13] hover:text-white transition cursor-pointer active:scale-95"
              >
                ✕ Reject / Ineligible Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
