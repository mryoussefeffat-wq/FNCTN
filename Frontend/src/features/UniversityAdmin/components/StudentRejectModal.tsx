import { useState } from "react"
import type { UniversityStudentReview } from "../../../types/universityAdmin"

interface StudentRejectModalProps {
  student: UniversityStudentReview | null
  isOpen: boolean
  onClose: () => void
  onConfirmReject: (studentId: string, reason: string) => void
}

const COMMON_REASONS = [
  "Expired Student ID Card (Must be valid for current academic year).",
  "Document name / National ID does not match University Registrar records.",
  "Student is unenrolled or graduated prior to current academic term.",
  "Document photo is illegible, cropped, or blurry.",
  "Faculty or academic major mismatch with athletic team.",
  "Student is under active academic/disciplinary probation.",
]

export default function StudentRejectModal({
  student,
  isOpen,
  onClose,
  onConfirmReject,
}: StudentRejectModalProps) {
  const [selectedReason, setSelectedReason] = useState(COMMON_REASONS[0])
  const [customNote, setCustomNote] = useState("")

  if (!isOpen || !student) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const finalReason = customNote.trim() ? `${selectedReason} Note: ${customNote.trim()}` : selectedReason
    onConfirmReject(student.id, finalReason)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#A60E13]/50 bg-[#0A0A0A] p-6 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1F1F24] pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A60E13]/20 text-xl text-[#A60E13]">
            ⚠️
          </span>
          <div>
            <h3 className="font-sans font-bold text-lg text-white">Reject Student Eligibility</h3>
            <p className="text-xs text-[#8E8E93]">
              {student.studentName} · {student.studentAcademicId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1.5">
              Select Official Registrar Rejection Reason *
            </label>
            <div className="space-y-2">
              {COMMON_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                    selectedReason === reason
                      ? "border-[#A60E13] bg-[#A60E13]/10 text-white font-semibold"
                      : "border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-0.5 accent-[#A60E13]"
                  />
                  <span className="text-xs leading-relaxed">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
              Additional Registrar Guidance (Optional)
            </label>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Please re-upload updated student union card or visit Dean's office room 204."
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-xs text-white placeholder-[#8E8E93]/50 focus:border-[#A60E13] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1F1F24]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs text-[#8E8E93] hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#A60E13] px-5 py-2 font-mono text-xs font-bold text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/40"
            >
              Confirm Official Rejection
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
