import type { FanHubTournament } from "../../../types/fanhub"

interface OverviewTabProps {
  tournament: FanHubTournament
}

export default function OverviewTab({ tournament }: OverviewTabProps) {
  const isConcluded = tournament.statusCategory === "past"

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* ---------------- 1. SPECTATOR ACCESS & ADMISSION INFO ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
              🎟️ Spectator Access
            </div>
            <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
              Spectator Admission &amp; Guidelines
            </h3>
            <p className="text-xs text-mute">
              Admission is open to university students and supporters with valid university ID.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-ink px-4 py-2 font-mono text-xs text-white">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Campus Entry · Gate Verification</span>
          </div>
        </div>

        {/* Admission Information Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournament.tickets.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-line/80 bg-ink/70 p-4 transition hover:border-volt/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm sm:text-base">
                    {t.tier}
                  </span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-emerald-300">
                    {isConcluded ? "Concluded" : "Open Seating"}
                  </span>
                </div>

                <p className="mt-1 text-xs text-mute">{t.description}</p>

                <div className="mt-3">
                  <span className="font-mono text-2xl font-black text-volt">
                    {t.price === 0 ? "Free Entry" : `EGP ${t.price}`}
                  </span>
                  {t.price > 0 && (
                    <span className="font-mono text-[10px] text-mute ml-1">/ person</span>
                  )}
                </div>

                {/* Perks list */}
                <ul className="mt-3 space-y-1.5 text-[11px] text-white/80 border-t border-line/60 pt-2.5">
                  {t.perks.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-volt text-xs">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-xl border border-line/60 bg-card py-2 px-3 text-center font-mono text-[11px] text-mute">
                Present Student ID at pitch entrance
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 2. VENUE GUIDE & INTERACTIVE MAP ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
              📍 Location &amp; Logistics
            </div>
            <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
              Venue Guide &amp; Directions
            </h3>
            <p className="text-xs text-mute">{tournament.venue.name}</p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              tournament.venue.address,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-line bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-volt hover:text-volt transition cursor-pointer"
          >
            <span>Open in Google Maps ↗</span>
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Logistics specs */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="rounded-xl border border-line/70 bg-ink/70 p-3.5 text-xs">
              <span className="block font-mono text-[10px] uppercase text-volt">Address:</span>
              <p className="font-bold text-white mt-0.5">{tournament.venue.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line/70 bg-ink/70 p-3 text-xs">
                <span className="block font-mono text-[10px] uppercase text-mute">Capacity:</span>
                <p className="font-bold text-white mt-0.5">{tournament.venue.capacity}</p>
              </div>
              <div className="rounded-xl border border-line/70 bg-ink/70 p-3 text-xs">
                <span className="block font-mono text-[10px] uppercase text-mute">City:</span>
                <p className="font-bold text-white mt-0.5">{tournament.venue.city}</p>
              </div>
            </div>

            <div className="rounded-xl border border-line/70 bg-ink/70 p-3.5 text-xs">
              <span className="block font-mono text-[10px] uppercase text-mute">Gate Access:</span>
              <p className="text-white mt-0.5">{tournament.venue.gateInfo}</p>
            </div>

            <div className="rounded-xl border border-line/70 bg-ink/70 p-3.5 text-xs">
              <span className="block font-mono text-[10px] uppercase text-mute">Parking Facility:</span>
              <p className="text-white mt-0.5">{tournament.venue.parkingInfo}</p>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-2xl border border-line bg-ink min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=500&fit=crop&auto=format"
              alt="Stadium satellite map location"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

            {/* Stadium Pin Marker */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-volt text-white text-xl shadow-2xl shadow-volt/50 animate-bounce">
                📍
              </div>
              <div className="mt-2 rounded-xl border border-line bg-ink/95 px-3 py-1.5 backdrop-blur-md">
                <span className="font-bold text-white text-xs block">
                  {tournament.venue.name}
                </span>
                <span className="font-mono text-[10px] text-volt">
                  GPS: {tournament.venue.coordinates.lat.toFixed(4)}, {tournament.venue.coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. FAN SERVICES LIST ---------------- */}
      <section className="rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md">
        <div className="border-b border-line/80 pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-volt">
            🎪 Fan Services &amp; Amenities
          </div>
          <h3 className="display mt-1.5 text-xl sm:text-2xl text-white">
            Spectator Village &amp; Perks
          </h3>
          <p className="text-xs text-mute">
            Services active and verified on match days inside the tournament grounds.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tournament.fanServices.map((fs, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-line/70 bg-ink/70 p-3.5 transition hover:border-volt/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-xl border border-line">
                {fs.icon}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{fs.label}</h4>
                {fs.description && (
                  <p className="mt-0.5 text-xs text-mute leading-relaxed">
                    {fs.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 4. ORGANIZER CONTACT & RULES ---------------- */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Organizer Desk */}
        <div className="md:col-span-6 rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-volt font-bold">
              Tournament Organizing Committee
            </span>
            <h3 className="display mt-1 text-lg sm:text-xl text-white">
              Organizer Support Desk
            </h3>
            <p className="mt-1 text-xs text-mute">
              Have questions regarding squad eligibility, accreditation, or lost passes?
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-mute font-mono">Committee:</span>
                <span className="font-bold text-white text-right max-w-[200px] truncate">
                  {tournament.organizer.committee}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-mute font-mono">Director:</span>
                <span className="font-bold text-white">{tournament.organizer.director}</span>
              </div>
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="text-mute font-mono">Hotline:</span>
                <span className="font-mono text-white">{tournament.organizer.phone}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-mute font-mono">Email:</span>
                <span className="font-mono text-volt">{tournament.organizer.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <a
              href={`https://wa.me/${tournament.organizer.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-emerald-500 transition cursor-pointer"
            >
              <span>WhatsApp Hotline</span>
            </a>
            <a
              href={`mailto:${tournament.organizer.email}`}
              className="flex min-h-[40px] items-center justify-center rounded-xl border border-line bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:border-volt hover:text-volt transition"
            >
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Tournament Regulations */}
        <div className="md:col-span-6 rounded-2xl sm:rounded-3xl border border-line bg-card/80 p-5 sm:p-7 backdrop-blur-md flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-volt font-bold">
              Official Regulations
            </span>
            <h3 className="display mt-1 text-lg sm:text-xl text-white">
              Rules &amp; Code of Conduct
            </h3>
            <p className="mt-2 text-xs text-mute leading-relaxed">
              {tournament.rulesSummary}
            </p>

            <div className="mt-4 rounded-xl border border-volt/30 bg-volt/10 p-3 text-xs">
              <span className="block font-bold text-white mb-0.5">
                ⚡ Student Spectator Courtesy Code
              </span>
              <p className="text-[11px] text-mute">
                Alcohol, fireworks, and unsportsmanlike behavior on university grounds result in immediate ejection and student disciplinary review.
              </p>
            </div>
          </div>

          <div className="mt-5 text-[11px] font-mono text-mute">
            Sanctioned under the Egyptian University Sports Federation (EUSF).
          </div>
        </div>
      </section>
    </div>
  )
}
