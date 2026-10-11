import { useState, useRef } from "react"
import type { ParticipantTeam } from "../../../types/participant"

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  userUniversity: string
  userName: string
  userId: string
  onCreateTeam: (team: ParticipantTeam) => void
}

const SPORTS = [
  "Football",
  "Basketball",
  "Padel",
  "Volleyball",
  "Handball",
  "Tennis",
  "Squash",
]

const SAMPLE_LOGOS = [
  {
    name: "Wolf Shield",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Falcon Crest",
    url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Padel Star",
    url: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=300&q=80",
  },
]

export default function CreateTeamModal({
  isOpen,
  onClose,
  userUniversity,
  userName,
  userId,
  onCreateTeam,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("")
  const [sport, setSport] = useState("Football")
  const [logoUrl, setLogoUrl] = useState(SAMPLE_LOGOS[0].url)
  const [customLogoFile, setCustomLogoFile] = useState<string | null>(null)
  const [logoLoadError, setLogoLoadError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  function generateTeamCode(uni: string): string {
    const prefix = uni
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase()
    const num = Math.floor(100 + Math.random() * 900)
    return `${prefix || "EGY"}-${num}`
  }

  function handleLogoUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG) for your team logo.")
      return
    }
    const previewUrl = URL.createObjectURL(file)
    setCustomLogoFile(previewUrl)
    setLogoUrl(previewUrl)
    setLogoLoadError(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!teamName.trim()) return

    const newTeam: ParticipantTeam = {
      id: `team-${Date.now()}`,
      name: teamName.trim(),
      code: generateTeamCode(userUniversity),
      sport,
      university: userUniversity,
      logoUrl: customLogoFile || logoUrl,
      color: "#A60E13",
      captainId: userId,
      captainName: userName,
      createdAt: new Date().toISOString().split("T")[0],
      record: { wins: 0, losses: 0, draws: 0 },
      appliedTournaments: [],
      roster: [
        {
          id: userId,
          name: userName,
          role: "Captain",
          jerseyNumber: 9,
          position: "Captain / Forward",
          university: userUniversity,
          avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          verificationStatus: "verified",
        },
      ],
    }

    onCreateTeam(newTeam)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl text-white no-scrollbar">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white transition cursor-pointer active:scale-95 z-10"
        >
          ✕
        </button>

        <div className="border-b border-[#1F1F24] pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
            Campus Roster Registration
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            Create Team
          </h2>
          <p className="mt-1 text-xs text-[#8E8E93]">
            Establish a collegiate team under <strong>{userUniversity}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Team Name */}
          <div>
            <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
              Team Name *
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Cairo Wolves FC / AUC Titans"
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none transition"
            />
          </div>

          {/* Team Logo Section */}
          <div>
            <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
              Team Logo *
            </label>
            <div className="flex items-center gap-4 rounded-2xl border border-[#1F1F24] bg-[#000000] p-3.5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E] flex items-center justify-center">
                {logoLoadError ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#A60E13] to-[#590709] text-xl font-black text-white font-mono shadow-inner">
                    {teamName ? teamName.slice(0, 2).toUpperCase() : "CU"}
                  </div>
                ) : (
                  <img
                    src={customLogoFile || logoUrl}
                    alt="Team Logo Preview"
                    className="h-full w-full object-cover"
                    onError={() => setLogoLoadError(true)}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-white font-bold">Upload Custom Shield</p>
                <p className="text-[11px] text-[#8E8E93]">JPG or PNG format</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1.5 rounded-lg border border-[#1F1F24] bg-[#0A0A0A] px-3 py-1 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
                >
                  Choose Logo File
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleLogoUpload(e.target.files[0])
                  }
                }}
              />
            </div>

            {/* Quick Emblem Presets */}
            <div className="mt-2.5 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#8E8E93] uppercase">Or Pick Preset:</span>
              {SAMPLE_LOGOS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setCustomLogoFile(null)
                    setLogoUrl(preset.url)
                    setLogoLoadError(false)
                  }}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-mono transition cursor-pointer ${
                    !customLogoFile && logoUrl === preset.url
                      ? "border-[#A60E13] bg-[#A60E13]/20 text-white"
                      : "border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:text-white"
                  }`}
                >
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* University & Sport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Sport *
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-sm text-white focus:border-[#A60E13] focus:outline-none transition cursor-pointer"
              >
                {SPORTS.map((s) => (
                  <option key={s} value={s} className="bg-[#000000] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                University *
              </label>
              <input
                type="text"
                disabled
                value={userUniversity}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-3 text-sm text-[#8E8E93] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#1F1F24] bg-[#000000] p-3 text-xs font-mono text-[#8E8E93]">
            <p className="text-white font-bold mb-0.5">Captain Status &amp; 6-Character Code</p>
            <p>You will be designated as <strong>Captain</strong> and receive a unique invite code to share with teammates.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
            >
              Establish Team
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[46px] rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
