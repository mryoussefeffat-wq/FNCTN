import { Phone, Scroll } from "./PhoneLayout"
import Logo from "./Logo"
import BottomNav, { type NavTab } from "./BottomNav"
import type { AthleteProfileData } from "./AthleteOnboarding"
import { PLAYER_IMAGE, CROWD_IMAGE } from "../utils/constants"

interface ProfileViewProps {
  go: (tab: NavTab) => void
  profile?: AthleteProfileData
}

export default function ProfileView({ go, profile }: ProfileViewProps) {
  const stats = [
    ["Goals", "14"],
    ["Assists", "9"],
    ["Top speed", "34.2"],
    ["Matches", "22"],
  ]

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Omar Hassan"
  const university = profile ? profile.university : "Cairo University"
  const sports = profile?.sports?.length ? profile.sports : ["Football"]
  const ageTag = profile?.age ? ` · Age ${profile.age}` : ""
  const bio = profile?.bio

  return (
    <Phone>
      <Scroll className="pb-36 sm:pb-36">
        <header className="mb-4 sm:mb-5 flex items-center justify-between">
          <Logo size="text-2xl" />
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
            Scout view
          </span>
        </header>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full border-2 border-volt p-1">
            <img
              src={PLAYER_IMAGE}
              alt={`${fullName}, athlete`}
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-card object-cover"
            />
          </div>
          <h1 className="display mt-3.5 sm:mt-4 text-3xl sm:text-4xl leading-none">
            {fullName}
          </h1>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-mute">
            {university}
          </p>
          <p className="mt-1.5 sm:mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-volt">
            {sports.join(" · ")}
            {ageTag}
          </p>
        </div>

        {/* Bio Card */}
        {bio && (
          <div className="mt-4 sm:mt-5 rounded-xl border border-line bg-card p-3.5 sm:p-4 text-left">
            <p className="mb-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-volt">
              Athlete Bio &amp; Achievements
            </p>
            <p className="text-xs leading-relaxed text-mute">{bio}</p>
          </div>
        )}

        {/* Athletic Stats */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-2.5">
          {stats.map(([k, v]) => (
            <div
              key={k}
              className="rounded-xl border border-line bg-card p-3.5 sm:p-4"
            >
              <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums">
                {v}
                {k === "Top speed" && (
                  <span className="ml-1 text-xs text-mute">km/h</span>
                )}
              </p>
              <p className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mute">
                {k}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Reel */}
        <h2 className="display mb-2.5 sm:mb-3 mt-5 sm:mt-6 text-xl sm:text-2xl">
          Highlight reel
        </h2>
        <button
          type="button"
          className="group relative block h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-line bg-card cursor-pointer active:scale-[0.99]"
        >
          <img
            src={CROWD_IMAGE}
            alt="Match highlight thumbnail"
            className="h-full w-full object-cover opacity-60 transition group-hover:opacity-80"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-volt text-white transition group-hover:scale-110 shadow-lg shadow-volt/20">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded bg-ink/80 px-1.5 py-0.5 font-mono text-[10px]">
            2:14
          </span>
        </button>
      </Scroll>

      {/* Floating CTA with mobile safe area bottom */}
      <div className="absolute inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-10 bg-gradient-to-t from-ink via-ink to-transparent px-4 pb-2 pt-6 sm:px-5 sm:pb-3">
        <button
          type="button"
          className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-volt py-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition hover:brightness-110 active:scale-[0.99] shadow-lg shadow-volt/20 cursor-pointer"
        >
          Contact for Scouting
        </button>
      </div>

      <BottomNav active="profile" go={go} />
    </Phone>
  )
}
