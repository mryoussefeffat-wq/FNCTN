import { useState } from "react"
import type {
  PlayerReviewItem,
  TeamPaymentItem,
  IdVerificationStatus,
  PaymentReviewStatus,
} from "../../types/organizer"
import IdCardReviewModal from "./components/IdCardReviewModal"
import PaymentProofModal from "./components/PaymentProofModal"

interface VerificationDeskViewProps {
  playerReviews: PlayerReviewItem[]
  teamPayments: TeamPaymentItem[]
  onResolvePlayer: (playerId: string, status: IdVerificationStatus, reason?: string) => void
  onResolvePayment: (paymentId: string, status: PaymentReviewStatus, reason?: string) => void
  onBackToDashboard: () => void
}

export default function VerificationDeskView({
  playerReviews,
  teamPayments,
  onResolvePlayer,
  onResolvePayment,
  onBackToDashboard,
}: VerificationDeskViewProps) {
  const [activeTab, setActiveTab] = useState<"player_ids" | "team_fees">("player_ids")
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerReviewItem | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<TeamPaymentItem | null>(null)

  const pendingPlayerCount = playerReviews.filter((p) => p.status === "pending").length
  const pendingPaymentCount = teamPayments.filter((p) => p.status === "pending").length

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ---------------- 1. TOP HEADER & BREADCRUMB ---------------- */}
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
            Committee Verification &amp; Payment Desk
          </span>
          <h1 className="mt-1 font-sans font-bold text-2xl sm:text-3xl text-white">
            Team &amp; Payment Desk
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#8E8E93]">
            Inspect official university student IDs, verify Egyptian national IDs, and approve team entry fees.
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-1.5 font-mono text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("player_ids")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition cursor-pointer ${
              activeTab === "player_ids"
                ? "bg-[#A60E13] text-white font-bold shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            <span>🎓 Player IDs</span>
            {pendingPlayerCount > 0 && (
              <span className="rounded-full bg-white text-[#A60E13] px-1.5 py-0.2 text-[9px] font-black">
                {pendingPlayerCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("team_fees")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition cursor-pointer ${
              activeTab === "team_fees"
                ? "bg-[#A60E13] text-white font-bold shadow-md shadow-[#A60E13]/30"
                : "text-[#8E8E93] hover:text-white"
            }`}
          >
            <span>💳 Team Entry Fees</span>
            {pendingPaymentCount > 0 && (
              <span className="rounded-full bg-white text-[#A60E13] px-1.5 py-0.2 text-[9px] font-black">
                {pendingPaymentCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------------- 2. TAB CONTENT: PLAYER IDS QUEUE ---------------- */}
      {activeTab === "player_ids" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-[#8E8E93]">
              Pending Athlete Verifications ({playerReviews.length})
            </span>
            <span className="font-mono text-xs text-emerald-400">
              {playerReviews.filter((p) => p.status === "verified").length} Approved
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {playerReviews.map((player) => {
              const isPending = player.status === "pending"
              const isVerified = player.status === "verified"
              const isRejected = player.status === "rejected"

              return (
                <div
                  key={player.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition ${
                    isPending
                      ? "border-[#A60E13]/40 bg-[#0A0A0A]"
                      : isVerified
                      ? "border-emerald-500/30 bg-[#0A0A0A]"
                      : "border-[#1F1F24] bg-[#0A0A0A] opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#1C1C1E]">
                      <img
                        src={player.avatarUrl}
                        alt={player.playerName}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 rounded-tl-md bg-[#A60E13] px-1 font-mono text-[9px] font-bold text-white">
                        #{player.jerseyNumber}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-base text-white">
                          {player.playerName}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                            isPending
                              ? "bg-amber-950/60 border border-amber-500/40 text-amber-400"
                              : isVerified
                              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                              : "bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13]"
                          }`}
                        >
                          {player.status}
                        </span>
                      </div>

                      <p className="font-mono text-xs text-[#8E8E93]">
                        {player.position} · <strong className="text-white font-medium">{player.teamName}</strong> ({player.university})
                      </p>

                      <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-[#8E8E93]">
                        <span>Academic ID: <span className="text-white">{player.studentAcademicId}</span></span>
                        <span>·</span>
                        <span>National ID: <span className="text-white">{player.nationalIdNumber}</span></span>
                      </div>

                      {player.rejectionReason && (
                        <p className="mt-1 font-mono text-[10px] text-[#A60E13]">
                          ⚠️ Rejected: {player.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedPlayer(player)}
                      className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#A60E13] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer active:scale-95 shadow-md shadow-[#A60E13]/30"
                    >
                      <span>🔍 Inspect &amp; Accredit ID</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ---------------- 3. TAB CONTENT: TEAM ENTRY FEES DESK ---------------- */}
      {activeTab === "team_fees" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-[#8E8E93]">
              Enrolled Team Payment Proofs ({teamPayments.length})
            </span>
            <span className="font-mono text-xs text-emerald-400">
              {teamPayments.filter((p) => p.status === "paid").length} Teams Confirmed Paid
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {teamPayments.map((payment) => {
              const isPaid = payment.status === "paid"
              const isPending = payment.status === "pending"
              const isRejected = payment.status === "rejected"

              return (
                <div
                  key={payment.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition ${
                    isPending
                      ? "border-[#A60E13]/40 bg-[#0A0A0A]"
                      : isPaid
                      ? "border-emerald-500/30 bg-[#0A0A0A]"
                      : "border-[#1F1F24] bg-[#0A0A0A] opacity-70"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-base text-white">
                        {payment.teamName}
                      </h3>
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                          isPaid
                            ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                            : isPending
                            ? "bg-amber-950/60 border border-amber-500/40 text-amber-400"
                            : "bg-[#A60E13]/20 border border-[#A60E13]/50 text-[#A60E13]"
                        }`}
                      >
                        {payment.status === "paid" ? "✓ Paid & Verified" : payment.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[#8E8E93]">
                      {payment.university} · {payment.tournamentTitle}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3 font-mono text-xs">
                      <span className="text-emerald-400 font-bold">
                        {payment.amountEgp.toLocaleString()} EGP
                      </span>
                      <span className="text-[#8E8E93]">via {payment.method}</span>
                      <span className="text-[#8E8E93]">Ref: <strong className="text-white">{payment.referenceCode}</strong></span>
                      <span className="text-[#8E8E93]">
                        Team Clearance: <strong className="text-white">{payment.rosterVerifiedCount}/{payment.rosterCount}</strong>
                      </span>
                    </div>

                    {payment.rejectionReason && (
                      <p className="mt-1 font-mono text-[10px] text-[#A60E13]">
                        ⚠️ Rejected: {payment.rejectionReason}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment(payment)}
                      className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold text-white hover:border-[#A60E13] transition cursor-pointer active:scale-95"
                    >
                      <span>🧾 Review Payment Voucher</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Review Modals */}
      <IdCardReviewModal
        player={selectedPlayer}
        isOpen={Boolean(selectedPlayer)}
        onClose={() => setSelectedPlayer(null)}
        onResolve={onResolvePlayer}
      />

      <PaymentProofModal
        payment={selectedPayment}
        isOpen={Boolean(selectedPayment)}
        onClose={() => setSelectedPayment(null)}
        onResolve={onResolvePayment}
      />
    </div>
  )
}
