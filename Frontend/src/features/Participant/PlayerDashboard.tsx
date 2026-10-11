import { useState } from "react"
import type {
  AthleteProfile,
  ParticipantTeam,
  UpcomingMatch,
  ParticipantAlert,
} from "../../types/participant"
import AthletePassModal from "./components/AthletePassModal"

interface PlayerDashboardProps {
  athlete: AthleteProfile
  team: ParticipantTeam | null
  matches: UpcomingMatch[]
  alerts: ParticipantAlert[]
  onNavigate: (tab: "dashboard" | "profile" | "teams" | "settings") => void
  onOpenFanHub?: () => void
}

export default function PlayerDashboard({
  athlete,
  team,
  matches,
  alerts,
  onNavigate,
  onOpenFanHub,
}: PlayerDashboardProps) {
  const [activeAlerts, setActiveAlerts] = useState<ParticipantAlert[]>(alerts)
  const [passModalOpen, setPassModalOpen] = useState(false)
  const nextMatch = matches[0]

  function dismissAlert(alertId: string) {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== alertId))
  }

  function handleAlertAction(target?: "profile" | "teams" | "match_pass") {
    if (target === "match_pass") {
      setPassModalOpen(true)
    } else if (target === "profile") {
      onNavigate("profile")
    } else if (target === "teams") {
      onNavigate("teams")
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. TOP ATHLETE WELCOME & ACCREDITATION BANNER ---------------- */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-gradient-to-r from-[#1C1C1E] via-[#0A0A0A] to-[#0A0A0A] p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative shrink-0">
              <img
                src={athlete.photoUrl}
                alt={`${athlete.firstName} ${athlete.lastName}`}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#A60E13] text-[10px] font-black text-white shadow-md border-2 border-[#0A0A0A]">
                #{athlete.jerseyNumber}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-md bg-[#000000] border border-[#1F1F24] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                  {athlete.university}
                </span>
                {athlete.overallVerificationStatus === "verified" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase">
                    <span>✓</span> Verified Student Athlete
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400 uppercase">
                    <span>⏳</span> ID Under Review
                  </span>
                )}
              </div>

              <h1 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
                Welcome back, {athlete.firstName}
              </h1>

              <p className="font-mono text-xs text-[#8E8E93]">
                {team ? (
                  <span>
                    Team: <strong className="text-white">{team.name}</strong> · {athlete.primaryPosition}
                  </span>
                ) : (
                  <span>No team joined yet · Free Agent</span>
                )}
              </p>
            </div>
          </div>

          {/* Quick CTA: Open Match Day Pass */}
          <div className="flex items-center gap-2 sm:self-center">
            <button
              type="button"
              onClick={() => setPassModalOpen(true)}
              className="flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
            >
              <span>Digital Match Pass</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="13" y2="12" />
                <line x1="7" y1="16" x2="10" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- 2. IMPORTANT ALERTS FEED ---------------- */}
      {activeAlerts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              Active Alerts &amp; Pitch Notices ({activeAlerts.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition ${
                  alert.severity === "urgent"
                    ? "border-[#A60E13]/60 bg-[#A60E13]/10"
                    : alert.severity === "success"
                      ? "border-emerald-500/40 bg-emerald-950/20"
                      : "border-[#1F1F24] bg-[#0A0A0A]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm ${
                      alert.severity === "urgent"
                        ? "bg-[#A60E13] text-white"
                        : alert.severity === "success"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {alert.severity === "urgent" ? "⚠️" : alert.severity === "success" ? "✓" : "ℹ️"}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-bold text-sm text-white">
                        {alert.title}
                      </h4>
                      <span className="font-mono text-[10px] text-[#8E8E93]">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/80 leading-relaxed font-normal">
                      {alert.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {alert.actionText && (
                    <button
                      type="button"
                      onClick={() => handleAlertAction(alert.actionTarget)}
                      className="min-h-[36px] rounded-lg bg-white px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-black hover:bg-white/90 transition cursor-pointer"
                    >
                      {alert.actionText}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => dismissAlert(alert.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F1F24] text-[#8E8E93] hover:text-white transition cursor-pointer"
                    aria-label="Dismiss alert"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- 3. NEXT UPCOMING MATCH FIXTURE ---------------- */}
      {nextMatch ? (
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F1F24] pb-4 gap-2">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
                Next Scheduled Match
              </span>
              <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
                {nextMatch.tournamentTitle}
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-[#A60E13]/40 bg-[#A60E13]/15 px-3 py-1 font-mono text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-[#A60E13] animate-pulse" />
              <span>{nextMatch.countdownText}</span>
            </div>
          </div>

          {/* Confrontation Row */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Team 1 */}
            <div className="md:col-span-5 flex items-center gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1C1C1E] border border-white/10 font-mono text-base font-black text-white">
                CW
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-[#A60E13] uppercase font-bold">
                  Your Team
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white truncate">
                  {team?.name || "Cairo Wolves FC"}
                </h3>
                <p className="text-xs text-[#8E8E93] truncate">{athlete.university}</p>
              </div>
            </div>

            {/* VS Badge */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#000000] border border-[#1F1F24] font-mono text-xs font-black text-[#A60E13]">
                VS
              </span>
              <span className="mt-1 font-mono text-[10px] text-[#8E8E93]">
                {nextMatch.round}
              </span>
            </div>

            {/* Team 2 Opponent */}
            <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-4 text-left md:text-right">
              <div className="min-w-0 order-2 md:order-1">
                <span className="font-mono text-[10px] text-[#8E8E93] uppercase font-bold">
                  Opponent
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white truncate">
                  {nextMatch.opponentTeam}
                </h3>
                <p className="text-xs text-[#8E8E93] truncate">
                  {nextMatch.opponentUniversity}
                </p>
              </div>
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1C1C1E] border border-white/10 font-mono text-base font-black text-white order-1 md:order-2">
                {nextMatch.opponentLogo}
              </div>
            </div>
          </div>

          {/* Logistics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-xs font-mono">
            <div>
              <span className="block text-[10px] uppercase text-[#8E8E93]">DATE &amp; TIME</span>
              <span className="text-white font-bold">{nextMatch.dateFormatted}</span>
              <span className="block text-white/70">{nextMatch.timeFormatted}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#8E8E93]">PITCH &amp; VENUE</span>
              <span className="text-white font-bold">{nextMatch.pitch}</span>
              <span className="block text-white/70 truncate">{nextMatch.venue}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-[#A60E13] font-bold">
                MANDATORY ROLL CALL
              </span>
              <span className="text-white font-bold">{nextMatch.rollCallTime}</span>
              <span className="block text-emerald-400 text-[11px]">ID check pitch-side</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#1F1F24]">
            <span className="font-mono text-xs text-[#8E8E93]">
              Jersey Kit: <strong className="text-white">{nextMatch.jerseyColor}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPassModalOpen(true)}
                className="flex min-h-[42px] flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
              >
                <span>Check-in Digital Pass</span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 text-center">
          <p className="text-sm text-[#8E8E93]">No upcoming matches scheduled currently.</p>
        </section>
      )}

      {/* ---------------- 4. ATHLETIC SCOUTING & PERFORMANCE TELEMETRY ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F1F24] pb-4 gap-2">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              Verified Performance
            </span>
            <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
              Athletic Telemetry &amp; Scouting Exposure
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="font-mono text-xs text-[#A60E13] hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Edit Full Profile</span>
            <span>→</span>
          </button>
        </div>

        {/* 5 Stats Cards */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
          <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-center">
            <span className="font-mono text-3xl font-black text-[#A60E13]">
              {athlete.stats.goals}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
              Tournament Goals
            </span>
          </div>

          <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-center">
            <span className="font-mono text-3xl font-black text-white">
              {athlete.stats.assists}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
              Assists
            </span>
          </div>

          <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-center">
            <span className="font-mono text-3xl font-black text-white">
              {athlete.stats.matchesPlayed}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
              Matches Played
            </span>
          </div>

          <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-center">
            <span className="font-mono text-3xl font-black text-[#A60E13]">
              {athlete.stats.mvpAwards}
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
              MVP Accolades
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 text-center">
            <span className="font-mono text-3xl font-black text-emerald-400">
              {athlete.stats.topSpeedKmH}
              <span className="text-xs font-normal text-[#8E8E93]"> km/h</span>
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
              Top Sprint Speed
            </span>
          </div>
        </div>

        {/* Scout Radar Banner */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#A60E13]/30 bg-[#A60E13]/10 p-3.5 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A60E13] text-white text-base">
              🔭
            </span>
            <div>
              <p className="font-sans font-bold text-white">
                {athlete.scoutViews} Certified Scout Views this Season
              </p>
              <p className="text-[11px] text-white/80 font-normal">
                Scouts from Al Ahly SC, ENPPI, and Pyramids FC are tracking your stats. Private ID documents remain hidden.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="min-h-[36px] rounded-lg border border-[#A60E13] bg-[#A60E13] px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-white hover:bg-[#BF1218] transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            Manage Public Stats
          </button>
        </div>
      </section>

      {/* ---------------- 5. TEAM ROSTER SNAPSHOT & FAN HUB CROSS LINK ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Team Hub Quick Widget */}
        <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A60E13] font-bold">
                My University Team
              </span>
              {team && (
                <span className="font-mono text-[10px] text-emerald-400 font-bold">
                  {team.roster.length} Players Registered
                </span>
              )}
            </div>

            {team ? (
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1C1E] border border-white/10 font-mono text-sm font-bold text-white">
                    CW
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-white">{team.name}</h3>
                    <p className="font-mono text-xs text-[#8E8E93]">
                      Join Code: <strong className="text-white">{team.code}</strong> · {team.university}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-[#1F1F24] bg-[#000000] p-3 text-xs">
                  <div className="flex justify-between text-[#8E8E93] mb-1 font-mono text-[11px]">
                    <span>Team Roster Clearance</span>
                    <span className="text-emerald-400 font-bold">100% IDs Verified</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1F1F24] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                  </div>
                  <p className="mt-2 text-[11px] text-[#8E8E93]">
                    Eligible for official Egyptian Collegiate Football Cup bracket seeding.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 py-4 text-center">
                <p className="text-xs text-[#8E8E93]">
                  You are not currently enrolled in a team roster.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigate("teams")}
            className="mt-5 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-[#1F1F24] bg-[#000000] py-2.5 font-mono text-xs font-bold uppercase text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
          >
            <span>Open Team Hub &amp; Roster</span>
            <span>→</span>
          </button>
        </section>

        {/* Public Fan Hub & Rival Matches Quick Link */}
        {onOpenFanHub && (
          <section className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E8E93] font-bold">
                  Fan Hub Spectator Arena
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Live Broadcasts
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-sans font-bold text-lg text-white">
                  Scout Rival University Matches
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  Follow ongoing brackets, ticket availability, food trucks, and live match telemetries from other Egyptian universities in the public Fan Hub.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-[#1F1F24] bg-[#000000] p-3 text-xs font-mono">
                <div className="flex items-center justify-between text-[#8E8E93]">
                  <span>Ongoing Collegiate Events:</span>
                  <span className="text-[#A60E13] font-bold">3 Tournaments</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenFanHub?.()}
              className="mt-5 flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#A60E13] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/25 cursor-pointer"
            >
              <span>Jump to Public Fan Hub</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </section>
        )}
      </div>

      {/* ---------------- 6. DIGITAL ACCREDITATION PASS MODAL ---------------- */}
      <AthletePassModal
        isOpen={passModalOpen}
        onClose={() => setPassModalOpen(false)}
        athlete={athlete}
        match={nextMatch}
        teamName={team?.name || "Cairo Wolves FC"}
      />
    </div>
  )
}
