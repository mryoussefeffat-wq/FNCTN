import { useState } from "react"
import type { CommitteeTournament } from "../../../types/organizer"

interface CreateTournamentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTournament: (tournament: CommitteeTournament) => void
}

const SPORTS = ["Football", "Basketball", "Padel", "Track & Field"]

export default function CreateTournamentModal({
  isOpen,
  onClose,
  onCreateTournament,
}: CreateTournamentModalProps) {
  const [title, setTitle] = useState("")
  const [sport, setSport] = useState<"Football" | "Basketball" | "Padel" | "Track & Field">("Football")
  const [league, setLeague] = useState("National Egyptian Universities Championship")
  const [venue, setVenue] = useState("Cairo International Stadium Olympic Complex")
  const [pitchName, setPitchName] = useState("Main Pitch 1")
  const [startDate, setStartDate] = useState("Nov 15, 2026")
  const [endDate, setEndDate] = useState("Nov 30, 2026")
  const [maxTeams, setMaxTeams] = useState(16)
  const [entryFeeEgp, setEntryFeeEgp] = useState(3000)
  const [paymentInstructions, setPaymentInstructions] = useState(
    "InstaPay transfer to committee.sports@instapay or National Bank of Egypt Account #1009-4820-1120."
  )

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const newTournament: CommitteeTournament = {
      id: `tourn-${Date.now()}`,
      title: title.trim(),
      sport,
      universityLeague: league,
      status: "upcoming",
      startDate,
      endDate,
      venue,
      pitchName,
      maxTeams: Number(maxTeams),
      enrolledTeamsCount: 0,
      entryFeeEgp: Number(entryFeeEgp),
      paymentInstructions,
      rules: {
        matchDurationMinutes: sport === "Football" ? 90 : sport === "Basketball" ? 40 : 60,
        extraTimeEnabled: true,
        penaltyShootoutEnabled: true,
        maxSubstitutes: 5,
        summary: `Standard collegiate competition rules for ${sport}.`,
      },
      fanServices: [
        { id: "fs-wifi", icon: "📶", label: "Free Stadium Wi-Fi", enabled: true },
        { id: "fs-stream", icon: "📺", label: "YouTube Live Broadcast", enabled: true },
        { id: "fs-water", icon: "💧", label: "Hydration Post", enabled: true },
      ],
      sponsors: [],
      collectedFeesEgp: 0,
      totalExpectedFeesEgp: Number(maxTeams) * Number(entryFeeEgp),
      pendingVerificationsCount: 0,
    }

    onCreateTournament(newTournament)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] text-sm text-[#8E8E93] hover:text-white transition cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#1F1F24] pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
            Tournament Committee Engine
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            Create New Tournament
          </h2>
          <p className="mt-1 text-xs text-[#8E8E93]">
            Launch a new collegiate tournament fixture, set team fees, and open registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {/* Tournament Title */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
              Tournament Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cairo Inter-University Football Shield 2026"
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
            />
          </div>

          {/* Sport & League */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Sport *
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as any)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              >
                {SPORTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                University League Affiliation
              </label>
              <input
                type="text"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>

          {/* Venue & Pitch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Host Venue / Stadium *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Pitch / Court Name
              </label>
              <input
                type="text"
                value={pitchName}
                onChange={(e) => setPitchName(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>

          {/* Dates & Capacity */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                End Date
              </label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Max Teams
              </label>
              <input
                type="number"
                min="2"
                max="64"
                value={maxTeams}
                onChange={(e) => setMaxTeams(Number(e.target.value))}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>

          {/* Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Entry Fee per Team (EGP) *
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={entryFeeEgp}
                onChange={(e) => setEntryFeeEgp(Number(e.target.value))}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                InstaPay / Bank Instructions
              </label>
              <input
                type="text"
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-xl bg-[#A60E13] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/30"
            >
              Launch Tournament Fixture
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
