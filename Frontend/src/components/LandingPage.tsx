import { useState } from "react"
import Logo from "./Logo"
import TournamentCard from "./TournamentCard"
import LiveMatchModal from "./LiveMatchModal"
import TournamentHubModal from "./TournamentHubModal"
import ContactSection from "./ContactSection"
import { scrollToElement } from "../utils/formatters"
import { TOURNAMENTS, CORPORATE_SPONSORS } from "../utils/constants"
import type { TournamentEvent, EventStatusTab } from "../types/tournament"

interface LandingPageProps {
  onEnterApp: () => void
  onSignUpAthlete: () => void
  onOpenFanHub?: (tournamentId?: string, matchId?: string) => void
  onOpenOrganizerPortal?: () => void
}

export default function LandingPage({
  onEnterApp,
  onSignUpAthlete,
  onOpenFanHub,
  onOpenOrganizerPortal,
}: LandingPageProps) {
  const [statusTab, setStatusTab] = useState<EventStatusTab>("upcoming")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Modals for public viewing
  const [activeModal, setActiveModal] =
    useState<"live_match" | "tournament_hub" | null>(null)
  const [selectedTournament, setSelectedTournament] =
    useState<TournamentEvent | null>(null)

  // Featured tournament for hero: current/ongoing if available, otherwise upcoming
  const featuredTournament =
    TOURNAMENTS.find((t) => t.statusCategory === "live") ||
    TOURNAMENTS.find((t) => t.statusCategory === "upcoming") ||
    TOURNAMENTS[0]

  const filteredEvents = TOURNAMENTS.filter(
    (e) => e.statusCategory === statusTab,
  )

  function openTournamentHub(event: TournamentEvent) {
    if (onOpenFanHub) {
      onOpenFanHub(event.id)
      return
    }
    setSelectedTournament(event)
    setActiveModal("tournament_hub")
  }

  function handleNavClick(sectionId: string) {
    setMobileMenuOpen(false)
    scrollToElement(sectionId)
  }

  return (
    <div className="min-h-screen w-full bg-[#000000] font-sans text-white selection:bg-[#A60E13] selection:text-white">
      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F24] bg-[#000000]/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8 sm:py-4">
          {/* Logo: Complete wordmark FNCTN in White clean sans-serif */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 text-left cursor-pointer min-h-[44px]"
            aria-label="FNCTN Home"
          >
            <Logo size="text-2xl sm:text-3xl" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="text-sm font-medium text-[#8E8E93] transition hover:text-white cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("events")}
              className="text-sm font-medium text-[#8E8E93] transition hover:text-white cursor-pointer"
            >
              Upcoming Events &amp; Fan Zone
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("who-are-we")}
              className="text-sm font-medium text-[#8E8E93] transition hover:text-white cursor-pointer"
            >
              Who Are We
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("participate")}
              className="text-sm font-medium text-[#8E8E93] transition hover:text-white cursor-pointer"
            >
              Participate
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="text-sm font-medium text-[#8E8E93] transition hover:text-white cursor-pointer"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => onOpenFanHub?.()}
              className="flex items-center gap-1.5 rounded-lg border border-[#A60E13]/50 bg-[#A60E13]/10 px-3 py-1 text-xs font-semibold uppercase text-white hover:bg-[#A60E13] transition cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-pulse" />
              <span>Fan Hub</span>
            </button>
          </nav>

          {/* Action CTA: Only the single button with text 'Athlete Sign Up' in brand red #A60E13 */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onSignUpAthlete}
              className="flex min-h-[40px] items-center gap-2 rounded-xl bg-[#A60E13] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
            >
              <span>Athlete Sign Up</span>
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

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1F1F24] bg-[#0A0A0A] text-[#8E8E93] md:hidden cursor-pointer active:scale-95 transition hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-[#1F1F24] bg-[#000000]/98 px-5 py-6 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleNavClick("home")}
                className="flex min-h-[44px] items-center text-left text-base font-semibold text-white hover:text-[#A60E13] cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("events")}
                className="flex min-h-[44px] items-center text-left text-base font-semibold text-white hover:text-[#A60E13] cursor-pointer"
              >
                Upcoming Events &amp; Fan Zone
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("who-are-we")}
                className="flex min-h-[44px] items-center text-left text-base font-semibold text-white hover:text-[#A60E13] cursor-pointer"
              >
                Who Are We
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("participate")}
                className="flex min-h-[44px] items-center text-left text-base font-semibold text-white hover:text-[#A60E13] cursor-pointer"
              >
                Participate
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="flex min-h-[44px] items-center text-left text-base font-semibold text-white hover:text-[#A60E13] cursor-pointer"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenFanHub?.()
                }}
                className="flex min-h-[44px] items-center gap-2 text-left text-base font-semibold text-white cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-[#A60E13] animate-pulse" />
                <span>Fan Hub (Live &amp; Tickets)</span>
              </button>

              <div className="mt-4 border-t border-[#1F1F24] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onSignUpAthlete()
                  }}
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#A60E13] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#A60E13]/30 cursor-pointer active:scale-[0.99] hover:bg-[#BF1218]"
                >
                  <span>Athlete Sign Up</span>
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
            </div>
          </div>
        )}
      </header>

      {/* ---------------- SECTION A: HOME (HERO) ---------------- */}
      <section
        id="home"
        className="relative min-h-[80vh] sm:min-h-[85vh] overflow-hidden border-b border-[#1F1F24] bg-[#000000]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/stadium_hero.jpg"
            alt="Futuristic floodlit university tournament stadium"
            className="h-full w-full object-cover object-center opacity-30 sm:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {/* Collegiate Platform Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A60E13]/40 bg-[#A60E13]/15 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#A60E13] shrink-0" />
                <span className="-ml-4 h-2 w-2 rounded-full bg-[#A60E13] shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white">
                  Egyptian Collegiate Sports Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 sm:mt-6 font-sans font-black text-3xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                WELCOME TO <br />
                <span className="text-[#A60E13]">FNCTN</span> SPORTS. <br />
                COMPETE. SCOUT. WIN.
              </h1>

              <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base sm:leading-relaxed lg:text-lg font-normal">
                The premier digital home for Egyptian university sports
                tournaments. Follow live collegiate matches, track tournament
                fixtures and fan zones, and discover university athletic talent
                scouted for the pros.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onSignUpAthlete}
                  className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[#A60E13] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#BF1218] active:scale-95 shadow-xl shadow-[#A60E13]/30 cursor-pointer"
                >
                  <span>Get Started — Athlete Sign Up</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenFanHub ? onOpenFanHub() : handleNavClick("events")}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#A60E13]/50 bg-[#A60E13]/10 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-[#A60E13] cursor-pointer active:scale-95"
                >
                  <span>Follow Live Matches (Fan Hub)</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-ping" />
                </button>
              </div>

              {/* Quick Tournament Status Indicator */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#8E8E93]">
                <span className="font-mono text-[#A60E13] font-bold">
                  {featuredTournament.statusCategory === "live"
                    ? "🔴 Active Tournament"
                    : "📅 Next Upcoming Tournament"}
                </span>
                <span>·</span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenFanHub
                      ? onOpenFanHub(featuredTournament.id)
                      : openTournamentHub(featuredTournament)
                  }
                  className="font-mono text-white underline decoration-[#A60E13] hover:text-[#A60E13] cursor-pointer min-h-[36px] flex items-center"
                >
                  {featuredTournament.title} →
                </button>
              </div>
            </div>

            {/* Hero Current / Upcoming Tournament Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1F1F24] bg-[#0A0A0A]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-[#1F1F24] pb-3 sm:pb-3.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#A60E13]">
                    {featuredTournament.statusCategory === "live" ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-[#A60E13] animate-pulse" />
                        <span>Current Tournament · Active Now</span>
                      </>
                    ) : (
                      <>
                        <span>📅 Next Upcoming Tournament</span>
                      </>
                    )}
                  </span>
                  <span className="rounded bg-[#000000] border border-[#1F1F24] px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase">
                    {featuredTournament.sport}
                  </span>
                </div>

                {/* Tournament Image Banner */}
                <div className="relative mt-3.5 h-36 w-full overflow-hidden rounded-xl bg-[#000000]">
                  <img
                    src={featuredTournament.image}
                    alt={featuredTournament.title}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                  {featuredTournament.prize && (
                    <div className="absolute bottom-2 left-2 rounded-md bg-[#000000]/80 border border-[#A60E13]/40 px-2 py-0.5 font-mono text-[11px] font-bold text-white backdrop-blur-md">
                      🏆 Prize: {featuredTournament.prize}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 rounded-md bg-[#000000]/80 border border-[#1F1F24] px-2 py-0.5 font-mono text-[10px] text-[#8E8E93] backdrop-blur-md">
                    {featuredTournament.teamsCount}
                  </div>
                </div>

                {/* Tournament Title & Info */}
                <div className="mt-3.5">
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-white">
                    {featuredTournament.title}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-[#8E8E93] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>📅</span>
                      <span>{featuredTournament.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>📍</span>
                      <span className="truncate">{featuredTournament.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Sponsor Showcase Section on Card Body (Similar to Fan Services) */}
                <div className="mt-3.5 border-t border-[#1F1F24] pt-2.5">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8E8E93]">
                    Official Tournament Sponsor:
                  </p>
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5">
                    <span className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#A60E13]/30 font-mono text-[10px] font-bold text-white shrink-0 shadow-sm">
                      {featuredTournament.sponsor.badge}
                    </span>
                    <div className="min-w-0 flex-1 truncate">
                      <span className="block font-semibold text-white text-xs truncate">
                        {featuredTournament.sponsor.name}
                      </span>
                      <span className="block font-mono text-[10px] text-[#8E8E93] truncate">
                        {featuredTournament.sponsor.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fan Zone Perks */}
                <div className="mt-3 rounded-xl border border-[#1F1F24] bg-[#000000] p-2.5 text-xs">
                  <p className="mb-1 font-mono text-[9px] uppercase font-bold text-[#A60E13]">
                    Fan Zone Perks Active:
                  </p>
                  <p className="text-[11px] text-white">
                    🍔 Food Trucks · 🎧 DJ Sets · 🎁 Energy Giveaways
                  </p>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() =>
                    onOpenFanHub
                      ? onOpenFanHub(featuredTournament.id)
                      : openTournamentHub(featuredTournament)
                  }
                  className="mt-3.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#A60E13] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#BF1218] active:scale-95 shadow-md shadow-[#A60E13]/30 cursor-pointer"
                >
                  <span>Explore Tournament Hub</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sponsor Showcase Strip */}
          <div className="mt-10 sm:mt-14 border-t border-[#1F1F24] pt-6 sm:pt-8">
            <p className="mb-4 sm:mb-5 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">
              Official Collegiate Tournament Sponsors &amp; Brand Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
              {CORPORATE_SPONSORS.map((s) => (
                <div key={s.name} className="flex flex-col items-center">
                  <span className="font-mono text-xs sm:text-base font-extrabold tracking-widest text-white transition hover:text-[#A60E13]">
                    {s.logoText}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-[#8E8E93]">
                    {s.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION B: UPCOMING EVENTS & FAN ZONE ---------------- */}
      <section
        id="events"
        className="border-b border-[#1F1F24] bg-[#000000] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
                Tournament Hub &amp; Spectator Guide
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-4xl md:text-5xl font-bold text-[#A60E13] tracking-tight">
                UPCOMING EVENTS &amp; FAN ZONE
              </h2>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                Tap any tournament card to view the public Tournament Hub,
                complete rules, participating teams, and fan zone amenities.
              </p>
            </div>

            {/* Required 3 Filters: Live, Upcoming, Past — Full width grid on mobile */}
            <div
              role="tablist"
              className="mt-2 grid grid-cols-3 w-full sm:w-auto rounded-xl border border-[#1F1F24] bg-[#0A0A0A] p-1 md:mt-0"
            >
              {(["live", "upcoming", "past"] as EventStatusTab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={statusTab === tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg px-3 sm:px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 ${
                    statusTab === tab
                      ? "bg-[#A60E13] text-white shadow-md shadow-[#A60E13]/30"
                      : "text-[#8E8E93] hover:text-white"
                  }`}
                >
                  {tab === "live" && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tournament Cards Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((evt) => (
              <TournamentCard
                key={evt.id}
                event={evt}
                onSelect={openTournamentHub}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION C: WHO ARE WE ---------------- */}
      <section
        id="who-are-we"
        className="border-b border-[#1F1F24] bg-[#000000] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
                About FNCTN
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-bold text-[#A60E13] tracking-tight">
                OUR MISSION FOR EGYPTIAN UNIVERSITY SPORTS
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-white/80 font-normal">
                FNCTN was founded with a single mission: to professionalize,
                elevate, and celebrate collegiate athletics across Egypt.
                Thousands of gifted student-athletes compete across campuses
                every week without centralized tracking, televised broadcast, or
                scouting access.
              </p>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white/80 font-normal">
                We bridge this gap with an all-in-one digital tournament engine.
                We empower universities with institutional ranking points,
                furnish fans with real-time match fixtures and vibrant fan
                zones, and provide student-athletes with verified stats seen
                directly by professional football, basketball, and padel scouts.
              </p>

              {/* 3 Pillars */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-xl border border-[#1F1F24] bg-[#0A0A0A] p-4">
                  <p className="font-sans text-2xl font-bold text-[#A60E13]">16+</p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    Universities
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">
                    Unified league standings
                  </p>
                </div>
                <div className="rounded-xl border border-[#1F1F24] bg-[#0A0A0A] p-4">
                  <p className="font-sans text-2xl font-bold text-[#A60E13]">
                    2,500+
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white">Athletes</p>
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">
                    Verified competition IDs
                  </p>
                </div>
                <div className="rounded-xl border border-[#1F1F24] bg-[#0A0A0A] p-4">
                  <p className="font-sans text-2xl font-bold text-[#A60E13]">45+</p>
                  <p className="mt-1 text-xs font-semibold text-white">Scouts</p>
                  <p className="mt-0.5 text-[11px] text-[#8E8E93]">
                    Direct scouting trials
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#A60E13]/40 bg-[#0A0A0A] p-5 sm:p-6">
                  <h3 className="font-sans font-semibold text-xl sm:text-2xl text-white">
                    Why University Athletics Matter
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
                    In premier sporting nations, collegiate leagues are the
                    bedrock of national teams and pro drafts. FNCTN is
                    establishing that exact pipeline right here in Egypt,
                    combining academic prestige with championship athletics.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    Verified Digital Scorekeeping
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
                    Pitch-side tournament officials utilize official controllers
                    to log points, fouls, and match outcomes in real time,
                    synchronizing directly with our public fan portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION D: PARTICIPATE (4 Steps) ---------------- */}
      <section
        id="participate"
        className="border-b border-[#1F1F24] bg-[#000000] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E8E93]">
              Participate
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl md:text-5xl font-bold text-[#A60E13] tracking-tight">
              FOUR SIMPLE STEPS TO COMPETE
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
              Follow these simple steps to claim your spot in upcoming
              university tournaments, get your player pass verified, and take
              the field.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {/* Step 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 transition hover:border-[#A60E13]/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#A60E13] font-sans text-base sm:text-lg font-black text-white shadow-sm">
                  01
                </span>
                <h3 className="mt-4 sm:mt-5 font-sans font-semibold text-xl sm:text-2xl text-white">
                  Create Account
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80 font-normal">
                  Register your student athlete account with your name,
                  university email, and password.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-[#A60E13] font-bold">
                ✓ Takes under 1 minute
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 transition hover:border-[#A60E13]/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#A60E13] font-sans text-base sm:text-lg font-black text-white shadow-sm">
                  02
                </span>
                <h3 className="mt-4 sm:mt-5 font-sans font-semibold text-xl sm:text-2xl text-white">
                  Upload ID
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80 font-normal">
                  Upload a photo of your official University Student ID and
                  National ID for tournament verification.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-[#A60E13] font-bold">
                ✓ Eligibility guaranteed
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 transition hover:border-[#A60E13]/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#A60E13] font-sans text-base sm:text-lg font-black text-white shadow-sm">
                  03
                </span>
                <h3 className="mt-4 sm:mt-5 font-sans font-semibold text-xl sm:text-2xl text-white">
                  Form Team
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80 font-normal">
                  Create a new university roster or join your existing campus
                  team instantly with a 6-character code.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-[#A60E13] font-bold">
                ✓ 6-Character Invite Code
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-[#1F1F24] bg-[#0A0A0A] p-5 sm:p-6 transition hover:border-[#A60E13]/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#A60E13] font-sans text-base sm:text-lg font-black text-white shadow-sm">
                  04
                </span>
                <h3 className="mt-4 sm:mt-5 font-sans font-semibold text-xl sm:text-2xl text-white">
                  Play
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/80 font-normal">
                  Compete in official stadium fixtures, log your stats, and
                  build your verified scouting portfolio.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-[#A60E13] font-bold">
                ✓ Live on FNCTN Arena
              </div>
            </div>
          </div>

          {/* Large Sign Up Now Interaction Button */}
          <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-4 text-center">
            <button
              type="button"
              onClick={onSignUpAthlete}
              className="flex min-h-[52px] w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-[#A60E13] px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#BF1218] active:scale-95 shadow-2xl shadow-[#A60E13]/30 cursor-pointer"
            >
              <span>Sign Up Now</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="font-mono text-xs text-[#8E8E93]">
              Already have an athlete account?{" "}
              <button
                type="button"
                onClick={onEnterApp}
                className="font-semibold text-white underline decoration-[#A60E13] decoration-2 underline-offset-4 hover:text-[#A60E13] cursor-pointer py-1 inline-block"
              >
                Log In to Athlete Dashboard
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION E: CONTACT US ---------------- */}
      <ContactSection />

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-[#1F1F24] bg-[#000000] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Logo size="text-2xl sm:text-3xl" />
              <span className="border-l border-[#1F1F24] pl-3 text-xs text-[#8E8E93]">
                Egyptian University Sports Network
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-[#8E8E93]">
              <button
                type="button"
                onClick={() => handleNavClick("home")}
                className="hover:text-white cursor-pointer min-h-[40px] flex items-center"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("events")}
                className="hover:text-white cursor-pointer min-h-[40px] flex items-center"
              >
                Events &amp; Fan Zone
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("who-are-we")}
                className="hover:text-white cursor-pointer min-h-[40px] flex items-center"
              >
                Who Are We
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("participate")}
                className="hover:text-white cursor-pointer min-h-[40px] flex items-center"
              >
                Participate
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="hover:text-white cursor-pointer min-h-[40px] flex items-center"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={onEnterApp}
                className="text-white hover:text-[#A60E13] underline decoration-[#A60E13] underline-offset-4 cursor-pointer min-h-[40px] flex items-center font-bold"
              >
                Live App Portal
              </button>
              {onOpenOrganizerPortal && (
                <button
                  type="button"
                  onClick={onOpenOrganizerPortal}
                  className="font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] cursor-pointer min-h-[40px] flex items-center transition"
                >
                  ⚽ Committee Pitch Tools
                </button>
              )}
            </div>

            <div className="font-mono text-xs text-[#8E8E93]/70 text-center">
              &copy; {new Date().getFullYear()} FNCTN. Public Fan &amp;
              Tournament Site.
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- PUBLIC MODALS ---------------- */}
      <LiveMatchModal
        isOpen={activeModal === "live_match"}
        onClose={() => setActiveModal(null)}
        onSignUpAthlete={onSignUpAthlete}
      />

      <TournamentHubModal
        isOpen={activeModal === "tournament_hub"}
        event={selectedTournament}
        onClose={() => setActiveModal(null)}
        onSignUpAthlete={onSignUpAthlete}
      />
    </div>
  )
}
