import type { ReactNode } from "react"

/**
 * Mobile device frame container simulation on desktop,
 * and seamless full-viewport experience on mobile devices.
 */
export function Phone({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-ink sm:h-[min(calc(100dvh-32px),880px)] sm:rounded-[36px] sm:border sm:border-line sm:shadow-2xl sm:shadow-black ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Scrollable content container with touch momentum scrolling,
 * responsive padding, and safe area spacing for bottom navigation.
 */
export function Scroll({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`no-scrollbar absolute inset-0 overflow-y-auto px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] pt-4 sm:px-5 sm:pb-32 sm:pt-6 [overscroll-behavior-y:contain] [-webkit-overflow-scrolling:touch] ${className}`}
    >
      {children}
    </div>
  )
}
