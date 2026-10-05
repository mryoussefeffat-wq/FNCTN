import { useState } from "react"
import { Phone, Scroll } from "./PhoneLayout"
import Logo from "./Logo"
import Toggle from "./Toggle"
import BottomNav, { type NavTab } from "./BottomNav"

interface SettingsViewProps {
  go: (tab: NavTab) => void
  onLogout: () => void
}

export default function SettingsView({ go, onLogout }: SettingsViewProps) {
  const [prefs, setPrefs] = useState({
    live: true,
    results: true,
    reminders: false,
  })

  const rows: [keyof typeof prefs, string, string][] = [
    ["live", "Live match alerts", "Goals and final whistles"],
    ["results", "Result summaries", "Daily recap of your teams"],
    ["reminders", "Kick-off reminders", "30 minutes before start"],
  ]

  return (
    <Phone>
      <Scroll>
        <header className="mb-4 sm:mb-5 flex items-center justify-between">
          <Logo size="text-2xl" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
            v1.0
          </span>
        </header>
        <h1 className="display mb-4 sm:mb-5 text-3xl sm:text-4xl leading-none">
          Settings
        </h1>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-mute">
          Notifications
        </p>
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          {rows.map(([k, title, sub]) => (
            <div
              key={k}
              className="flex min-h-[54px] items-center justify-between border-b border-line/60 px-3.5 sm:px-4 py-3 sm:py-3.5 last:border-0"
            >
              <div className="pr-3">
                <p className="text-xs sm:text-sm font-bold text-white">
                  {title}
                </p>
                <p className="text-[11px] sm:text-xs text-mute">{sub}</p>
              </div>
              <Toggle
                label={title}
                on={prefs[k]}
                onChange={(v) => setPrefs({ ...prefs, [k]: v })}
              />
            </div>
          ))}
        </div>

        <p className="mb-2 mt-5 sm:mt-6 font-mono text-[10px] uppercase tracking-widest text-mute">
          Account
        </p>
        <div className="overflow-hidden rounded-xl border border-line bg-card">
          <button
            type="button"
            onClick={() => go("profile")}
            className="flex min-h-[50px] w-full items-center justify-between px-3.5 sm:px-4 py-3 text-left text-xs sm:text-sm font-bold text-white transition hover:text-volt cursor-pointer active:bg-ink/50"
          >
            <span>View athlete profile</span>
            <span className="text-mute text-base">›</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-xl border border-line py-3 text-xs sm:text-sm font-bold text-white transition hover:border-volt hover:text-volt cursor-pointer active:scale-[0.99]"
        >
          Log out
        </button>
      </Scroll>
      <BottomNav active="settings" go={go} />
    </Phone>
  )
}
