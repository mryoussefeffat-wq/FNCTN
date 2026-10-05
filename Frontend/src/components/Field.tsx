import type { ChangeEvent } from "react"

interface FieldProps {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
  error?: string
  autoComplete?: string
  name?: string
}

export default function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  error,
  autoComplete,
  name,
}: FieldProps) {
  return (
    <label className={`block text-left ${className}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
        {label}
        {required && <span className="ml-1 text-volt">*</span>}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full min-h-[46px] rounded-xl border bg-card px-4 py-3 text-base sm:text-sm text-white outline-none transition placeholder:text-mute/60 focus:border-volt focus:ring-2 focus:ring-volt/30 disabled:opacity-50 ${
          error ? "border-red-500" : "border-line"
        }`}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      )}
    </label>
  )
}
