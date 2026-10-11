import { useState } from "react"
import type { AthleteProfile, AthleteDocument } from "../../types/participant"
import IdUploadDropzone from "./components/IdUploadDropzone"

interface ProfileSettingsViewProps {
  athlete: AthleteProfile
  onSaveProfile: (updated: AthleteProfile) => void
}

const EGYPTIAN_UNIVERSITIES = [
  "Cairo University",
  "American University in Cairo (AUC)",
  "German University in Cairo (GUC)",
  "Ain Shams University",
  "Alexandria University",
  "Badr University in Cairo (BUC)",
  "Misr University for Science and Technology (MUST)",
  "Helwan University",
  "Mansoura University",
  "Assiut University",
  "Nile University",
  "British University in Egypt (BUE)",
]

const POPULAR_SPORTS = [
  "Football",
  "Basketball",
  "Padel",
  "Volleyball",
  "Handball",
  "Tennis",
  "Squash",
  "Track & Field",
]

export default function ProfileSettingsView({
  athlete,
  onSaveProfile,
}: ProfileSettingsViewProps) {
  const [form, setForm] = useState<AthleteProfile>(athlete)
  const [savedSuccess, setSavedSuccess] = useState(false)

  function handleChange(
    field: keyof AthleteProfile,
    value: string | number | string[] | AthleteDocument
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSaveProfile(form)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3500)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F1F24] pb-4 gap-2">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Student Athlete Profile &amp; ID Verification
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Profile Settings &amp; Accreditation Desk
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Update your collegiate eligibility credentials and securely submit required documentation.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono text-emerald-400 font-bold animate-in fade-in">
            <span>✓</span> Profile updated successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* ---------------- SECTION 1: SECURE ID VERIFICATION DOCUMENTS ---------------- */}
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl">
          <div className="border-b border-[#1F1F24] pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#A60E13] text-white text-xs font-black">
                ID
              </span>
              <h2 className="font-sans font-bold text-lg sm:text-xl text-white">
                Official Tournament Accreditation Documents
              </h2>
            </div>
            <p className="mt-1 text-xs text-white/80 leading-relaxed font-normal">
              Per FNCTN rules, tournament organizers require both an official University Student ID
              and National ID photo to grant match pitch clearance and eliminate unverified players.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Student ID Uploader */}
            <IdUploadDropzone
              label="1. Official University Student ID"
              subLabel="Photo of your active university campus ID card"
              documentType="student_id"
              doc={form.studentIdDoc}
              onUpdateDoc={(newDoc) => handleChange("studentIdDoc", newDoc)}
            />

            {/* National ID Uploader */}
            <IdUploadDropzone
              label="2. National ID Card or Passport"
              subLabel="Egyptian National ID front or official passport"
              documentType="national_id"
              doc={form.nationalIdDoc}
              onUpdateDoc={(newDoc) => handleChange("nationalIdDoc", newDoc)}
            />
          </div>

          {/* Privacy Guarantee Notice */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-[#000000] p-4 text-xs font-mono">
            <span className="text-base">🔒</span>
            <div className="space-y-0.5">
              <p className="font-bold text-white">Confidentiality &amp; Data Security Guarantee</p>
              <p className="text-[#8E8E93] leading-relaxed">
                Your ID documents are encrypted with 256-bit AES encryption. They are strictly
                reviewed by the Tournament Accreditation Committee to verify student status and
                are <strong>NEVER</strong> shared publicly or visible to scouting networks.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: ACADEMIC DETAILS ---------------- */}
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-white border-b border-[#1F1F24] pb-4">
            University &amp; Academic Credentials
          </h2>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                University Institution *
              </label>
              <select
                value={form.university}
                onChange={(e) => handleChange("university", e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition cursor-pointer"
              >
                {EGYPTIAN_UNIVERSITIES.map((u) => (
                  <option key={u} value={u} className="bg-[#000000] text-white">
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Faculty / Department *
              </label>
              <input
                type="text"
                value={form.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                placeholder="e.g. Faculty of Engineering / Medicine"
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Academic Year *
              </label>
              <select
                value={form.academicYear}
                onChange={(e) => handleChange("academicYear", e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition cursor-pointer"
              >
                <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                <option value="Junior (Year 3)">Junior (Year 3)</option>
                <option value="Senior (Year 4)">Senior (Year 4)</option>
                <option value="Senior (Year 5)">Senior (Year 5 - Eng / Pharm / Med)</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Student ID Card Number
              </label>
              <input
                type="text"
                value={form.studentIdNumber}
                onChange={(e) => handleChange("studentIdNumber", e.target.value)}
                placeholder="e.g. CU-ENG-2023-4819"
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition font-mono"
              />
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 3: ATHLETIC PROFILE & STATS ---------------- */}
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-white border-b border-[#1F1F24] pb-4">
            Athletic Position &amp; Scouting Attributes
          </h2>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="sm:col-span-2">
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Primary Sport *
              </label>
              <select
                value={form.sports[0] || "Football"}
                onChange={(e) => handleChange("sports", [e.target.value])}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition cursor-pointer"
              >
                {POPULAR_SPORTS.map((s) => (
                  <option key={s} value={s} className="bg-[#000000] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Playing Position *
              </label>
              <input
                type="text"
                value={form.primaryPosition}
                onChange={(e) => handleChange("primaryPosition", e.target.value)}
                placeholder="e.g. Striker / Point Guard"
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Jersey Number *
              </label>
              <input
                type="number"
                min="0"
                max="99"
                value={form.jerseyNumber}
                onChange={(e) => handleChange("jerseyNumber", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Dominant Foot / Hand
              </label>
              <select
                value={form.dominantFoot}
                onChange={(e) =>
                  handleChange("dominantFoot", e.target.value as "Right" | "Left" | "Both")
                }
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition cursor-pointer"
              >
                <option value="Right">Right</option>
                <option value="Left">Left</option>
                <option value="Both">Both (Ambidextrous)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                value={form.heightCm}
                onChange={(e) => handleChange("heightCm", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Weight (kg)
              </label>
              <input
                type="number"
                value={form.weightKg}
                onChange={(e) => handleChange("weightKg", parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+20 100 554 9922"
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition font-mono"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
              Athlete Bio &amp; Achievements (Visible to Scouts)
            </label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Detail your collegiate background, high school academy awards, and playing style..."
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition leading-relaxed resize-none"
            />
          </div>
        </section>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="font-mono text-xs text-[#8E8E93]">
            Changes synchronize across your official tournament roster.
          </p>

          <button
            type="submit"
            className="flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-xl shadow-[#A60E13]/30 cursor-pointer"
          >
            <span>Save Profile &amp; Documents</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
