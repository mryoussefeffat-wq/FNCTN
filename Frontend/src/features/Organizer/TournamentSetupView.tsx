import { useState } from "react"
import type { CommitteeTournament, OrganizerFanService, OrganizerSponsor } from "../../types/organizer"

interface TournamentSetupViewProps {
  tournament: CommitteeTournament
  onSaveTournament: (updated: CommitteeTournament) => void
  onBackToDashboard: () => void
}

const ALL_FAN_SERVICES: { id: string; icon: string; label: string }[] = [
  { id: "fs-wifi", icon: "📶", label: "Free Stadium Wi-Fi" },
  { id: "fs-food", icon: "🍔", label: "Campus Food Village" },
  { id: "fs-stream", icon: "📺", label: "4K YouTube Live Stream" },
  { id: "fs-medical", icon: "🩺", label: "Medical Paramedic Post" },
  { id: "fs-water", icon: "💧", label: "Free Hydration Stations" },
  { id: "fs-merch", icon: "👕", label: "Official Jersey Merch" },
  { id: "fs-dj", icon: "🎧", label: "Pitch-Side DJ & Fan Announcer" },
  { id: "fs-shuttle", icon: "🚌", label: "Campus Shuttle Bus" },
]

export default function TournamentSetupView({
  tournament,
  onSaveTournament,
  onBackToDashboard,
}: TournamentSetupViewProps) {
  const [title, setTitle] = useState(tournament.title)
  const [sport, setSport] = useState(tournament.sport)
  const [league, setLeague] = useState(tournament.universityLeague)
  const [venue, setVenue] = useState(tournament.venue)
  const [pitchName, setPitchName] = useState(tournament.pitchName)
  const [startDate, setStartDate] = useState(tournament.startDate)
  const [endDate, setEndDate] = useState(tournament.endDate)
  const [maxTeams, setMaxTeams] = useState(tournament.maxTeams)
  const [entryFeeEgp, setEntryFeeEgp] = useState(tournament.entryFeeEgp)
  const [paymentInstructions, setPaymentInstructions] = useState(tournament.paymentInstructions)

  // Rules
  const [duration, setDuration] = useState(tournament.rules.matchDurationMinutes)
  const [extraTime, setExtraTime] = useState(tournament.rules.extraTimeEnabled)
  const [penalties, setPenalties] = useState(tournament.rules.penaltyShootoutEnabled)
  const [maxSubs, setMaxSubs] = useState(tournament.rules.maxSubstitutes)
  const [rulesSummary, setRulesSummary] = useState(tournament.rules.summary)

  // Fan Services
  const [fanServices, setFanServices] = useState<OrganizerFanService[]>(tournament.fanServices)

  // Sponsors
  const [sponsors, setSponsors] = useState<OrganizerSponsor[]>(tournament.sponsors)
  const [newSponsorName, setNewSponsorName] = useState("")
  const [newSponsorTier, setNewSponsorTier] = useState<"Title" | "Presenting" | "Official Partner" | "Supporter">("Official Partner")
  const [newSponsorTagline, setNewSponsorTagline] = useState("")

  const [savedSuccess, setSavedSuccess] = useState(false)

  function toggleFanService(serviceItem: { id: string; icon: string; label: string }) {
    setFanServices((prev) => {
      const existing = prev.find((s) => s.id === serviceItem.id)
      if (existing) {
        return prev.map((s) => (s.id === serviceItem.id ? { ...s, enabled: !s.enabled } : s))
      }
      return [...prev, { ...serviceItem, enabled: true }]
    })
  }

  function handleAddSponsor(e: React.FormEvent) {
    e.preventDefault()
    if (!newSponsorName.trim()) return

    const newSponsor: OrganizerSponsor = {
      id: `sp-${Date.now()}`,
      name: newSponsorName.trim(),
      tier: newSponsorTier,
      tagline: newSponsorTagline.trim() || undefined,
      logoUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=200&q=80",
    }

    setSponsors((prev) => [...prev, newSponsor])
    setNewSponsorName("")
    setNewSponsorTagline("")
  }

  function handleRemoveSponsor(id: string) {
    setSponsors((prev) => prev.filter((s) => s.id !== id))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const updated: CommitteeTournament = {
      ...tournament,
      title: title.trim(),
      sport,
      universityLeague: league,
      venue,
      pitchName,
      startDate,
      endDate,
      maxTeams: Number(maxTeams),
      entryFeeEgp: Number(entryFeeEgp),
      paymentInstructions,
      rules: {
        matchDurationMinutes: Number(duration),
        extraTimeEnabled: extraTime,
        penaltyShootoutEnabled: penalties,
        maxSubstitutes: Number(maxSubs),
        summary: rulesSummary,
      },
      fanServices,
      sponsors,
      totalExpectedFeesEgp: Number(maxTeams) * Number(entryFeeEgp),
    }

    onSaveTournament(updated)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-5">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer mb-1"
          >
            ← Back to Organizer Dashboard
          </button>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Tournament Setup &amp; Rules Engine
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            {tournament.title}
          </h1>
        </div>

        {savedSuccess && (
          <div className="rounded-xl border border-emerald-500/50 bg-emerald-950/40 px-4 py-2 font-mono text-xs text-emerald-400">
            ✓ Settings Saved Successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ---------------- 1. BASIC TOURNAMENT CONFIGURATION ---------------- */}
        <section className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xl">
          <h2 className="font-sans font-bold text-lg text-white border-b border-[#1F1F24] pb-3">
            1. General Fixture Identity &amp; Venue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Tournament Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Sport
              </label>
              <input
                type="text"
                disabled
                value={sport}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-3.5 py-2.5 text-sm text-[#8E8E93]"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                University League Affiliation
              </label>
              <input
                type="text"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Max Participating Teams
              </label>
              <input
                type="number"
                min="2"
                max="64"
                value={maxTeams}
                onChange={(e) => setMaxTeams(Number(e.target.value))}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Host Stadium / Campus Venue *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Pitch Name
              </label>
              <input
                type="text"
                value={pitchName}
                onChange={(e) => setPitchName(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* ---------------- 2. RULES & MATCH DURATION ---------------- */}
        <section className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xl">
          <h2 className="font-sans font-bold text-lg text-white border-b border-[#1F1F24] pb-3">
            2. Match Rules &amp; Regulations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Match Duration (Minutes)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                Max Allowed Substitutes
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={maxSubs}
                onChange={(e) => setMaxSubs(Number(e.target.value))}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-end gap-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white">
                <input
                  type="checkbox"
                  checked={extraTime}
                  onChange={(e) => setExtraTime(e.target.checked)}
                  className="rounded border-[#1F1F24] accent-[#A60E13]"
                />
                <span>Extra Time Enabled</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white">
                <input
                  type="checkbox"
                  checked={penalties}
                  onChange={(e) => setPenalties(e.target.checked)}
                  className="rounded border-[#1F1F24] accent-[#A60E13]"
                />
                <span>Penalty Shootout Enabled</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
              Rules Summary (Displayed to Teams &amp; Captains)
            </label>
            <textarea
              rows={3}
              value={rulesSummary}
              onChange={(e) => setRulesSummary(e.target.value)}
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-xs text-white focus:border-[#A60E13] focus:outline-none"
            />
          </div>
        </section>

        {/* ---------------- 3. ENTRY FEES & FINANCIAL INSTRUCTIONS ---------------- */}
        <section className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xl">
          <h2 className="font-sans font-bold text-lg text-white border-b border-[#1F1F24] pb-3">
            3. Entry Fees &amp; Payment Desk Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                InstaPay / Bank Deposit Instructions
              </label>
              <input
                type="text"
                value={paymentInstructions}
                onChange={(e) => setPaymentInstructions(e.target.value)}
                className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-sm text-white focus:border-[#A60E13] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* ---------------- 4. FAN SERVICES BUILDER ---------------- */}
        <section className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xl">
          <h2 className="font-sans font-bold text-lg text-white border-b border-[#1F1F24] pb-3">
            4. Fan Services &amp; Pitch-Side Amenities
          </h2>
          <p className="text-xs text-[#8E8E93]">
            Toggle spectator services visible on the tournament card and Fan Hub.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ALL_FAN_SERVICES.map((item) => {
              const isEnabled = fanServices.some((s) => s.id === item.id && s.enabled)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFanService(item)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition cursor-pointer active:scale-95 ${
                    isEnabled
                      ? "border-emerald-500/60 bg-emerald-950/20 text-white shadow-md shadow-emerald-950/40"
                      : "border-[#1F1F24] bg-[#000000] text-[#8E8E93] hover:border-white/30"
                  }`}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="font-mono text-xs font-bold">{item.label}</span>
                  <span className="font-mono text-[9px] mt-1 text-emerald-400">
                    {isEnabled ? "✓ Enabled" : "Disabled"}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ---------------- 5. SPONSORS MANAGER ---------------- */}
        <section className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xl">
          <h2 className="font-sans font-bold text-lg text-white border-b border-[#1F1F24] pb-3">
            5. Corporate Sponsors &amp; Brand Partners
          </h2>

          <div className="space-y-3">
            {sponsors.map((sp) => (
              <div
                key={sp.id}
                className="flex items-center justify-between rounded-2xl border border-[#1F1F24] bg-[#000000] p-3.5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E] flex items-center justify-center font-mono font-bold text-xs">
                    {sp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{sp.name}</span>
                      <span className="rounded bg-[#A60E13]/20 border border-[#A60E13]/50 px-1.5 py-0.2 font-mono text-[9px] text-[#A60E13]">
                        {sp.tier}
                      </span>
                    </div>
                    {sp.tagline && <p className="font-mono text-[10px] text-[#8E8E93]">{sp.tagline}</p>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSponsor(sp.id)}
                  className="rounded-lg border border-[#1F1F24] bg-[#1C1C1E] px-2.5 py-1 font-mono text-[11px] text-[#8E8E93] hover:text-[#A60E13] transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Sponsor Inline Form */}
          <div className="pt-3 border-t border-[#1F1F24]">
            <span className="font-mono text-xs font-bold uppercase text-[#8E8E93] block mb-2">
              Add New Sponsor / Partner
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                placeholder="Partner Name (e.g. Red Bull)"
                value={newSponsorName}
                onChange={(e) => setNewSponsorName(e.target.value)}
                className="rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              />

              <select
                value={newSponsorTier}
                onChange={(e) => setNewSponsorTier(e.target.value as any)}
                className="rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
              >
                <option value="Title">Title Sponsor</option>
                <option value="Presenting">Presenting Partner</option>
                <option value="Official Partner">Official Partner</option>
                <option value="Supporter">Supporter</option>
              </select>

              <button
                type="button"
                onClick={handleAddSponsor}
                className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
              >
                + Add Sponsor
              </button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#8E8E93] hover:text-white transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="min-h-[48px] rounded-xl bg-[#A60E13] px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-lg shadow-[#A60E13]/30"
          >
            Save All Tournament Changes
          </button>
        </div>
      </form>
    </div>
  )
}
