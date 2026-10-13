import { useState } from "react"
import type { ParticipantTeam } from "../../../types/participant"

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
  userUniversity: string
  userName: string
  userId: string
  onJoinTeam: (team: ParticipantTeam) => void
}

export default function JoinTeamModal({
  isOpen,
  onClose,
  userUniversity,
  userName,
  userId,
  onJoinTeam,
}: JoinTeamModalProps) {
  const [activeTab, setActiveTab] = useState<"code" | "qr">("code")
  const [code, setCode] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [scanning, setScanning] = useState(false)

  if (!isOpen) return null

  const cleanCode = code.trim().toUpperCase()
  const isFound = cleanCode.length >= 6

  function handleSimulateScan(scannedCode: string) {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setCode(scannedCode)
      setActiveTab("code")
    }, 900)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cleanCode) {
      setErrorMsg("Please enter or scan a 6-character team invite code.")
      return
    }

    const joinedTeam: ParticipantTeam = {
      id: `team-joined-${cleanCode}`,
      name: cleanCode.startsWith("AUC")
        ? "AUC Titans"
        : cleanCode.startsWith("GUC")
          ? "GUC Eagles"
          : "Cairo Wolves FC",
      code: cleanCode,
      sport: cleanCode.includes("PAD") ? "Padel" : "Football",
      university: cleanCode.startsWith("AUC")
        ? "American University in Cairo (AUC)"
        : cleanCode.startsWith("GUC")
          ? "German University in Cairo (GUC)"
          : userUniversity,
      logoUrl:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80",
      color: "#A60E13",
      captainId: "capt-1",
      captainName: "Seif El-Din (Captain)",
      createdAt: "2026-09-01",
      record: { wins: 4, losses: 1, draws: 0 },
      appliedTournaments: [],
      roster: [
        {
          id: "capt-1",
          name: "Seif El-Din",
          role: "Captain",
          jerseyNumber: 10,
          position: "Playmaker",
          university: userUniversity,
          avatarUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
          verificationStatus: "verified",
        },
        {
          id: userId,
          name: userName,
          role: "Player",
          jerseyNumber: 9,
          position: "Forward",
          university: userUniversity,
          avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          verificationStatus: "verified",
        },
      ],
    }

    onJoinTeam(joinedTeam)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl text-white no-scrollbar">
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
            Team Invitation
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            Join Campus Team
          </h2>
          <p className="mt-1 text-xs text-[#8E8E93]">
            Scan your team&apos;s accreditation QR code or enter their 6-character code.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="mt-4 grid grid-cols-2 rounded-xl border border-[#1F1F24] bg-[#000000] p-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`flex min-h-[36px] items-center justify-center rounded-lg font-bold transition cursor-pointer ${
              activeTab === "code"
                ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            6-Char Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("qr")}
            className={`flex min-h-[36px] items-center justify-center gap-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeTab === "qr"
                ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            <span>📷 QR Scanner</span>
          </button>
        </div>

        {/* ---------------- TAB 1: QR SCANNER TOOL ---------------- */}
        {activeTab === "qr" ? (
          <div className="mt-5 space-y-4 text-center">
            {/* Viewfinder simulation */}
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border-2 border-dashed border-[#A60E13] bg-[#000000] flex flex-col items-center justify-center">
              {/* Corner indicators */}
              <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-white" />
              <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-white" />

              {/* Laser scan animation line */}
              <div className="absolute inset-x-2 h-0.5 bg-[#A60E13] shadow-[0_0_8px_#A60E13] animate-pulse" />

              <span className="text-3xl">📷</span>
              <p className="mt-2 font-mono text-[11px] text-[#8E8E93]">
                {scanning ? "Reading Team QR..." : "Align Team QR Code"}
              </p>
            </div>

            <p className="text-xs text-[#8E8E93]">
              Point your camera at the captain&apos;s team invite QR card on their phone.
            </p>

            {/* Quick Demo Scan Triggers */}
            <div className="pt-2">
              <span className="block font-mono text-[10px] text-[#8E8E93] uppercase mb-2">
                Simulate Camera Scan with Sample Teams:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateScan("AUC-204")}
                  className="rounded-lg border border-[#1F1F24] bg-[#000000] px-3 py-1 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
                >
                  Scan AUC Titans (AUC-204)
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateScan("GUC-419")}
                  className="rounded-lg border border-[#1F1F24] bg-[#000000] px-3 py-1 font-mono text-xs text-white hover:border-[#A60E13] transition cursor-pointer"
                >
                  Scan GUC Eagles (GUC-419)
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ---------------- TAB 2: 6-CHAR CODE INPUT ---------------- */
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
                Type 6-Character Invite Code *
              </label>
              <input
                type="text"
                required
                maxLength={8}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  setErrorMsg("")
                }}
                placeholder="e.g. CAI-782"
                className="w-full text-center font-mono tracking-widest uppercase text-xl font-bold rounded-xl border border-[#1F1F24] bg-[#000000] px-4 py-3 text-white placeholder-[#8E8E93]/40 focus:border-[#A60E13] focus:outline-none transition"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-[#A60E13] font-mono">{errorMsg}</p>
            )}

            {isFound && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-xs font-mono animate-in fade-in">
                <span className="text-emerald-400 font-bold block mb-1">
                  ✓ Team Invite Verified
                </span>
                <p className="text-white font-bold font-sans text-sm">
                  {cleanCode.startsWith("AUC")
                    ? "AUC Titans"
                    : cleanCode.startsWith("GUC")
                      ? "GUC Eagles"
                      : "Cairo Wolves FC"}
                </p>
                <p className="text-[#8E8E93] text-[11px]">
                  University: {userUniversity} · Sport: Football
                </p>
                <p className="text-emerald-300 text-[10px] mt-2">
                  Joining will add your verified student profile to this team.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={!cleanCode}
                className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Join Team
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
        )}
      </div>
    </div>
  )
}
