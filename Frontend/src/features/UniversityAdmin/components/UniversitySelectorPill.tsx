import type { UniversityProfile } from "../../../types/universityAdmin"

interface UniversitySelectorPillProps {
  universities: UniversityProfile[]
  selectedUniversityId: string
  onSelectUniversity: (id: string) => void
}

export default function UniversitySelectorPill({
  universities,
  selectedUniversityId,
  onSelectUniversity,
}: UniversitySelectorPillProps) {
  const current = universities.find((u) => u.id === selectedUniversityId) || universities[0]

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1.5 text-xs font-mono">
      <span className="text-[#8E8E93] text-[10px] uppercase hidden sm:inline">Institution:</span>
      <select
        value={selectedUniversityId}
        onChange={(e) => onSelectUniversity(e.target.value)}
        className="bg-transparent text-white font-sans font-semibold text-xs focus:outline-none cursor-pointer"
        aria-label="Select University Directorate"
      >
        {universities.map((u) => (
          <option key={u.id} value={u.id} className="bg-[#0A0A0A] text-white">
            {u.name} ({u.shortCode})
          </option>
        ))}
      </select>
      <span className="rounded bg-[#A60E13]/20 border border-[#A60E13]/40 px-1.5 py-0.5 text-[9px] font-bold text-[#A60E13]">
        {current.accreditationCode.split("-")[1] || "MOHE"}
      </span>
    </div>
  )
}
