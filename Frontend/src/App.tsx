import { useState } from "react"
import LandingPage from "./components/LandingPage"
import AthleteSignUp from "./components/AthleteSignUp"
import AthleteOnboarding, {
  type AthleteProfileData,
} from "./components/AthleteOnboarding"
import LoginView from "./components/LoginView"
import { Phone } from "./components/PhoneLayout"
import ParticipantContainer from "./features/Participant/ParticipantContainer"
import OrganizerContainer from "./features/Organizer/OrganizerContainer"
import UniversityAdminContainer from "./features/UniversityAdmin/UniversityAdminContainer"

export type AppViewMode = "landing" | "portal" | "organizer" | "fanhub" | "university"

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>("landing")
  const [authed, setAuthed] = useState(false)
  const [authScreen, setAuthScreen] =
    useState<"login" | "signup_athlete" | "onboarding_athlete">("login")
  const [signupNotice, setSignupNotice] = useState<string | null>(null)
  const [prefillEmail, setPrefillEmail] = useState("")
  const [pendingAthlete, setPendingAthlete] = useState({
    email: "",
  })

  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileData>({
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.hassan@university.edu.eg",
    phoneNumber: "+20 100 123 4567",
    gender: "Male",
    age: "21",
    sports: ["Football"],
    university: "Cairo University",
    bio: "Striker & Season MVP. Computer Engineering sophomore focused on sports analytics and collegiate tournaments.",
  })

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
        onOpenOrganizerPortal={() => {
          setViewMode("organizer")
        }}
        onOpenUniversityPortal={() => {
          setViewMode("university")
        }}
      />
    )
  }

  // 2. Tournament Committee Organizer Command Center
  if (viewMode === "organizer") {
    return (
      <OrganizerContainer
        onBackToLanding={() => setViewMode("landing")}
        onOpenParticipantPortal={() => setViewMode("portal")}
        onOpenUniversity={() => setViewMode("university")}
      />
    )
  }

  // 3. Fan Hub (Deactivated for current release phase)
  if (viewMode === "fanhub") {
    setViewMode("landing")
    return null
  }

  // 4. University Directorate & Registrar Admin Portal
  if (viewMode === "university") {
    return (
      <UniversityAdminContainer
        onBackToLanding={() => setViewMode("landing")}
        onOpenParticipantPortal={() => setViewMode("portal")}
        onOpenOrganizer={() => setViewMode("organizer")}
      />
    )
  }

  // 5. Logged-in Participant (Student Athlete) Portal View
  if (viewMode === "portal" && authed) {
    return (
      <ParticipantContainer
        onBackToLanding={() => setViewMode("landing")}
        onOpenOrganizer={() => setViewMode("organizer")}
        onOpenUniversity={() => setViewMode("university")}
        onLogout={() => {
          setAuthed(false)
          setAuthScreen("login")
          setSignupNotice(null)
        }}
      />
    )
  }

  // 3. Interactive Auth & Portal Gateway View
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#000000] sm:p-4">
      {/* Desktop Floating Link (positioned outside mobile phone frame) */}
      <div className="hidden sm:block fixed left-6 top-6 z-50">
        <button
          type="button"
          onClick={() => setViewMode("landing")}
          className="flex min-h-[42px] items-center gap-2 rounded-xl border border-[#1F1F24] bg-[#0A0A0A]/90 px-4 py-2 font-mono text-xs text-white backdrop-blur-md transition hover:border-[#A60E13] hover:text-[#A60E13] shadow-2xl cursor-pointer active:scale-95"
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
      <div className="flex sm:hidden w-full max-w-[430px] items-center justify-between border-b border-[#1F1F24] bg-[#000000]/95 px-4 py-2 pt-[max(0.5rem,env(safe-area-inset-top,0.5rem))] text-xs backdrop-blur-md z-30 shrink-0">
        <button
          type="button"
          onClick={() => setViewMode("landing")}
          className="flex min-h-[36px] items-center gap-1.5 font-mono text-xs text-[#8E8E93] hover:text-[#A60E13] transition cursor-pointer"
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
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A60E13] animate-pulse" />
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
            onLogin={(role) => {
              if (role === "organizer") {
                setViewMode("organizer")
              } else if (role === "university") {
                setViewMode("university")
              } else {
                setAuthed(true)
              }
            }}
            onNavigateToSignUpAthlete={() => {
              setSignupNotice(null)
              setAuthScreen("signup_athlete")
            }}
            onBackToLanding={() => setViewMode("landing")}
            onOpenOrganizer={() => setViewMode("organizer")}
            onOpenUniversity={() => setViewMode("university")}
            signupNotice={signupNotice}
            defaultEmail={prefillEmail}
          />
        )
      ) : null}
    </main>
  )
}
