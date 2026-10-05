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
        on ? "border-volt bg-volt" : "border-line bg-ink"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
          on ? "left-[22px] bg-ink" : "left-1 bg-mute"
        }`}
      />
    </button>
  )
}
