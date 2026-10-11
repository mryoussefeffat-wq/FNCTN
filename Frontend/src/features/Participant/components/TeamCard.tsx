import { useState } from "react"
import type { ParticipantTeam, TeamMember } from "../../../types/participant"

interface TeamCardProps {
  team: ParticipantTeam
  userId: string
  onApplyTournament: (team: ParticipantTeam) => void
  onRequestLeaveTeam: (team: ParticipantTeam) => void
  onNavigateToProfile: () => void
}

export default function TeamCard({
  team,
  userId,
  onApplyTournament,
  onRequestLeaveTeam,
  onNavigateToProfile,
}: TeamCardProps) {
  const [rosterExpanded, setRosterExpanded] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const isCaptain = team.captainId === userId
  const totalRoster = team.roster.length
  const verifiedCount = team.roster.filter((m) => m.verificationStatus === "verified").length
  const verificationPercent =
    totalRoster > 0 ? Math.round((verifiedCount / totalRoster) * 100) : 0

  function handleCopyCode() {
    navigator.clipboard.writeText(team.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2500)
  }

  function handleShareWhatsApp() {
    const text = encodeURIComponent(
      `Join our official university team "${team.name}" on FNCTN! Use team code: ${team.code}\nSign up at https://fnctn.sports.eg`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank")
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-xl transition hover:border-white/20">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F24] pb-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-[#1C1C1E] shadow-md flex items-center justify-center">
            {imgFailed ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#A60E13] to-[#590709] text-base sm:text-lg font-black text-white font-mono shadow-inner">
                {team.name.slice(0, 2).toUpperCase()}
              </div>
            ) : (
              <img
                src={team.logoUrl}
                alt={team.name}
                className="h-full w-full object-cover"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#A60E13] font-bold uppercase">
                {team.sport} · {team.university}
              </span>

              {/* User Role Badge (Captain vs Member) */}
              {isCaptain ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#A60E13]/60 bg-[#A60E13]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#A60E13] uppercase">
                  <span>👑</span> Captain
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-[#000000] px-2.5 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                  <span>👤</span> Member
                </span>
              )}
            </div>

            <h3 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
              {team.name}
            </h3>

            <p className="font-mono text-xs text-[#8E8E93]">
              Captain: <strong className="text-white">{team.captainName}</strong> · Record:{" "}
              <span className="text-emerald-400 font-bold">{team.record.wins}W</span>-
              <span className="text-[#A60E13] font-bold">{team.record.losses}L</span>-
              <span className="text-white font-bold">{team.record.draws}D</span>
            </p>
          </div>
        </div>

        {/* 6-Character Invite Code & Sharing */}
        <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-3 text-center sm:text-left shrink-0">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-[#8E8E93] mb-1">
            Invite Code
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg sm:text-xl font-black tracking-widest text-white">
              {team.code}
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="rounded-lg bg-[#A60E13] px-2.5 py-1 font-mono text-[11px] font-bold text-white uppercase hover:bg-[#BF1218] transition cursor-pointer"
            >
              {copiedCode ? "✓ Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-400 hover:bg-emerald-900/60 transition cursor-pointer"
              title="Share via WhatsApp"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Roster Clearance Health Meter */}
      <div className="mt-4 rounded-xl border border-[#1F1F24] bg-[#000000] p-3 text-xs font-mono">
        <div className="flex justify-between text-[#8E8E93] mb-1.5 text-[11px]">
          <span>
            Roster Clearance:{" "}
            <strong className="text-white">{verifiedCount} / {totalRoster} IDs Verified</strong>
          </span>
          <span className={verificationPercent === 100 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {verificationPercent}% Verified
          </span>
        </div>
        <div className="h-1.5 w-full bg-[#1F1F24] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              verificationPercent === 100 ? "bg-emerald-500" : "bg-[#A60E13]"
            }`}
            style={{ width: `${verificationPercent}%` }}
          />
        </div>
      </div>

      {/* Tournament Entries Snapshot */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-mono text-[10px] text-[#8E8E93] uppercase block">
            Collegiate Tournaments
          </span>
          {team.appliedTournaments.length > 0 ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {team.appliedTournaments.map((app) => (
                <span
                  key={app.tournamentId}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-2.5 py-1 text-xs text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <strong>{app.tournamentTitle}</strong>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    ({app.status === "approved" ? "Approved" : "Pending"})
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-0.5 text-[#8E8E93]">No active tournament registrations yet.</p>
          )}
        </div>

        {isCaptain && (
          <button
            type="button"
            onClick={() => onApplyTournament(team)}
            className="flex min-h-[38px] items-center gap-1 rounded-xl bg-[#A60E13] px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-[#BF1218] transition cursor-pointer self-start sm:self-auto shrink-0 shadow-md shadow-[#A60E13]/25 active:scale-95"
          >
            <span>+ Apply to Tournament</span>
          </button>
        )}
      </div>

      {/* Collapsible Roster Section */}
      <div className="mt-5 border-t border-[#1F1F24] pt-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRosterExpanded(!rosterExpanded)}
            className="flex items-center gap-2 font-mono text-xs font-bold text-white hover:text-[#A60E13] transition cursor-pointer"
          >
            <span>{rosterExpanded ? "Hide Roster" : `View Team Roster (${team.roster.length})`}</span>
            <span>{rosterExpanded ? "▲" : "▼"}</span>
          </button>

          {/* Leave Team Action Button triggering mandatory confirmation modal */}
          <button
            type="button"
            onClick={() => onRequestLeaveTeam(team)}
            className="font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer underline underline-offset-4 decoration-transparent hover:decoration-[#A60E13]"
          >
            Leave Team
          </button>
        </div>

        {rosterExpanded && (
          <div className="mt-4 divide-y divide-[#1F1F24] border-t border-[#1F1F24] animate-in fade-in">
            {team.roster.map((player: TeamMember) => (
              <div
                key={player.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      className="h-9 w-9 rounded-xl object-cover border border-white/10"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A60E13] text-[8px] font-black text-white">
                      #{player.jerseyNumber}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-white">
                        {player.name}
                      </h4>
                      {player.role === "Captain" && (
                        <span className="rounded bg-[#A60E13]/20 border border-[#A60E13]/40 px-1.5 py-0.2 font-mono text-[9px] font-bold text-[#A60E13] uppercase">
                          Captain
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[11px] text-[#8E8E93]">
                      {player.position}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  {player.verificationStatus === "verified" ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400 uppercase">
                      <span>✓</span> IDs Cleared
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#A60E13]/50 bg-[#A60E13]/15 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#A60E13] uppercase">
                      <span>⚠️</span> ID Missing
                    </span>
                  )}

                  {player.id === userId && player.verificationStatus !== "verified" && (
                    <button
                      type="button"
                      onClick={onNavigateToProfile}
                      className="font-mono text-[11px] text-[#A60E13] hover:underline cursor-pointer"
                    >
                      Upload ID
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
