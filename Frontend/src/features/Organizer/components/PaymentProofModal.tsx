import { useState } from "react"
import type { TeamPaymentItem, PaymentReviewStatus } from "../../../types/organizer"

interface PaymentProofModalProps {
  payment: TeamPaymentItem | null
  isOpen: boolean
  onClose: () => void
  onResolve: (paymentId: string, status: PaymentReviewStatus, reason?: string) => void
}

export default function PaymentProofModal({
  payment,
  isOpen,
  onClose,
  onResolve,
}: PaymentProofModalProps) {
  const [showRejectPrompt, setShowRejectPrompt] = useState(false)
  const [rejectReason, setRejectReason] = useState("Transfer reference code does not match bank statements")

  if (!isOpen || !payment) return null

  function handleMarkPaid() {
    onResolve(payment!.id, "paid")
    setShowRejectPrompt(false)
    onClose()
  }

  function handleConfirmReject() {
    onResolve(payment!.id, "rejected", rejectReason)
    setShowRejectPrompt(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setShowRejectPrompt(false)
            onClose()
          }}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#1C1C1E] text-sm text-[#8E8E93] hover:text-white transition cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#1F1F24] pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A60E13]">
            Tournament Committee Payment Desk
          </span>
          <h2 className="mt-1 font-sans font-bold text-xl sm:text-2xl text-white">
            {payment.teamName}
          </h2>
          <p className="font-mono text-xs text-[#8E8E93]">
            {payment.university} · {payment.tournamentTitle}
          </p>
        </div>

        {/* Financial Details Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 rounded-2xl border border-[#1F1F24] bg-[#000000] p-3 text-xs">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
              Fee Required
            </span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {payment.amountEgp.toLocaleString()} EGP
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
              Payment Method
            </span>
            <span className="font-mono font-bold text-white">
              {payment.method}
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase text-[#8E8E93] block">
              Reference Code
            </span>
            <span className="font-mono font-bold text-[#A60E13]">
              {payment.referenceCode}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-3 pt-2 border-t border-[#1F1F24] flex items-center justify-between text-[11px]">
            <span className="text-[#8E8E93]">Team Accreditation Status:</span>
            <span className="font-mono font-bold text-white">
              {payment.rosterVerifiedCount} / {payment.rosterCount} IDs Verified
            </span>
          </div>
        </div>

        {/* Receipt Proof Slip Image */}
        <div className="mt-4">
          <label className="block font-mono text-xs text-[#8E8E93] uppercase mb-1.5">
            Submitted Transfer Voucher / Receipt
          </label>
          <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-[#1F1F24] bg-[#000000] flex items-center justify-center p-2">
            <img
              src={payment.receiptImageUrl}
              alt="Payment receipt proof"
              className="h-full w-full object-contain rounded-xl"
            />
            <span className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-[10px] text-white border border-white/10 backdrop-blur-sm">
              Submitted: {payment.submittedAt}
            </span>
          </div>
        </div>

        {/* Rejection Prompt (Conditional) */}
        {showRejectPrompt && (
          <div className="mt-4 rounded-2xl border border-[#A60E13]/50 bg-[#A60E13]/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#A60E13] uppercase">
                Rejection Reason
              </span>
              <button
                type="button"
                onClick={() => setShowRejectPrompt(false)}
                className="text-xs text-[#8E8E93] hover:text-white"
              >
                Cancel
              </button>
            </div>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3 py-2 text-xs text-white focus:border-[#A60E13] focus:outline-none"
            >
              <option value="Transfer reference code does not match bank statements">
                Transfer reference code does not match bank statements
              </option>
              <option value="Incorrect transfer amount received">
                Incorrect transfer amount received
              </option>
              <option value="Official university stamp missing from deposit receipt">
                Official university stamp missing from deposit receipt
              </option>
              <option value="Duplicate voucher submission">
                Duplicate voucher submission
              </option>
            </select>

            <button
              type="button"
              onClick={handleConfirmReject}
              className="w-full min-h-[44px] rounded-xl bg-[#A60E13] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#BF1218] transition cursor-pointer shadow-md shadow-[#A60E13]/30"
            >
              Confirm Rejection &amp; Notify Captain
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        {!showRejectPrompt && (
          <div className="mt-5 grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRejectPrompt(true)}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#1F1F24] bg-[#1C1C1E] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#8E8E93] hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer active:scale-95"
            >
              <span>✕</span> Reject Receipt
            </button>

            <button
              type="button"
              onClick={handleMarkPaid}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition cursor-pointer active:scale-95 shadow-md shadow-emerald-900/30"
            >
              <span>✓</span> Mark as Paid
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
