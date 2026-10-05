import { useState } from "react"
import LandingPage from "./components/LandingPage"
import AthleteSignUp from "./components/AthleteSignUp"
import AthleteOnboarding, {
  type AthleteProfileData,
} from "./components/AthleteOnboarding"
import HomeView from "./components/HomeView"
import StandingsView from "./components/StandingsView"
import ProfileView from "./components/ProfileView"
import SettingsView from "./components/SettingsView"
import LoginView from "./components/LoginView"
import { Phone } from "./components/PhoneLayout"
import type { NavTab } from "./components/BottomNav"
import FanHubContainer from "./features/FanHub/FanHubContainer"

export default function App() {
  const [viewMode, setViewMode] = useState<"landing" | "portal" | "fanhub">("landing")
  const [hubTournamentId, setHubTournamentId] = useState<string | null>(null)
  const [hubMatchId, setHubMatchId] = useState<string | null>(null)
  const [authed, setAuthed] = useState(false)
  const [authScreen, setAuthScreen] =
    useState<"login" | "signup_athlete" | "onboarding_athlete">("login")
  const [tab, setTab] = useState<NavTab>("home")
  const [signupNotice, setSignupNotice] = useState<string | null>(null)
  const [prefillEmail, setPrefillEmail] = useState("")
  const [pendingAthlete, setPendingAthlete] = useState({
    email: "",
  })

  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileData>({
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.hassan@university.edu.eg",
    age: "21",
    sports: ["Football"],
    university: "Cairo University",
    notInUniversity: false,
    bio: "Striker & Season MVP. Computer Engineering sophomore focused on sports analytics and collegiate tournaments.",
  })

  const go = (t: NavTab) => setTab(t)

  // 1. Marketing Landing Page View
  if (viewMode === "landing") {
    return (
      <LandingPage
        onEnterApp={() => {
          setViewMode("portal")
        }}
        onSignUpAthlete={() => {
          setAuthScreen("signup_athlete")
          setViewMode("portal")
        }}
        onOpenFanHub={(tournamentId, matchId) => {
          setHubTournamentId(tournamentId || null)
          setHubMatchId(matchId || null)
          setViewMode("fanhub")
        }}
      />
    )
  }

  // 2. The Fan Hub (Public App & Engagement)
  if (viewMode === "fanhub") {
    return (
      <FanHubContainer
        initialTournamentId={hubTournamentId}
        initialMatchId={hubMatchId}
        onBackToLanding={() => {
          setHubTournamentId(null)
          setHubMatchId(null)
          setViewMode("landing")
        }}
        onOpenParticipantPortal={() => {
          setViewMode("portal")
        }}
      />
    )
  }

  // 2. Interactive App Portal View
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#07080a] sm:p-4">
      {/* Desktop Floating Link (positioned outside mobile phone frame) */}
      <div className="hidden sm:block fixed left-6 top-6 z-50">
        <button
          type="button"
          onClick={() => setViewMode("landing")}
          className="flex min-h-[42px] items-center gap-2 rounded-xl border border-line bg-ink/90 px-4 py-2 font-mono text-xs text-white backdrop-blur-md transition hover:border-volt hover:text-volt shadow-2xl cursor-pointer active:scale-95"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Website</span>
        </button>
      </div>

      {/* Mobile Top Header (Integrated on phones without obstructing screens) */}
      <div className="flex sm:hidden w-full max-w-[430px] items-center justify-between border-b border-line bg-ink/95 px-4 py-2 pt-[max(0.5rem,env(safe-area-inset-top,0.5rem))] text-xs backdrop-blur-md z-30 shrink-0">
        <button
          type="button"
          onClick={() => setViewMode("landing")}
          className="flex min-h-[36px] items-center gap-1.5 font-mono text-xs text-mute hover:text-volt transition cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Website</span>
        </button>
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
          FNCTN Arena
        </span>
      </div>

      {!authed ? (
        authScreen === "onboarding_athlete" ? (
          <Phone>
            <AthleteOnboarding
              initialData={pendingAthlete}
              onComplete={(profileData) => {
                setAthleteProfile(profileData)
                setPrefillEmail(profileData.email)
                setAuthed(true)
                setTab("profile")
              }}
            />
          </Phone>
        ) : authScreen === "signup_athlete" ? (
          <Phone>
            <AthleteSignUp
              onNavigateToLogin={() => setAuthScreen("login")}
              onSuccess={(info) => {
                setPendingAthlete({
                  email: info.email,
                })
                setAuthScreen("onboarding_athlete")
              }}
            />
          </Phone>
        ) : (
          <LoginView
            onLogin={() => {
              setTab("home")
              setAuthed(true)
            }}
            onNavigateToSignUpAthlete={() => {
              setSignupNotice(null)
              setAuthScreen("signup_athlete")
            }}
            onBackToLanding={() => setViewMode("landing")}
            signupNotice={signupNotice}
            defaultEmail={prefillEmail}
          />
        )
      ) : tab === "home" ? (
        <HomeView go={go} />
      ) : tab === "standings" ? (
        <StandingsView go={go} />
      ) : tab === "profile" ? (
        <ProfileView go={go} profile={athleteProfile} />
      ) : (
        <SettingsView
          go={go}
          onLogout={() => {
            setAuthed(false)
            setAuthScreen("login")
            setSignupNotice(null)
          }}
        />
      )}
    </main>
  )
}
