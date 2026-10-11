import type { ReactNode } from "react"

export type NavTab = "home" | "standings" | "profile" | "settings"

const icons: Record<NavTab, ReactNode> = {
  home: (
    <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" />
  ),
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
}

function NavIcon({ name, active }: { name: NavTab active?: boolean }) {
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
      className="shrink-0"
    >
      {icons[name]}
    </svg>
  )
}

interface BottomNavProps {
  active: NavTab
  go: (tab: NavTab) => void
}

export default function BottomNav({ active, go }: BottomNavProps) {
  const items: [NavTab, string][] = [
    ["home", "Home"],
    ["standings", "Standings"],
    ["profile", "Profile"],
    ["settings", "Settings"],
  ]

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line bg-ink/95 px-1 pb-[max(0.75rem,calc(0.5rem+env(safe-area-inset-bottom,0px)))] pt-2 backdrop-blur-md">
      {items.map(([k, label]) => {
        const on = k === active
        return (
          <button
            key={k}
            type="button"
            onClick={() => go(k)}
            aria-current={on ? "page" : undefined}
            className={`flex min-h-[48px] flex-col items-center justify-center gap-1 py-1 transition-all active:scale-95 cursor-pointer ${
              on ? "text-volt font-bold" : "text-mute hover:text-white"
            }`}
          >
            <NavIcon name={k} active={on} />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {label}
            </span>
            <span
              className={`h-0.5 w-6 rounded-full transition-all ${
                on
                  ? "bg-volt shadow-[0_0_8px_rgba(166,14,19,0.8)]"
                  : "bg-transparent"
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
