import { useState, useEffect, type ReactNode } from "react";
import AthleteSignUp from "./components/AthleteSignUp";
import AthleteOnboarding, { type AthleteProfileData } from "./components/AthleteOnboarding";

type Tab = "home" | "standings" | "profile" | "settings";

const PLAYER =
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop&auto=format";
const PITCH =
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop&auto=format";
const CROWD =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?w=800&h=500&fit=crop&auto=format";

const icons: Record<Tab, ReactNode> = {
  home: <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" />,
  standings: <path d="M5 21V10m7 11V3m7 18v-7" />,
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
};

function Icon({ name, active }: { name: Tab; active?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active && name === "home" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

function Logo({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`display ${size} leading-none`}>
      FN<span className="text-volt">CTN</span>
    </span>
  );
}

function BottomNav({ active, go }: { active: Tab; go: (t: Tab) => void }) {
  const items: [Tab, string][] = [
    ["home", "Home"],
    ["standings", "Standings"],
    ["profile", "Profile"],
    ["settings", "Settings"],
  ];
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-4 border-t border-line bg-ink/95 px-2 pb-5 pt-2 backdrop-blur">
      {items.map(([k, label]) => {
        const on = k === active;
        return (
          <button
            key={k}
            onClick={() => go(k)}
            aria-current={on ? "page" : undefined}
            className={`flex flex-col items-center gap-1 py-1 transition-colors ${
              on ? "text-volt" : "text-mute hover:text-white"
            }`}
          >
            <Icon name={k} active={on} />
            <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
            <span className={`h-0.5 w-5 ${on ? "bg-volt" : "bg-transparent"}`} />
          </button>
        );
      })}
    </nav>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-dvh w-full max-w-[430px] overflow-hidden bg-ink sm:h-[min(calc(100dvh-32px),880px)] sm:rounded-[36px] sm:border sm:border-line sm:shadow-2xl sm:shadow-black">
      {children}
    </div>
  );
}

function Scroll({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar absolute inset-0 overflow-y-auto px-5 pb-28 pt-6">{children}</div>
  );
}

function LiveBadge() {
  return (
    <span className="live-glow inline-flex items-center gap-1.5 rounded-full bg-volt px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
      Live
    </span>
  );
}

/* ---------- Screen 1 ---------- */
function Home({ go }: { go: (t: Tab) => void }) {
  const games = [
    { sport: "Basketball", a: "AUC", b: "GUC", time: "18:30", day: "Today" },
    { sport: "Padel", a: "BUE", b: "Ain Shams", time: "10:00", day: "Tomorrow" },
    { sport: "Football", a: "Helwan", b: "MSA", time: "16:00", day: "Sat 11" },
  ];
  return (
    <Phone>
      <Scroll>
        <header className="mb-6 flex items-center justify-between">
          <Logo />
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">
            Spring Cup &apos;26
          </span>
        </header>

        <section className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="relative h-36">
            <img src={PITCH} alt="Football pitch under floodlights" className="h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-3">
              <LiveBadge />
              <span className="font-mono text-xs text-white">67&apos;</span>
            </div>
          </div>
          <div className="px-4 pb-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-mute">
              Football · Group A · Match 14
            </p>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="text-left">
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink font-mono text-xs font-bold">
                  CU
                </div>
                <p className="display text-xl leading-tight">Cairo Univ</p>
              </div>
              <p className="font-mono text-5xl font-bold tabular-nums tracking-tighter">
                2<span className="mx-1 text-volt">:</span>1
              </p>
              <div className="text-right">
                <div className="mb-2 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink font-mono text-xs font-bold">
                  AU
                </div>
                <p className="display text-xl leading-tight">AUC</p>
              </div>
            </div>
            <button className="mt-5 w-full rounded-xl border border-volt/50 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-volt transition hover:bg-volt hover:text-ink">
              Follow match
            </button>
          </div>
        </section>

        <div className="mb-3 mt-7 flex items-end justify-between">
          <h2 className="display text-2xl">Up next</h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">3 games</span>
        </div>
        <ul className="space-y-2.5">
          {games.map((g) => (
            <li
              key={g.a + g.b}
              className="flex items-center gap-4 rounded-xl border border-line bg-card px-4 py-3 transition hover:border-volt/60"
            >
              <div className="w-14 border-r border-line pr-3">
                <p className="font-mono text-base font-bold leading-none">{g.time}</p>
                <p className="mt-1 font-mono text-[10px] uppercase text-mute">{g.day}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold">
                  {g.a} <span className="font-normal text-mute">vs</span> {g.b}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-mute">{g.sport}</p>
              </div>
              <span className="text-mute">›</span>
            </li>
          ))}
        </ul>
      </Scroll>
      <BottomNav active="home" go={go} />
    </Phone>
  );
}

/* ---------- Screen 2 ---------- */
const TABLES: Record<string, [string, number, number, number][]> = {
  Football: [
    ["Cairo University", 24, 8, 1],
    ["AUC", 21, 7, 2],
    ["Ain Shams", 17, 5, 4],
    ["GUC", 15, 4, 4],
    ["MSA", 12, 3, 6],
    ["Helwan", 9, 2, 7],
    ["BUE", 4, 1, 8],
  ],
  Basketball: [
    ["AUC", 18, 9, 1],
    ["GUC", 16, 8, 2],
    ["Cairo University", 12, 6, 4],
    ["BUE", 10, 5, 5],
    ["Ain Shams", 8, 4, 6],
    ["MSA", 4, 2, 8],
    ["Helwan", 2, 1, 9],
  ],
  Padel: [
    ["GUC", 15, 5, 0],
    ["MSA", 12, 4, 1],
    ["AUC", 9, 3, 2],
    ["BUE", 6, 2, 3],
    ["Cairo University", 3, 1, 4],
    ["Ain Shams", 3, 1, 4],
    ["Helwan", 0, 0, 5],
  ],
};

function Standings({ go }: { go: (t: Tab) => void }) {
  const [sport, setSport] = useState("Football");
  return (
    <Phone>
      <Scroll>
        <header className="mb-5 flex items-center justify-between">
          <Logo />
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Season 26</span>
        </header>
        <h1 className="display mb-4 text-4xl leading-none">League table</h1>

        <div role="tablist" className="mb-5 grid grid-cols-3 rounded-xl border border-line bg-card p-1">
          {Object.keys(TABLES).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={s === sport}
              onClick={() => setSport(s)}
              className={`rounded-lg py-2 text-sm font-bold transition ${
                s === sport ? "bg-volt text-ink" : "text-mute hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="grid grid-cols-[28px_1fr_36px_36px_44px] gap-1 border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute">
            <span>#</span>
            <span>Team</span>
            <span className="text-right">W</span>
            <span className="text-right">L</span>
            <span className="text-right">Pts</span>
          </div>
          {TABLES[sport].map(([team, pts, w, l], i) => {
            const first = i === 0;
            return (
              <div
                key={team}
                className={`relative grid grid-cols-[28px_1fr_36px_36px_44px] items-center gap-1 border-b border-line/60 px-4 py-3 last:border-0 ${
                  first ? "bg-volt/10" : ""
                }`}
              >
                {first && <span className="absolute inset-y-0 left-0 w-1 bg-volt" />}
                <span className={`font-mono text-sm font-bold ${first ? "text-volt" : "text-mute"}`}>
                  {i + 1}
                </span>
                <span className="truncate text-sm font-bold">{team}</span>
                <span className="text-right font-mono text-sm tabular-nums">{w}</span>
                <span className="text-right font-mono text-sm tabular-nums text-mute">{l}</span>
                <span className={`text-right font-mono text-sm font-bold tabular-nums ${first ? "text-volt" : ""}`}>
                  {pts}
                </span>
              </div>
            );
          })}
        </div>
      </Scroll>
      <BottomNav active="standings" go={go} />
    </Phone>
  );
}

/* ---------- Screen 3 ---------- */
function Profile({
  go,
  profile,
}: {
  go: (t: Tab) => void;
  profile?: AthleteProfileData;
}) {
  const stats = [
    ["Goals", "14"],
    ["Assists", "9"],
    ["Top speed", "34.2"],
    ["Matches", "22"],
  ];

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Omar Hassan";
  const university = profile ? profile.university : "Cairo University";
  const sports = profile?.sports?.length ? profile.sports : ["Football"];
  const ageTag = profile?.age ? ` · Age ${profile.age}` : "";
  const bio = profile?.bio;

  return (
    <Phone>
      <Scroll>
        <header className="mb-5 flex items-center justify-between">
          <Logo />
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-mute">
            Scout view
          </span>
        </header>

        <div className="flex flex-col items-center text-center">
          <div className="rounded-full border-2 border-volt p-1">
            <img
              src={PLAYER}
              alt={`${fullName}, athlete`}
              className="h-32 w-32 rounded-full bg-card object-cover"
            />
          </div>
          <h1 className="display mt-4 text-4xl leading-none">{fullName}</h1>
          <p className="mt-2 text-sm text-mute">{university}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-volt">
            {sports.join(" · ")}{ageTag}
          </p>
        </div>

        {bio && (
          <div className="mt-5 rounded-xl border border-line bg-card p-4 text-left">
            <p className="font-mono text-[10px] uppercase tracking-widest text-volt mb-1.5">
              Athlete Bio &amp; Achievements
            </p>
            <p className="text-xs leading-relaxed text-mute">{bio}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          {stats.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-card p-4">
              <p className="font-mono text-3xl font-bold tabular-nums">
                {v}
                {k === "Top speed" && <span className="ml-1 text-xs text-mute">km/h</span>}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mute">{k}</p>
            </div>
          ))}
        </div>

        <h2 className="display mb-3 mt-6 text-2xl">Highlight reel</h2>
        <button className="group relative block h-40 w-full overflow-hidden rounded-xl border border-line bg-card">
          <img src={CROWD} alt="Match highlight thumbnail" className="h-full w-full object-cover opacity-60 transition group-hover:opacity-80" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt text-ink">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded bg-ink/80 px-1.5 py-0.5 font-mono text-[10px]">
            2:14
          </span>
        </button>
      </Scroll>
      <div className="absolute inset-x-0 bottom-[88px] z-10 bg-gradient-to-t from-ink via-ink to-transparent px-5 pb-3 pt-6">
        <button className="w-full rounded-xl bg-volt py-3.5 text-sm font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-[0.99]">
          Contact for Scouting
        </button>
      </div>
      <BottomNav active="profile" go={go} />
    </Phone>
  );
}

/* ---------- Screen 4 ---------- */
function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-mute/60 focus:border-volt focus:ring-2 focus:ring-volt/30"
      />
    </label>
  );
}

function Login({
  onLogin,
  onNavigateToSignUpAthlete,
  signupNotice,
  defaultEmail = "",
}: {
  onLogin: () => void;
  onNavigateToSignUpAthlete: () => void;
  signupNotice?: string | null;
  defaultEmail?: string;
}) {
  const [email, setEmail] = useState(defaultEmail);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  return (
    <Phone>
      <div className="absolute inset-0 flex flex-col justify-center px-7">
        <div className="mb-8 text-center">
          <Logo size="text-7xl" />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
            University tournaments. Live.
          </p>
        </div>

        {signupNotice && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-volt/50 bg-volt/15 p-3.5 text-xs text-white"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-volt flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{signupNotice}</span>
            </div>
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <Field
            label="Email"
            type="email"
            placeholder="you@university.edu.eg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field label="Password" type="password" placeholder="••••••••" />
          <button className="mt-2 w-full rounded-xl bg-volt py-3.5 text-sm font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-[0.99]">
            Log In
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center gap-3 text-sm">
          <button
            type="button"
            onClick={onNavigateToSignUpAthlete}
            className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt cursor-pointer"
          >
            Create Student Athlete Account
          </button>
          <a href="#" className="text-mute underline underline-offset-4 hover:text-white">
            Apply for Scout Access
          </a>
        </div>
      </div>
    </Phone>
  );
}

/* ---------- Settings ---------- */
function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full border transition ${
        on ? "border-volt bg-volt" : "border-line bg-ink"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
          on ? "left-[22px] bg-ink" : "left-1 bg-mute"
        }`}
      />
    </button>
  );
}

function Settings({ go, onLogout }: { go: (t: Tab) => void; onLogout: () => void }) {
  const [prefs, setPrefs] = useState({ live: true, results: true, reminders: false });
  const rows: [keyof typeof prefs, string, string][] = [
    ["live", "Live match alerts", "Goals and final whistles"],
    ["results", "Result summaries", "Daily recap of your teams"],
    ["reminders", "Kick-off reminders", "30 minutes before start"],
  ];
  return (
    <Phone>
      <Scroll>
        <header className="mb-5 flex items-center justify-between">
          <Logo />
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">v1.0</span>
        </header>
        <h1 className="display mb-5 text-4xl leading-none">Settings</h1>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-mute">Notifications</p>
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          {rows.map(([k, title, sub]) => (
            <div key={k} className="flex items-center justify-between border-b border-line/60 px-4 py-3.5 last:border-0">
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs text-mute">{sub}</p>
              </div>
              <Toggle label={title} on={prefs[k]} onChange={(v) => setPrefs({ ...prefs, [k]: v })} />
            </div>
          ))}
        </div>

        <p className="mb-2 mt-6 font-mono text-[10px] uppercase tracking-widest text-mute">Account</p>
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          <button
            onClick={() => go("profile")}
            className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold hover:text-volt"
          >
            View athlete profile <span className="text-mute">›</span>
          </button>
        </div>

        <button
          onClick={onLogout}
          className="mt-6 w-full rounded-xl border border-line py-3 text-sm font-bold text-white transition hover:border-volt hover:text-volt"
        >
          Log out
        </button>
      </Scroll>
      <BottomNav active="settings" go={go} />
    </Phone>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [authScreen, setAuthScreen] = useState<"login" | "signup_athlete" | "onboarding_athlete">("login");
  const [tab, setTab] = useState<Tab>("home");
  const [signupNotice, setSignupNotice] = useState<string | null>(null);
  const [prefillEmail, setPrefillEmail] = useState("");
  const [pendingAthlete, setPendingAthlete] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileData>({
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.hassan@university.edu.eg",
    age: "21",
    sports: ["Football"],
    university: "Cairo University",
    notInUniversity: false,
    bio: "Striker & Season MVP. Computer Engineering sophomore focused on sports analytics and collegiate tournaments.",
  });

  const go = (t: Tab) => setTab(t);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#07080a] sm:p-4">
      {!authed ? (
        authScreen === "onboarding_athlete" ? (
          <Phone>
            <AthleteOnboarding
              initialData={pendingAthlete}
              onComplete={(profileData) => {
                setAthleteProfile(profileData);
                setPrefillEmail(profileData.email);
                setAuthed(true);
                setTab("profile");
              }}
            />
          </Phone>
        ) : authScreen === "signup_athlete" ? (
          <Phone>
            <AthleteSignUp
              onNavigateToLogin={() => setAuthScreen("login")}
              onSuccess={(info) => {
                setPendingAthlete({
                  firstName: info.firstName,
                  lastName: info.familyName,
                  email: info.email,
                });
                setAuthScreen("onboarding_athlete");
              }}
            />
          </Phone>
        ) : (
          <Login
            onLogin={() => {
              setTab("home");
              setAuthed(true);
            }}
            onNavigateToSignUpAthlete={() => {
              setSignupNotice(null);
              setAuthScreen("signup_athlete");
            }}
            signupNotice={signupNotice}
            defaultEmail={prefillEmail}
          />
        )
      ) : tab === "home" ? (
        <Home go={go} />
      ) : tab === "standings" ? (
        <Standings go={go} />
      ) : tab === "profile" ? (
        <Profile go={go} profile={athleteProfile} />
      ) : (
        <Settings
          go={go}
          onLogout={() => {
            setAuthed(false);
            setAuthScreen("login");
            setSignupNotice(null);
          }}
        />
      )}
    </main>
  );
}
