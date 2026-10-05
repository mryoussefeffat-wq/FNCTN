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
}

export default function LandingPage({
  onEnterApp,
  onSignUpAthlete,
  onOpenFanHub,
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
    <div className="min-h-screen w-full bg-[#07080a] font-sans text-white selection:bg-volt selection:text-ink">
      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/90 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8 sm:py-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 text-left cursor-pointer min-h-[44px]"
            aria-label="FNCTN Home"
          >
            {/* <Logo size="text-2xl sm:text-3xl" subtitle="Collegiate Arena" />           */}
            <Logo size="text-2xl sm:text-3xl" />

          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="text-sm font-medium text-mute transition hover:text-volt cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("events")}
              className="text-sm font-medium text-mute transition hover:text-volt cursor-pointer"
            >
              Upcoming Events &amp; Fan Zone
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("who-are-we")}
              className="text-sm font-medium text-mute transition hover:text-volt cursor-pointer"
            >
              Who Are We
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("participate")}
              className="text-sm font-medium text-mute transition hover:text-volt cursor-pointer"
            >
              Participate
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="text-sm font-medium text-mute transition hover:text-volt cursor-pointer"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => onOpenFanHub?.()}
              className="flex items-center gap-1.5 rounded-lg border border-volt/40 bg-volt/10 px-3 py-1 text-xs font-mono font-bold uppercase text-volt hover:bg-volt hover:text-ink transition cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
              <span>Fan Hub</span>
            </button>
          </nav>

          {/* Action CTA: Only the yellow button with text 'Athlete Sign Up' */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onSignUpAthlete}
              className="flex min-h-[40px] items-center gap-2 rounded-xl bg-volt px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-md shadow-volt/20 cursor-pointer"
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

          {/* Mobile Menu Toggle Button (Accessible touch target >= 44x44) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-mute md:hidden cursor-pointer active:scale-95 transition"
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

        {/* Mobile Dropdown Menu with smooth touch targets */}
        {mobileMenuOpen && (
          <div className="border-b border-line bg-ink/95 px-5 py-6 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleNavClick("home")}
                className="flex min-h-[44px] items-center text-left text-base font-bold text-white hover:text-volt cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("events")}
                className="flex min-h-[44px] items-center text-left text-base font-bold text-white hover:text-volt cursor-pointer"
              >
                Upcoming Events &amp; Fan Zone
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("who-are-we")}
                className="flex min-h-[44px] items-center text-left text-base font-bold text-white hover:text-volt cursor-pointer"
              >
                Who Are We
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("participate")}
                className="flex min-h-[44px] items-center text-left text-base font-bold text-white hover:text-volt cursor-pointer"
              >
                Participate
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="flex min-h-[44px] items-center text-left text-base font-bold text-white hover:text-volt cursor-pointer"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenFanHub?.()
                }}
                className="flex min-h-[44px] items-center gap-2 text-left text-base font-bold text-volt cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-volt animate-pulse" />
                <span>Fan Hub (Live &amp; Tickets)</span>
              </button>

              <div className="mt-4 border-t border-line/80 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onSignUpAthlete()
                  }}
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-volt py-3 text-center text-xs font-black uppercase tracking-wider text-ink shadow-md shadow-volt/20 cursor-pointer active:scale-[0.99]"
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
        className="relative min-h-[80vh] sm:min-h-[85vh] overflow-hidden border-b border-line"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/stadium_hero.jpg"
            alt="Futuristic floodlit university tournament stadium"
            className="h-full w-full object-cover object-center opacity-30 sm:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a] via-transparent to-[#07080a]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {/* Collegiate Platform Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/15 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-ping rounded-full bg-volt shrink-0" />
                <span className="-ml-4 h-2 w-2 rounded-full bg-volt shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-volt">
                  Egyptian Collegiate Sports Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="display mt-5 sm:mt-6 text-3xl leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                WELCOME TO <br />
                <span className="text-volt">FNCTN</span> SPORTS. <br />
                COMPETE. SCOUT. WIN.
              </h1>

              <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-mute sm:text-base sm:leading-relaxed lg:text-lg">
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
                  className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-volt px-6 py-3.5 text-xs font-black uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95 shadow-xl shadow-volt/20 cursor-pointer"
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
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-volt/50 bg-volt/10 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-volt backdrop-blur-md transition hover:bg-volt hover:text-ink cursor-pointer active:scale-95"
                >
                  <span>Follow Live Matches (Fan Hub)</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-volt animate-ping" />
                </button>
              </div>

              {/* Quick Tournament Status Indicator */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-mute">
                <span className="font-mono text-volt">
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
                  className="font-mono text-white underline decoration-volt hover:text-volt cursor-pointer min-h-[36px] flex items-center"
                >
                  {featuredTournament.title} →
                </button>
              </div>
            </div>

            {/* Hero Current / Upcoming Tournament Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-line bg-card/90 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-line pb-3 sm:pb-3.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-volt">
                    {featuredTournament.statusCategory === "live" ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span>Current Tournament · Active Now</span>
                      </>
                    ) : (
                      <>
                        <span>📅 Next Upcoming Tournament</span>
                      </>
                    )}
                  </span>
                  <span className="rounded bg-ink px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase">
                    {featuredTournament.sport}
                  </span>
                </div>

                {/* Tournament Image Banner */}
                <div className="relative mt-3.5 h-36 w-full overflow-hidden rounded-xl bg-ink">
                  <img
                    src={featuredTournament.image}
                    alt={featuredTournament.title}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  {featuredTournament.prize && (
                    <div className="absolute bottom-2 left-2 rounded-md bg-ink/80 px-2 py-0.5 font-mono text-[11px] font-bold text-volt backdrop-blur-md">
                      🏆 Prize: {featuredTournament.prize}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 rounded-md bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-mute backdrop-blur-md">
                    {featuredTournament.teamsCount}
                  </div>
                </div>

                {/* Tournament Title & Info */}
                <div className="mt-3.5">
                  <h3 className="display text-base sm:text-lg text-white">
                    {featuredTournament.title}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-mute font-mono">
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
                <div className="mt-3.5 border-t border-line/60 pt-2.5">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                    Official Tournament Sponsor:
                  </p>
                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/70 p-2.5">
                    <span className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-card border border-volt/30 font-mono text-[10px] font-black text-volt shrink-0 shadow-sm">
                      {featuredTournament.sponsor.badge}
                    </span>
                    <div className="min-w-0 flex-1 truncate">
                      <span className="block font-bold text-white text-xs truncate">
                        {featuredTournament.sponsor.name}
                      </span>
                      <span className="block font-mono text-[10px] text-mute truncate">
                        {featuredTournament.sponsor.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fan Zone Perks */}
                <div className="mt-3 rounded-xl border border-line/70 bg-ink/70 p-2.5 text-xs">
                  <p className="mb-1 font-mono text-[9px] uppercase text-volt">
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
                  className="mt-3.5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-volt py-3 text-xs font-black uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-md shadow-volt/20 cursor-pointer"
                >
                  <span>Explore Tournament Hub</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sponsor Showcase Strip */}
          <div className="mt-10 sm:mt-14 border-t border-line/60 pt-6 sm:pt-8">
            <p className="mb-4 sm:mb-5 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-mute">
              Official Collegiate Tournament Sponsors &amp; Brand Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
              {CORPORATE_SPONSORS.map((s) => (
                <div key={s.name} className="flex flex-col items-center">
                  <span className="font-mono text-xs sm:text-base font-extrabold tracking-widest text-white transition hover:text-volt">
                    {s.logoText}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-mute">
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
        className="border-b border-line bg-ink/60 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Tournament Hub &amp; Spectator Guide
              </span>
              <h2 className="display mt-1.5 text-2xl leading-none text-white sm:text-4xl md:text-5xl">
                UPCOMING EVENTS &amp; FAN ZONE
              </h2>
              <p className="mt-2 max-w-xl text-xs text-mute leading-relaxed">
                Tap any tournament card to view the public Tournament Hub,
                complete rules, participating teams, and fan zone amenities.
              </p>
            </div>

            {/* Required 3 Filters: Live, Upcoming, Past — Full width grid on mobile */}
            <div
              role="tablist"
              className="mt-2 grid grid-cols-3 w-full sm:w-auto rounded-xl border border-line bg-card p-1 md:mt-0"
            >
              {(["live", "upcoming", "past"] as EventStatusTab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={statusTab === tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg px-3 sm:px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-95 ${statusTab === tab
                      ? "bg-volt text-ink shadow-md shadow-volt/20"
                      : "text-mute hover:text-white"
                    }`}
                >
                  {tab === "live" && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
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
        className="border-b border-line bg-[#07080a] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                About FNCTN
              </span>
              <h2 className="display mt-2 text-2xl leading-none text-white sm:text-4xl md:text-5xl">
                OUR MISSION FOR <br />
                <span className="text-volt">EGYPTIAN UNIVERSITY SPORTS</span>
              </h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-mute">
                FNCTN was founded with a single mission: to professionalize,
                elevate, and celebrate collegiate athletics across Egypt.
                Thousands of gifted student-athletes compete across campuses
                every week without centralized tracking, televised broadcast, or
                scouting access.
              </p>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-mute">
                We bridge this gap with an all-in-one digital tournament engine.
                We empower universities with institutional ranking points,
                furnish fans with real-time match fixtures and vibrant fan
                zones, and provide student-athletes with verified stats seen
                directly by professional football, basketball, and padel scouts.
              </p>

              {/* 3 Pillars */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="font-mono text-2xl font-bold text-volt">16+</p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Universities
                  </p>
                  <p className="mt-0.5 text-[11px] text-mute">
                    Unified league standings
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="font-mono text-2xl font-bold text-volt">
                    2,500+
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">Athletes</p>
                  <p className="mt-0.5 text-[11px] text-mute">
                    Verified competition IDs
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-card p-4">
                  <p className="font-mono text-2xl font-bold text-volt">45+</p>
                  <p className="mt-1 text-xs font-bold text-white">Scouts</p>
                  <p className="mt-0.5 text-[11px] text-mute">
                    Direct scouting trials
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-volt/30 bg-volt/10 p-5 sm:p-6">
                  <h3 className="display text-xl sm:text-2xl text-white">
                    Why University Athletics Matter
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-mute">
                    In premier sporting nations, collegiate leagues are the
                    bedrock of national teams and pro drafts. FNCTN is
                    establishing that exact pipeline right here in Egypt,
                    combining academic prestige with championship athletics.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-volt">
                    Verified Digital Scorekeeping
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-mute">
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
        className="border-b border-line bg-ink/80 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
              Participate
            </span>
            <h2 className="display mt-1.5 text-2xl sm:text-4xl md:text-5xl leading-none text-white">
              FOUR SIMPLE STEPS TO COMPETE
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-mute">
              Follow these simple steps to claim your spot in upcoming
              university tournaments, get your player pass verified, and take
              the field.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {/* Step 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-line bg-card p-5 sm:p-6 transition hover:border-volt/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-volt font-mono text-base sm:text-lg font-black text-ink">
                  01
                </span>
                <h3 className="display mt-4 sm:mt-5 text-xl sm:text-2xl text-white">
                  Create Account
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">
                  Register your student athlete account with your name,
                  university email, and password.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-volt">
                ✓ Takes under 1 minute
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-line bg-card p-5 sm:p-6 transition hover:border-volt/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-volt font-mono text-base sm:text-lg font-black text-ink">
                  02
                </span>
                <h3 className="display mt-4 sm:mt-5 text-xl sm:text-2xl text-white">
                  Upload ID
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">
                  Upload a photo of your official University Student ID and
                  National ID for tournament verification.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-volt">
                ✓ Eligibility guaranteed
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-line bg-card p-5 sm:p-6 transition hover:border-volt/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-volt font-mono text-base sm:text-lg font-black text-ink">
                  03
                </span>
                <h3 className="display mt-4 sm:mt-5 text-xl sm:text-2xl text-white">
                  Form Team
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">
                  Create a new university roster or join your existing campus
                  team instantly with a 6-character code.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-volt">
                ✓ 6-Character Invite Code
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-line bg-card p-5 sm:p-6 transition hover:border-volt/80">
              <div>
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-volt font-mono text-base sm:text-lg font-black text-ink">
                  04
                </span>
                <h3 className="display mt-4 sm:mt-5 text-xl sm:text-2xl text-white">
                  Play
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mute">
                  Compete in official stadium fixtures, log your stats, and
                  build your verified scouting portfolio.
                </p>
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase text-volt">
                ✓ Live on FNCTN Arena
              </div>
            </div>
          </div>

          {/* Large Sign Up Now Interaction Button */}
          <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-4 text-center">
            <button
              type="button"
              onClick={onSignUpAthlete}
              className="flex min-h-[52px] w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-volt px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95 shadow-2xl shadow-volt/30 cursor-pointer"
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
            <p className="font-mono text-xs text-mute">
              Already have an athlete account?{" "}
              <button
                type="button"
                onClick={onEnterApp}
                className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt cursor-pointer py-1 inline-block"
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
      <footer className="border-t border-line bg-ink py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Logo size="text-2xl sm:text-3xl" />
              <span className="border-l border-line pl-3 text-xs text-mute">
                Egyptian University Sports Network
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-mute">
              <button
                type="button"
                onClick={() => handleNavClick("home")}
                className="hover:text-volt cursor-pointer min-h-[40px] flex items-center"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("events")}
                className="hover:text-volt cursor-pointer min-h-[40px] flex items-center"
              >
                Events &amp; Fan Zone
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("who-are-we")}
                className="hover:text-volt cursor-pointer min-h-[40px] flex items-center"
              >
                Who Are We
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("participate")}
                className="hover:text-volt cursor-pointer min-h-[40px] flex items-center"
              >
                Participate
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="hover:text-volt cursor-pointer min-h-[40px] flex items-center"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={onEnterApp}
                className="text-volt underline decoration-volt underline-offset-4 cursor-pointer min-h-[40px] flex items-center"
              >
                Live App Portal
              </button>
            </div>

            <div className="font-mono text-xs text-mute/60 text-center">
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
