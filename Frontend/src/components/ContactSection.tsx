import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    category: "Athlete / Team Registration",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }
    setSubmitted(true)
  }

  function handleReset() {
    setFormData({
      fullName: "",
      email: "",
      university: "",
      category: "Athlete / Team Registration",
      message: "",
    })
    setSubmitted(false)
  }

  return (
    <section
      id="contact"
      className="border-b border-[#1F1F24] bg-[#000000] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
            Inquiries &amp; Partnerships
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-4xl md:text-5xl font-bold text-[#A60E13] tracking-tight">
            CONTACT FNCTN
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
            Have questions regarding collegiate tournament registration, brand sponsorships,
            spectator passes, or university delegation clearance? Get in touch with our operations desk.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-7 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase font-bold text-[#A60E13]">
                Official Support Channels
              </span>
              <h3 className="mt-1 font-sans font-semibold text-lg sm:text-xl text-white">
                Campus Operations Desk
              </h3>

              <div className="mt-5 space-y-4 text-xs">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#000000] border border-[#1F1F24] text-sm text-[#A60E13]">
                    ✉️
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] text-[#8E8E93] uppercase">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:support@fnctn.sports.eg"
                      className="font-semibold text-white hover:text-[#A60E13] transition"
                    >
                      support@fnctn.sports.eg
                    </a>
                  </div>
                </div>

                {/* Hotline / WhatsApp */}
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#000000] border border-[#1F1F24] text-sm text-[#A60E13]">
                    📞
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] text-[#8E8E93] uppercase">
                      Hotline &amp; WhatsApp Desk
                    </span>
                    <a
                      href="https://wa.me/201005549922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-[#A60E13] transition font-mono"
                    >
                      +20 (100) 554-9922
                    </a>
                  </div>
                </div>

                {/* Venue Headquarters */}
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#000000] border border-[#1F1F24] text-sm text-[#A60E13]">
                    📍
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] text-[#8E8E93] uppercase">
                      Tournament Headquarters
                    </span>
                    <p className="font-semibold text-white mt-0.5 leading-snug">
                      Cairo International Stadium Sports Center &amp; New Cairo Campus Center, Cairo, Egypt
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#000000] border border-[#1F1F24] text-sm text-[#A60E13]">
                    🕒
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] text-[#8E8E93] uppercase">
                      Working Hours
                    </span>
                    <p className="text-white mt-0.5">
                      Sunday – Thursday: 9:00 AM – 6:00 PM <br />
                      <span className="font-mono text-[11px] text-[#A60E13] font-bold">
                        Matchday operations desk active 24/7
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accreditation Badge */}
            <div className="rounded-2xl border border-[#A60E13]/40 bg-[#0A0A0A] p-4 text-xs">
              <span className="font-semibold text-white block">
                ⚡ Egyptian University Sports Federation (EUSF) Partner
              </span>
              <p className="text-[11px] text-white/80 mt-1 leading-relaxed font-normal">
                Official sports technology platform managing tournament verification, pitch-side match control, and athlete eligibility across Egypt.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {!submitted ? (
              <div>
                <h3 className="font-sans font-semibold text-xl sm:text-2xl text-white">
                  Send Us a Message
                </h3>
                <p className="text-xs text-white/70 mt-1 font-normal">
                  Fill in your details below and our tournament coordination committee will respond within 72 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase text-[#8E8E93] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Omar Hassan"
                        className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase text-[#8E8E93] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@university.edu.eg"
                        className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* University / Organization */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase text-[#8E8E93] mb-1">
                        University or Organization
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) =>
                          setFormData({ ...formData, university: e.target.value })
                        }
                        placeholder="e.g. Cairo University / AUC / Sponsor"
                        className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
                      />
                    </div>

                    {/* Inquiry Category */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase text-[#8E8E93] mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-base sm:text-xs text-white focus:border-[#A60E13] focus:outline-none"
                      >
                        <option value="Athlete / Team Registration">
                          Athlete / Team Registration
                        </option>
                        <option value="Sponsorship & Brand Booths">
                          Sponsorship &amp; Brand Booths
                        </option>
                        <option value="Spectator Passes & Ticketing">
                          Spectator Passes &amp; Ticketing
                        </option>
                        <option value="Media & Press Accreditation">
                          Media &amp; Press Accreditation
                        </option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase text-[#8E8E93] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please describe your question, proposed partnership, or tournament inquiry..."
                      className="w-full rounded-xl border border-[#1F1F24] bg-[#000000] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-[#8E8E93]/60 focus:border-[#A60E13] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-2 flex items-center justify-between border-t border-[#1F1F24] pt-3">
                    <span className="text-[11px] font-mono text-[#8E8E93]">
                      Response within 72 hours guaranteed.
                    </span>

                    <button
                      type="submit"
                      className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#A60E13] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
                    >
                      <span>Send Message</span>
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
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A60E13]/20 text-[#A60E13] text-3xl border border-[#A60E13]/50 mb-3 shadow-lg">
                  ✓
                </div>
                <h3 className="font-sans font-semibold text-2xl text-white">Message Dispatched!</h3>
                <p className="mt-2 text-xs text-white/80 max-w-md leading-relaxed font-normal">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding{" "}
                  <strong>{formData.category}</strong> has been logged with the FNCTN committee desk. A representative will contact you at <strong>{formData.email}</strong> shortly.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 rounded-xl border border-[#1F1F24] bg-[#000000] px-5 py-2.5 font-mono text-xs font-bold uppercase text-white hover:border-[#A60E13] hover:text-[#A60E13] transition cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
