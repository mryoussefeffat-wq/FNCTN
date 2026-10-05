import { Phone, Scroll } from "./PhoneLayout"
import Logo from "./Logo"
import { LiveBadge } from "./Badge"
import BottomNav, { type NavTab } from "./BottomNav"
import { PITCH_IMAGE, UPCOMING_GAMES } from "../utils/constants"

interface HomeViewProps {
  go: (tab: NavTab) => void
}

export default function HomeView({ go }: HomeViewProps) {
  return (
    <Phone>
      <Scroll>
        <header className="mb-5 sm:mb-6 flex items-center justify-between">
          <Logo size="text-2xl" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
            Spring Cup &apos;26
          </span>
        </header>

        {/* Featured Live Match */}
        <section className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="relative h-32 sm:h-36">
            <img
              src={PITCH_IMAGE}
              alt="Football pitch under floodlights"
              className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute left-3.5 top-3.5 sm:left-4 sm:top-4 flex items-center gap-2.5 sm:gap-3">
              <LiveBadge />
              <span className="font-mono text-xs text-white">67&apos;</span>
            </div>
          </div>
          <div className="px-3.5 pb-4 sm:px-4 sm:pb-5">
            <p className="mb-2.5 sm:mb-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
              Football · Group A · Match 14
            </p>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-2">
              <div className="text-left">
                <div className="mb-1.5 sm:mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-line bg-ink font-mono text-xs font-bold text-white">
                  CU
                </div>
                <p className="display text-base sm:text-xl leading-tight truncate">
                  Cairo Univ
                </p>
              </div>

              <p className="font-mono text-4xl sm:text-5xl font-bold tabular-nums tracking-tighter">
                2<span className="mx-0.5 sm:mx-1 text-volt">:</span>1
              </p>

              <div className="text-right">
                <div className="mb-1.5 sm:mb-2 ml-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-line bg-ink font-mono text-xs font-bold text-white">
                  AU
                </div>
                <p className="display text-base sm:text-xl leading-tight truncate">
                  AUC
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 sm:mt-5 flex min-h-[46px] w-full items-center justify-center rounded-xl border border-volt/50 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-volt transition hover:bg-volt hover:text-ink active:scale-[0.99] cursor-pointer"
            >
              Follow match
            </button>
          </div>
        </section>

        {/* Up Next Games */}
        <div className="mb-3 mt-6 sm:mt-7 flex items-end justify-between">
          <h2 className="display text-xl sm:text-2xl">Up next</h2>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-mute">
            {UPCOMING_GAMES.length} games
          </span>
        </div>

        <ul className="space-y-2.5">
          {UPCOMING_GAMES.map((g) => (
            <li
              key={g.a + g.b}
              className="flex min-h-[54px] items-center gap-3.5 sm:gap-4 rounded-xl border border-line bg-card px-3.5 py-3 sm:px-4 transition hover:border-volt/60 active:scale-[0.99] cursor-pointer"
            >
              <div className="w-12 sm:w-14 border-r border-line pr-2.5 sm:pr-3 shrink-0">
                <p className="font-mono text-sm sm:text-base font-bold leading-none">
                  {g.time}
                </p>
                <p className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase text-mute">
                  {g.day}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm sm:text-[15px] font-bold">
                  {g.a} <span className="font-normal text-mute">vs</span> {g.b}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-mute">
                  {g.sport}
                </p>
              </div>
              <span className="text-mute shrink-0">›</span>
            </li>
          ))}
        </ul>
      </Scroll>
      <BottomNav active="home" go={go} />
    </Phone>
  )
}
