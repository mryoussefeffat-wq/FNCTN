interface LogoProps {
  size?: string
  subtitle?: string
  className?: string
}

export default function Logo({
  size = "text-2xl",
  subtitle,
  className = "",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`display ${size} leading-none tracking-tight text-white`}
      >
        FN<span className="text-volt">CTN</span>
      </span>
      {subtitle && (
        <span className="hidden rounded-full border border-volt/30 bg-volt/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-volt sm:inline-block">
          {subtitle}
        </span>
      )}
    </div>
  )
}
