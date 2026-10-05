import type { ReactNode } from "react"

export function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="live-glow inline-flex items-center gap-1.5 rounded-full bg-volt px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
      {label}
    </span>
  )
}

interface BadgeProps {
  children: ReactNode
  variant?: "volt" | "outline" | "card"
  className?: string
}

export function Badge({
  children,
  variant = "volt",
  className = "",
}: BadgeProps) {
  const styles = {
    volt: "border-volt/30 bg-volt/10 text-volt",
    outline: "border-line bg-card text-mute",
    card: "border-line bg-ink text-white",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
