interface LogoProps {
  size?: string
  subtitle?: string
  className?: string
  showIcon?: boolean
}

/**
 * Brand Icon: Dark grey square with white "FN" and a prominent red dot (#A60E13)
 * per FNCTN branding specifications.
 */
export function FnIcon({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs rounded-md",
    md: "h-8 w-8 text-sm rounded-lg",
    lg: "h-10 w-10 text-base rounded-xl",
  }[size]

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  }[size]

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 bg-[#1C1C1E] border border-[#2C2C2E] shadow-sm select-none ${sizeClasses} ${className}`}
      aria-label="FNCTN Icon"
    >
      <div className="flex items-center justify-center font-sans font-black tracking-tight text-white">
        <span>FN</span>
        <span className={`rounded-full bg-[#A60E13] shrink-0 ml-0.5 ${dotSizes}`} />
      </div>
    </div>
  )
}

/**
 * Full Logo: Complete wordmark FNCTN in clean White (#FFFFFF) sans-serif Poppins.
 */
export default function Logo({
  size = "text-2xl",
  subtitle,
  className = "",
  showIcon = false,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {showIcon && <FnIcon size="md" />}
      <span
        className={`font-sans font-black ${size} leading-none tracking-tight text-white`}
      >
        FNCTN
      </span>
      {subtitle && (
        <span className="hidden rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-white sm:inline-block">
          {subtitle}
        </span>
      )}
    </div>
  )
}

