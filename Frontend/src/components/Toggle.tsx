interface ToggleProps {
  on: boolean
  onChange: (value: boolean) => void
  label: string
  disabled?: boolean
}

export default function Toggle({
  on,
  onChange,
  label,
  disabled = false,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full border transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
        on ? "border-[#A60E13] bg-[#A60E13]" : "border-line bg-[#0A0A0A]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all shadow-sm ${
          on ? "left-[22px] bg-white" : "left-1 bg-mute"
        }`}
      />
    </button>
  )
}
