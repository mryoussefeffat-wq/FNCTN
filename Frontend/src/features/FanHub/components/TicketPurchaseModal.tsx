import { useState } from "react"
import type { TicketOption } from "../../../types/fanhub"

interface TicketPurchaseModalProps {
  isOpen: boolean
  tournamentTitle: string
  tickets: TicketOption[]
  selectedTicketId?: string
  onClose: () => void
}

export default function TicketPurchaseModal({
  isOpen,
  tournamentTitle,
  tickets,
  selectedTicketId,
  onClose,
}: TicketPurchaseModalProps) {
  const [activeTierId, setActiveTierId] = useState(
    selectedTicketId || (tickets[0] ? tickets[0].id : ""),
  )
  const [quantity, setQuantity] = useState(1)
  const [fanName, setFanName] = useState("")
  const [fanEmail, setFanEmail] = useState("")
  const [fanPhone, setFanPhone] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [ticketReference, setTicketReference] = useState("")

  if (!isOpen) return null

  const selectedTier = tickets.find((t) => t.id === activeTierId) || tickets[0]
  const totalPrice = selectedTier ? selectedTier.price * quantity : 0

  function handleCompleteBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!fanName.trim() || !fanEmail.trim()) return

    const randomRef = `FNCTN-${Math.floor(100000 + Math.random() * 900000)}`
    setTicketReference(randomRef)
    setIsSuccess(true)
  }

  function handleReset() {
    setIsSuccess(false)
    setQuantity(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-line bg-card p-5 sm:p-7 shadow-2xl no-scrollbar [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink text-mute transition hover:text-white cursor-pointer active:scale-95 z-10"
          aria-label="Close ticket modal"
        >
          ✕
        </button>

        {!isSuccess ? (
          <div>
            <div className="border-b border-line pb-3.5 pr-8">
              <span className="inline-block rounded-md border border-volt/40 bg-volt/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
                Official Spectator Tickets
              </span>
              <h2 className="display mt-2 text-xl sm:text-2xl text-white">
                Reserve Spectator Passes
              </h2>
              <p className="mt-1 font-mono text-xs text-mute truncate">
                {tournamentTitle}
              </p>
            </div>

            <form onSubmit={handleCompleteBooking} className="mt-5 flex flex-col gap-4">
              {/* Select Ticket Tier */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-mute mb-2">
                  Select Ticket Tier:
                </label>
                <div className="flex flex-col gap-2">
                  {tickets.map((t) => {
                    const isSelected = t.id === activeTierId
                    const isSoldOut = t.status === "sold_out"
                    return (
                      <div
                        key={t.id}
                        onClick={() => !isSoldOut && setActiveTierId(t.id)}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border p-3 transition cursor-pointer ${
                          isSelected
                            ? "border-volt bg-volt/10"
                            : isSoldOut
                              ? "border-line/40 bg-ink/40 opacity-50 cursor-not-allowed"
                              : "border-line bg-ink/70 hover:border-line/90"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {t.tier}
                            </span>
                            {t.status === "limited" && (
                              <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-yellow-300">
                                Few Seats Left
                              </span>
                            )}
                            {isSoldOut && (
                              <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-red-300">
                                Sold Out
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-mute mt-0.5">
                            {t.description}
                          </p>
                        </div>

                        <div className="text-right self-end sm:self-center font-mono">
                          <span className="text-base font-black text-volt">
                            {t.price === 0 ? "Free" : `EGP ${t.price}`}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center justify-between rounded-xl border border-line bg-ink/60 p-3">
                <span className="font-mono text-xs font-bold uppercase text-white">
                  Pass Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card font-mono text-sm font-bold text-white hover:border-volt active:scale-95 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-black text-volt w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card font-mono text-sm font-bold text-white hover:border-volt active:scale-95 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Fan Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-mute mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    placeholder="e.g. Youssef Effat"
                    className="w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-base sm:text-xs text-white placeholder-mute/60 focus:border-volt focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-bold uppercase text-mute mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={fanEmail}
                    onChange={(e) => setFanEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-base sm:text-xs text-white placeholder-mute/60 focus:border-volt focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase text-mute mb-1">
                  Mobile / WhatsApp (For Gate SMS Pass)
                </label>
                <input
                  type="tel"
                  value={fanPhone}
                  onChange={(e) => setFanPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  className="w-full rounded-xl border border-line bg-ink px-3 py-2.5 text-base sm:text-xs text-white placeholder-mute/60 focus:border-volt focus:outline-none"
                />
              </div>

              {/* Price Summary & Submit */}
              <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-mute">
                    Total Due
                  </span>
                  <span className="font-mono text-xl font-black text-volt">
                    {totalPrice === 0 ? "Free Access" : `EGP ${totalPrice}`}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={selectedTier?.status === "sold_out"}
                  className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-volt px-6 py-2.5 text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-lg shadow-volt/25 cursor-pointer disabled:opacity-50"
                >
                  <span>Confirm Reservation</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt/20 text-volt text-2xl border border-volt/50 mb-3">
              ✓
            </div>
            <h3 className="display text-2xl text-white">Tickets Confirmed!</h3>
            <p className="mt-1 text-xs text-mute">
              Your digital spectator pass has been generated. Show this reference at the gate.
            </p>

            {/* Digital Pass Card */}
            <div className="my-5 rounded-2xl border border-dashed border-volt/60 bg-ink p-5 text-left">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-xs font-bold text-volt">
                  FNCTN SPECTATOR PASS
                </span>
                <span className="font-mono text-xs text-mute font-bold">
                  {quantity}x {selectedTier?.tier}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block text-[10px] font-mono text-mute">ATTENDEE</span>
                  <span className="font-bold text-white truncate block">{fanName}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-mute">PASS REF</span>
                  <span className="font-mono font-bold text-volt">{ticketReference}</span>
                </div>
              </div>

              {/* Simulated QR Code */}
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-3 text-ink">
                <div className="h-28 w-28 bg-[repeating-conic-gradient(#000_0%_25%,#fff_0%_50%)] bg-[length:14px_14px] rounded-lg" />
                <span className="mt-2 font-mono text-[10px] font-bold tracking-widest text-ink">
                  SCAN AT GATE 3
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl bg-volt py-3 text-xs font-black uppercase text-ink hover:brightness-110 active:scale-95 cursor-pointer"
            >
              Done &amp; Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
