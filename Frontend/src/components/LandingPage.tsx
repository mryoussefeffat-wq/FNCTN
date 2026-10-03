import { useState, type FormEvent } from "react";

interface LandingPageProps {
  onEnterApp: () => void;
  onSignUpAthlete: () => void;
}

interface TournamentEvent {
  id: string;
  title: string;
  sport: "Football" | "Basketball" | "Padel" | "Track & Field";
  date: string;
  venue: string;
  prize: string;
  teamsCount: string;
  slotsFilled: number;
  totalSlots: number;
  status: "Registration Open" | "Filling Fast" | "Scout Showcase";
  image: string;
}

const EVENTS: TournamentEvent[] = [
  {
    id: "football-cup-26",
    title: "Capital University Football Championship '26",
    sport: "Football",
    date: "May 12 – May 26, 2026",
    venue: "Cairo International Stadium & CU Arena",
    prize: "EGP 250,000",
    teamsCount: "16 Universities",
    slotsFilled: 13,
    totalSlots: 16,
    status: "Filling Fast",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "basketball-masters",
    title: "Nile Valley Inter-Collegiate Basketball Masters",
    sport: "Basketball",
    date: "June 2 – June 14, 2026",
    venue: "AUC Sports Complex, New Cairo",
    prize: "EGP 150,000",
    teamsCount: "12 Universities",
    slotsFilled: 9,
    totalSlots: 12,
    status: "Registration Open",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "padel-open",
    title: "Red Sea Collegiate Padel Cup",
    sport: "Padel",
    date: "June 20 – June 24, 2026",
    venue: "GUC Padel Arena, Tagamoa",
    prize: "EGP 80,000",
    teamsCount: "32 Doubles Pairs",
    slotsFilled: 28,
    totalSlots: 32,
    status: "Filling Fast",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "sprint-showcase",
    title: "National University Sprint & Athletics Showcase",
    sport: "Track & Field",
    date: "July 5 – July 7, 2026",
    venue: "Maadi Olympic Center, Cairo",
    prize: "EGP 100,000 + Pro Trials",
    teamsCount: "250+ Competitors",
    slotsFilled: 190,
    totalSlots: 250,
    status: "Scout Showcase",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop&auto=format",
  },
];

const UNIVERSITIES_LIST = [
  "Cairo University",
  "American University in Cairo (AUC)",
  "German University in Cairo (GUC)",
  "British University in Egypt (BUE)",
  "Ain Shams University",
  "Modern Sciences and Arts (MSA)",
  "Helwan University",
  "Alexandria University",
];

export default function LandingPage({
  onEnterApp,
  onSignUpAthlete,
}: LandingPageProps) {
  const [sportFilter, setSportFilter] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick participation form states
  const [partName, setPartName] = useState("");
  const [partEmail, setPartEmail] = useState("");
  const [partRole, setPartRole] = useState("Athlete");
  const [partUniversity, setPartUniversity] = useState(UNIVERSITIES_LIST[0]);
  const [partSport, setPartSport] = useState("Football");
  const [partMessage, setPartMessage] = useState("");
  const [partSubmitted, setPartSubmitted] = useState(false);

  const filteredEvents =
    sportFilter === "All"
      ? EVENTS
      : EVENTS.filter((e) => e.sport === sportFilter);

  function handleParticipationSubmit(e: FormEvent) {
    e.preventDefault();
    setPartSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 500);
  }

  function scrollToSection(id: string) {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#07080a] text-white selection:bg-volt selection:text-ink font-sans">
      {/* ---------------- NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/90 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-left"
            aria-label="FNCTN Home"
          >
            <span className="display text-3xl font-extrabold tracking-tight">
              FN<span className="text-volt">CTN</span>
            </span>
            <span className="hidden rounded-full border border-volt/30 bg-volt/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-volt sm:inline-block">
              University League
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-mute transition hover:text-volt"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-sm font-medium text-mute transition hover:text-volt"
            >
              Upcoming Events
            </button>
            <button
              onClick={() => scrollToSection("who-are-we")}
              className="text-sm font-medium text-mute transition hover:text-volt"
            >
              Who Are We
            </button>
            <button
              onClick={() => scrollToSection("participate")}
              className="text-sm font-medium text-mute transition hover:text-volt"
            >
              Participate
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={onSignUpAthlete}
              className="rounded-xl border border-volt/50 bg-volt/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-volt transition hover:bg-volt hover:text-ink"
            >
              Athlete Sign Up
            </button>
            <button
              onClick={onEnterApp}
              className="flex items-center gap-2 rounded-xl bg-volt px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95 shadow-md shadow-volt/20"
            >
              <span>Launch App</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-mute md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-line bg-ink/98 px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-base font-bold text-white hover:text-volt"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-left text-base font-bold text-white hover:text-volt"
              >
                Upcoming Events
              </button>
              <button
                onClick={() => scrollToSection("who-are-we")}
                className="text-left text-base font-bold text-white hover:text-volt"
              >
                Who Are We
              </button>
              <button
                onClick={() => scrollToSection("participate")}
                className="text-left text-base font-bold text-white hover:text-volt"
              >
                Participate
              </button>
              <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-line">
                <button
                  onClick={onSignUpAthlete}
                  className="w-full rounded-xl border border-volt/50 py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-volt"
                >
                  Create Athlete Account
                </button>
                <button
                  onClick={onEnterApp}
                  className="w-full rounded-xl bg-volt py-3 text-center text-xs font-extrabold uppercase tracking-wider text-ink"
                >
                  Open Live Match Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- SECTION 1: HOMEPAGE / HERO ---------------- */}
      <section id="home" className="relative min-h-[90vh] overflow-hidden border-b border-line">
        {/* Background Stadium Photo & Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="/stadium_hero.jpg"
            alt="Collegiate sports tournament arena"
            className="h-full w-full object-cover object-center opacity-40 scale-105 transform animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a] via-transparent to-[#07080a]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7">
              {/* Season Live Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/15 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-volt animate-ping" />
                <span className="h-2 w-2 rounded-full bg-volt -ml-4" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                  Spring 2026 Inter-Collegiate Season · Live
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="display mt-6 text-4xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                WHERE UNIVERSITY <br />
                <span className="text-volt">CHAMPIONS</span> ARE <br />
                BORN &amp; SCOUTED
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
                FNCTN is the official digital arena uniting Egypt&apos;s leading universities,
                high-caliber student athletes, and professional sports scouts. Experience
                real-time tournament fixtures, live collegiate tables, and verified scout profiles.
              </p>

              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onSignUpAthlete}
                  className="flex items-center gap-2.5 rounded-xl bg-volt px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95 shadow-xl shadow-volt/20"
                >
                  <span>Join as Student Athlete</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => scrollToSection("participate")}
                  className="rounded-xl border border-line bg-card/80 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition hover:border-volt hover:text-volt"
                >
                  Register University Team
                </button>

                <button
                  onClick={onEnterApp}
                  className="inline-flex items-center gap-2 font-mono text-xs text-mute underline decoration-volt decoration-2 underline-offset-4 hover:text-white"
                >
                  <span>Launch Live Mobile Portal →</span>
                </button>
              </div>

              {/* Trust Indicators / Universities */}
              <div className="mt-12 border-t border-line/60 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
                  Competing Delegations &amp; Campus Stadiums
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {["Cairo Univ", "AUC", "GUC", "BUE", "Ain Shams", "MSA", "Helwan"].map((uni) => (
                    <span
                      key={uni}
                      className="rounded-lg border border-line bg-card/60 px-2.5 py-1 font-mono text-xs font-medium text-mute"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Fixture Simulation Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-3xl border border-line bg-card/90 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-2">
                    <span className="live-glow inline-flex items-center gap-1.5 rounded-full bg-volt px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-ink">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                      Live Match
                    </span>
                    <span className="font-mono text-xs text-white">67&apos; Minutes</span>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                    Football · Group A
                  </span>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink font-mono text-sm font-bold text-white shadow-inner">
                      CU
                    </div>
                    <span className="display text-lg">Cairo Univ</span>
                    <span className="font-mono text-[10px] text-mute">Top Scorer (14)</span>
                  </div>

                  <div>
                    <div className="font-mono text-5xl font-black tabular-nums tracking-tight">
                      2<span className="mx-1 text-volt">:</span>1
                    </div>
                    <span className="font-mono text-[10px] uppercase text-volt">Second Half</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink font-mono text-sm font-bold text-white shadow-inner">
                      AUC
                    </div>
                    <span className="display text-lg">AUC</span>
                    <span className="font-mono text-[10px] text-mute">Defending Champ</span>
                  </div>
                </div>

                {/* Live Scout Callout */}
                <div className="mt-4 rounded-xl border border-volt/20 bg-volt/5 p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-volt text-ink font-mono text-xs font-bold">
                        ★
                      </span>
                      <span className="text-xs font-bold text-white">Scout Spotlight</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-volt">3 Scouts Watching</span>
                  </div>
                  <p className="mt-1.5 text-xs text-mute">
                    Omar Hassan (CU #9) recorded top sprint speed of{" "}
                    <strong className="text-white font-mono">34.2 km/h</strong> with 1 goal &amp; 1 assist.
                  </p>
                </div>

                {/* Interactive Portal Button */}
                <button
                  onClick={onEnterApp}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-volt py-3 text-xs font-bold uppercase tracking-wider text-ink transition hover:brightness-110 active:scale-95"
                >
                  <span>Open Live Tournament Scoreboard</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-card/60 p-6 backdrop-blur-md sm:grid-cols-4 lg:p-8">
            <div>
              <p className="font-mono text-3xl font-black text-volt sm:text-4xl">16+</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">Universities</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-black text-white sm:text-4xl">2,400+</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">Student Athletes</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-black text-volt sm:text-4xl">45+</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">Verified Scouts</p>
            </div>
            <div>
              <p className="font-mono text-3xl font-black text-white sm:text-4xl">EGP 750K</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">Season Prize Pool</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: UPCOMING EVENTS ---------------- */}
      <section id="events" className="border-b border-line bg-ink/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Official Tournament Calendar
              </span>
              <h2 className="display mt-2 text-3xl leading-none text-white sm:text-5xl">
                UPCOMING EVENTS &amp; CUPS
              </h2>
            </div>

            {/* Sport Filter Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 md:mt-0">
              {["All", "Football", "Basketball", "Padel", "Track & Field"].map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSportFilter(sport)}
                  className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition ${
                    sportFilter === sport
                      ? "bg-volt text-ink shadow-md shadow-volt/20"
                      : "border border-line bg-card text-mute hover:border-volt/50 hover:text-white"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-volt/70"
              >
                {/* Event Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-ink">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-md bg-volt px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase text-ink">
                      {evt.sport}
                    </span>
                    <span className="rounded-md border border-line bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase text-white backdrop-blur">
                      {evt.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 font-mono text-xs font-bold text-volt">
                    {evt.prize} Prize
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-2xl leading-snug text-white transition group-hover:text-volt">
                    {evt.title}
                  </h3>

                  <div className="mt-4 space-y-2 border-t border-line/60 pt-4 text-xs text-mute">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-volt">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{evt.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-volt">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{evt.venue}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-volt">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{evt.teamsCount}</span>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div className="mt-5 border-t border-line/60 pt-4">
                    <div className="flex justify-between font-mono text-[10px] text-mute mb-1.5">
                      <span>Roster Registration</span>
                      <span className="text-white font-bold">{evt.slotsFilled} of {evt.totalSlots} Slots Filled</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink">
                      <div
                        className="h-full bg-volt"
                        style={{ width: `${(evt.slotsFilled / evt.totalSlots) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => scrollToSection("participate")}
                      className="flex-1 rounded-xl bg-volt py-3 text-center text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95"
                    >
                      Register Team / Compete
                    </button>
                    <button
                      onClick={onEnterApp}
                      className="rounded-xl border border-line bg-ink px-4 py-3 font-mono text-xs text-mute hover:border-volt hover:text-white transition"
                    >
                      Standings
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: WHO ARE WE ---------------- */}
      <section id="who-are-we" className="border-b border-line bg-[#07080a] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Story & Philosophy */}
            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Who Are We
              </span>
              <h2 className="display mt-2 text-3xl leading-none text-white sm:text-5xl">
                WE REVOLUTIONIZE <br />
                <span className="text-volt">UNIVERSITY SPORTS</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-mute">
                Every weekend across Egyptian university campuses, thousands of extraordinary
                athletes compete in fiercely competitive football, basketball, and padel matches.
                Yet for years, their talent remained invisible to professional leagues, scouts, and
                even neighboring institutions.
              </p>

              <p className="mt-4 text-base leading-relaxed text-mute">
                <strong className="text-white">FNCTN</strong> was built to transform collegiate
                athletics into a world-class, professionalized ecosystem. We provide the digital
                tournament infrastructure, certified referee scoring, real-time live standings,
                and scout discovery tools that turn collegiate champions into professional recruits.
              </p>

              {/* Mission Points */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-volt/15 font-mono text-xs font-bold text-volt flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Centralized League Infrastructure</h4>
                    <p className="text-xs text-mute mt-0.5">
                      Unified scheduling, automated institutional total points, and digital match verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-volt/15 font-mono text-xs font-bold text-volt flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Verified Athlete Profiles &amp; Analytics</h4>
                    <p className="text-xs text-mute mt-0.5">
                      Transparent tracking of speed, assists, goals, MVP ballots, and match video reels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-volt/15 font-mono text-xs font-bold text-volt flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Professional Scouting Pipeline</h4>
                    <p className="text-xs text-mute mt-0.5">
                      Connecting premier sports clubs, academy scouts, and sporting directors directly with collegiate talent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Pillars & Quote */}
            <div className="lg:col-span-6">
              <div className="space-y-4">
                <div className="rounded-2xl border border-line bg-card p-6 transition hover:border-volt/60">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt text-ink font-bold">
                      🏆
                    </span>
                    <div>
                      <h3 className="display text-xl">The Institutional Trophy</h3>
                      <p className="text-xs text-mute">Annual cup contested across 16 universities</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-mute">
                    Universities earn aggregate points from all participating sports disciplines.
                    At the end of the Spring Season, the top university hoists the official Egyptian
                    Collegiate Athletic Championship Cup.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-card p-6 transition hover:border-volt/60">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-volt text-ink font-bold">
                      ⚡
                    </span>
                    <div>
                      <h3 className="display text-xl">High-Performance Scouting</h3>
                      <p className="text-xs text-mute">Over 45 accredited regional and national scouts</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-mute">
                    Every fixture is recorded and analyzed. Scouts filter through verified sprint speeds,
                    shot conversions, and academic standing to find student athletes ready for pro contracts.
                  </p>
                </div>

                {/* Athlete Quote */}
                <div className="rounded-2xl border border-volt/30 bg-volt/10 p-6">
                  <p className="text-sm italic leading-relaxed text-white">
                    &ldquo;Before FNCTN, university matches felt isolated. Now, every goal is tracked,
                    our fans follow the live app from campus, and scouts are in the stands every Saturday.&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-volt/20 pt-3">
                    <div>
                      <p className="text-xs font-bold text-white">Omar Hassan</p>
                      <p className="font-mono text-[10px] text-volt uppercase">Cairo University · Striker</p>
                    </div>
                    <span className="font-mono text-[10px] text-mute">Season 25 MVP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: PARTICIPATE ---------------- */}
      <section id="participate" className="border-b border-line bg-ink/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
              Get In The Game
            </span>
            <h2 className="display mt-2 text-3xl leading-none text-white sm:text-5xl">
              HOW TO PARTICIPATE
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mute">
              Whether you are an aspiring student athlete, a university sports director, or a
              professional talent scout, FNCTN has a designated pathway for you.
            </p>
          </div>

          {/* 3 Pathway Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Pathway 1 */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 transition hover:border-volt">
              <div>
                <span className="inline-block rounded-lg bg-volt/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-volt">
                  For Student Athletes
                </span>
                <h3 className="display mt-4 text-2xl">Compete &amp; Get Scouted</h3>
                <p className="mt-3 text-xs leading-relaxed text-mute">
                  Register your athlete profile, select your sports, connect with your university team
                  or join as an independent competitor. Track your live match statistics and build a
                  verified profile for professional scouts.
                </p>
              </div>
              <button
                onClick={onSignUpAthlete}
                className="mt-6 w-full rounded-xl bg-volt py-3 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95"
              >
                Create Athlete Account
              </button>
            </div>

            {/* Pathway 2 */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 transition hover:border-volt">
              <div>
                <span className="inline-block rounded-lg bg-volt/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-volt">
                  For Universities
                </span>
                <h3 className="display mt-4 text-2xl">Register Delegation</h3>
                <p className="mt-3 text-xs leading-relaxed text-mute">
                  Enroll your university sports delegation in upcoming tournament cups. Manage team
                  rosters, access official fixture calendars, and compete for institutional points in
                  the national collegiate leaderboard.
                </p>
              </div>
              <button
                onClick={() => {
                  setPartRole("University Official");
                  const formEl = document.getElementById("participation-form");
                  if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 w-full rounded-xl border border-line bg-ink py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:border-volt hover:text-volt"
              >
                Enroll University Team
              </button>
            </div>

            {/* Pathway 3 */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 transition hover:border-volt">
              <div>
                <span className="inline-block rounded-lg bg-volt/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-volt">
                  For Scouts &amp; Clubs
                </span>
                <h3 className="display mt-4 text-2xl">Apply for Scout Access</h3>
                <p className="mt-3 text-xs leading-relaxed text-mute">
                  Gain certified access to the FNCTN Scouting Portal. Review performance metrics,
                  scout reports, sprint and match telemetry, and contact eligible university players
                  directly for trials.
                </p>
              </div>
              <button
                onClick={() => {
                  setPartRole("Scout / Club Representative");
                  const formEl = document.getElementById("participation-form");
                  if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 w-full rounded-xl border border-line bg-ink py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:border-volt hover:text-volt"
              >
                Request Scout Credentials
              </button>
            </div>
          </div>

          {/* Interactive Participation Request Form */}
          <div id="participation-form" className="mt-16 rounded-3xl border border-line bg-card p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Quick Registration
              </span>
              <h3 className="display mt-2 text-3xl">SEND A PARTICIPATION INQUIRY</h3>
              <p className="mt-2 text-xs leading-relaxed text-mute">
                Submit your delegation or individual details below. Our tournament director will
                reach out within 24 hours with tournament schedules and registration guidelines.
              </p>
            </div>

            {partSubmitted ? (
              <div className="mt-8 rounded-2xl border border-volt/50 bg-volt/15 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-volt text-ink font-bold text-xl mb-3">
                  ✓
                </div>
                <h4 className="display text-2xl text-white">Inquiry Received!</h4>
                <p className="mt-2 text-sm text-mute">
                  Thank you, <strong className="text-white">{partName}</strong>. We have registered your inquiry
                  as a <strong className="text-volt">{partRole}</strong> for {partUniversity}. Our tournament
                  operations staff will email you with registration packages shortly.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={onSignUpAthlete}
                    className="rounded-xl bg-volt px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink"
                  >
                    Proceed to Athlete Sign Up
                  </button>
                  <button
                    onClick={() => setPartSubmitted(false)}
                    className="rounded-xl border border-line bg-ink px-4 py-2.5 text-xs font-mono text-mute hover:text-white"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleParticipationSubmit} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    Your Full Name
                  </span>
                  <input
                    type="text"
                    required
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder="e.g. Dr. Ahmed Tarek / Karim Salah"
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-3 text-sm text-white outline-none transition focus:border-volt"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    Official Email
                  </span>
                  <input
                    type="email"
                    required
                    value={partEmail}
                    onChange={(e) => setPartEmail(e.target.value)}
                    placeholder="contact@university.edu.eg"
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-3 text-sm text-white outline-none transition focus:border-volt"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    Participation Role
                  </span>
                  <select
                    value={partRole}
                    onChange={(e) => setPartRole(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-line bg-ink px-3.5 py-3 text-sm text-white outline-none transition focus:border-volt"
                  >
                    <option value="Athlete">Student Athlete (Individual / Team)</option>
                    <option value="University Official">University Sports Official / Coach</option>
                    <option value="Scout / Club Representative">Professional Scout / Club</option>
                    <option value="Sponsor / Partner">Corporate Sponsor / Brand</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    University / Organization
                  </span>
                  <select
                    value={partUniversity}
                    onChange={(e) => setPartUniversity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-line bg-ink px-3.5 py-3 text-sm text-white outline-none transition focus:border-volt"
                  >
                    {UNIVERSITIES_LIST.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                    <option value="Independent / Other">Other / Independent Club</option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    Sport Discipline
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Football", "Basketball", "Padel", "Tennis", "Track & Field"].map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => setPartSport(sp)}
                        className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition ${
                          partSport === sp
                            ? "bg-volt text-ink"
                            : "border border-line bg-ink text-mute hover:border-volt/50"
                        }`}
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
                    Notes or Questions (Optional)
                  </span>
                  <textarea
                    rows={3}
                    value={partMessage}
                    onChange={(e) => setPartMessage(e.target.value)}
                    placeholder="Tell us about your team size, division, or specific tournament inquiry..."
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-3 text-sm text-white outline-none transition focus:border-volt resize-none"
                  />
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-volt py-3.5 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-95"
                  >
                    <span>Submit Participation Inquiry</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-line bg-ink py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="display text-3xl">
                FN<span className="text-volt">CTN</span>
              </span>
              <span className="border-l border-line pl-3 text-xs text-mute">
                The Collegiate Athletic Network
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-mute">
              <button onClick={() => scrollToSection("home")} className="hover:text-volt">
                Home
              </button>
              <button onClick={() => scrollToSection("events")} className="hover:text-volt">
                Events
              </button>
              <button onClick={() => scrollToSection("who-are-we")} className="hover:text-volt">
                Who Are We
              </button>
              <button onClick={() => scrollToSection("participate")} className="hover:text-volt">
                Participate
              </button>
              <button onClick={onEnterApp} className="text-volt underline decoration-volt underline-offset-4">
                Tournament App
              </button>
            </div>

            <div className="font-mono text-xs text-mute/60">
              &copy; {new Date().getFullYear()} FNCTN Sports League. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
