import { useState } from "react"
import type {
  ParticipantTeam,
  TeamTournamentApplication,
} from "../../types/participant"
import CreateTeamModal from "./components/CreateTeamModal"
import JoinTeamModal from "./components/JoinTeamModal"
import TournamentApplyModal from "./components/TournamentApplyModal"
import LeaveTeamConfirmModal from "./components/LeaveTeamConfirmModal"
import TeamCard from "./components/TeamCard"

interface TeamHubViewProps {
  teams: ParticipantTeam[]
  userUniversity: string
  userName: string
  userId: string
  onAddTeam: (team: ParticipantTeam) => void
  onLeaveTeam: (teamId: string) => void
  onUpdateTeam: (team: ParticipantTeam) => void
  onNavigateToProfile: () => void
}

export default function TeamHubView({
  teams,
  userUniversity,
  userName,
  userId,
  onAddTeam,
  onLeaveTeam,
  onUpdateTeam,
  onNavigateToProfile,
}: TeamHubViewProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [selectedTeamForApply, setSelectedTeamForApply] = useState<ParticipantTeam | null>(null)
  const [teamToLeave, setTeamToLeave] = useState<ParticipantTeam | null>(null)

  function handleAddApplication(app: TeamTournamentApplication) {
    if (!selectedTeamForApply) return
    const updatedTeam: ParticipantTeam = {
      ...selectedTeamForApply,
      appliedTournaments: [...selectedTeamForApply.appliedTournaments, app],
    }
    onUpdateTeam(updatedTeam)
    setSelectedTeamForApply(null)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- PERSISTENT HEADER ACTIONS ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1F1F24] pb-5 gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A60E13]">
            Collegiate Team Hub
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Team Hub &amp; Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Manage your enrolled university teams, join teams via QR or code, and apply to tournaments.
          </p>
        </div>

        {/* Persistent Action Buttons: Always available whether user has 0, 1, or multiple teams */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setJoinModalOpen(true)}
            className="flex min-h-[42px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95 shadow-sm"
          >
            <span>+ Join Team</span>
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[#A60E13] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30"
          >
            <span>+ Create Team</span>
          </button>
        </div>
      </div>

      {/* ---------------- CONDITIONAL DISPLAY: EMPTY STATE VS MY TEAMS DASHBOARD ---------------- */}
      {teams.length === 0 ? (
        /* ---------------- EMPTY STATE ---------------- */
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-10 text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1C1C1E] text-2xl mb-4">
              🛡️
            </div>
            <h2 className="font-sans font-bold text-xl sm:text-2xl text-white">
              No Teams Joined Yet
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              You are currently registered as an independent student-athlete. To enter official university tournaments, join an existing campus team or establish a new team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Entry Point 1: Join Team */}
            <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1C1C1E] text-xl">
                  🔑
                </span>
                <h3 className="mt-4 font-sans font-bold text-xl text-white">
                  1. Join Existing Team
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  Scan a team invite QR code with your phone camera or enter their 6-character code (e.g. <code>CAI-782</code>).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setJoinModalOpen(true)}
                className="mt-6 flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-[#A60E13] hover:text-[#A60E13] transition active:scale-95 cursor-pointer"
              >
                Join with QR / Code
              </button>
            </div>

            {/* Entry Point 2: Create Team */}
            <div className="rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-between hover:border-[#A60E13]/60 transition">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A60E13] text-white text-xl font-black">
                  +
                </span>
                <h3 className="mt-4 font-sans font-bold text-xl text-white">
                  2. Establish New Team
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  Create a new team under <strong>{userUniversity}</strong>. Upload your team shield, specify sport, and receive an automated 6-character invite code as Captain.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="mt-6 flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-lg shadow-[#A60E13]/30 cursor-pointer"
              >
                Create Team Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ---------------- MY TEAMS DASHBOARD ---------------- */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              Enrolled Teams ({teams.length})
            </span>
            <span className="font-mono text-[11px] text-[#8E8E93]">
              Active Collegiate Athlete
            </span>
          </div>

          {/* Scrollable list of team cards */}
          <div className="space-y-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                userId={userId}
                onApplyTournament={(t) => setSelectedTeamForApply(t)}
                onRequestLeaveTeam={(t) => setTeamToLeave(t)}
                onNavigateToProfile={onNavigateToProfile}
              />
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MODALS ---------------- */}
      {/* 1. Create Team Modal */}
      <CreateTeamModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userUniversity={userUniversity}
        userName={userName}
        userId={userId}
        onCreateTeam={(newTeam) => onAddTeam(newTeam)}
      />

      {/* 2. Join Team Modal (with QR Scanner + Code input) */}
      <JoinTeamModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        userUniversity={userUniversity}
        userName={userName}
        userId={userId}
        onJoinTeam={(joinedTeam) => onAddTeam(joinedTeam)}
      />

      {/* 3. Tournament Application Modal */}
      {selectedTeamForApply && (
        <TournamentApplyModal
          isOpen={!!selectedTeamForApply}
          onClose={() => setSelectedTeamForApply(null)}
          team={selectedTeamForApply}
          onApplyTournament={handleAddApplication}
        />
      )}

      {/* 4. Mandatory Leave Team Confirmation Modal (#A60E13 destructive button) */}
      <LeaveTeamConfirmModal
        isOpen={!!teamToLeave}
        team={teamToLeave}
        userId={userId}
        onClose={() => setTeamToLeave(null)}
        onConfirmLeave={(teamId) => onLeaveTeam(teamId)}
      />
    </div>
  )
}
