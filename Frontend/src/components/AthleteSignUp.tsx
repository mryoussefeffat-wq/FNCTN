import { useState, type FormEvent } from "react"
import { registerAthlete } from "../services/auth"
import { validateAthleteSignUp } from "../utils/validation"

interface AthleteSignUpProps {
  onNavigateToLogin: () => void
  onSuccess: (info: {
    email: string
    fullName: string
    firstName: string
    familyName: string
  }) => void
}

export default function AthleteSignUp({
  onNavigateToLogin,
  onSuccess,
}: AthleteSignUpProps) {
  const [firstName, setFirstName] = useState("")
  const [familyName, setFamilyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const isPasswordValid = password.length >= 8

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    // Validate using utility function
    const validation = validateAthleteSignUp({
      firstName,
      familyName,
      email,
      password,
    })

    if (!validation.valid) {
      setErrorMessage(validation.error || "Please check your inputs.")
      return
    }

    setLoading(true)

    try {
      const result = await registerAthlete({
        firstName,
        familyName,
        email,
        password,
      })

      setSuccessMessage(
        `Welcome aboard, ${result.full_name}! Setting up your questionnaire...`,
      )

      setTimeout(() => {
        onSuccess({
          email: result.email,
          fullName: result.full_name,
          firstName: firstName.trim(),
          familyName: familyName.trim(),
        })
      }, 1000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-y-auto px-5 py-6 sm:px-8 no-scrollbar">
      {/* Header bar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-mute transition hover:text-volt cursor-pointer"
          aria-label="Back to Log In"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
          Athlete Portal
        </span>
      </div>

      {/* Title & Headline */}
      <div className="mb-6">
        <h1 className="display text-3xl leading-none text-white sm:text-4xl">
          Create Student <br />
          <span className="text-volt">Athlete</span> Account
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-mute">
          Track tournament fixtures, view live match scores, and build your
          verified athletic profile for university scouts.
        </p>
      </div>

      {/* Success notification */}
      {successMessage && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-volt/50 bg-volt/15 p-4 text-xs font-medium text-white shadow-lg shadow-volt/10"
        >
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-volt shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="leading-tight">{successMessage}</p>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-volt">
            Redirecting to sign in...
          </p>
        </div>
      )}

      {/* Error notification */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-xs text-red-200"
        >
          <div className="flex items-start gap-2">
            <svg
              className="mt-0.5 h-4 w-4 text-red-400 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="leading-snug">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
              First Name
            </span>
            <input
              type="text"
              name="given-name"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Omar"
              disabled={loading || Boolean(successMessage)}
              className="w-full min-h-[46px] rounded-xl border border-line bg-card px-4 py-3 text-base sm:text-sm text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40 disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
              Family Name
            </span>
            <input
              type="text"
              name="family-name"
              autoComplete="family-name"
              required
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g. Hassan"
              disabled={loading || Boolean(successMessage)}
              className="w-full min-h-[46px] rounded-xl border border-line bg-card px-4 py-3 text-base sm:text-sm text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40 disabled:opacity-50"
            />
          </label>
        </div>

        {/* Email Field */}
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
            Email Address
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="athlete@university.edu.eg"
            disabled={loading || Boolean(successMessage)}
            className="w-full min-h-[46px] rounded-xl border border-line bg-card px-4 py-3 text-base sm:text-sm text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40 disabled:opacity-50"
          />
        </label>

        {/* Password Field */}
        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              Password
            </span>
            <span
              className={`font-mono text-[10px] ${
                password.length === 0
                  ? "text-mute"
                  : isPasswordValid
                    ? "text-volt"
                    : "text-amber-400"
              }`}
            >
              {password.length === 0
                ? "Min 8 characters"
                : isPasswordValid
                  ? "✓ 8+ chars"
                  : `${password.length}/8 chars`}
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="new-password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={loading || Boolean(successMessage)}
              className="w-full min-h-[46px] rounded-xl border border-line bg-card px-4 py-3 pr-11 text-base sm:text-sm text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-mute transition hover:text-white cursor-pointer"
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || Boolean(successMessage)}
          className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-volt py-3.5 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-ink"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Student Athlete Account</span>
          )}
        </button>
      </form>

      {/* Switch to login option */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center text-xs pb-6">
        <p className="text-mute">
          Already registered?{" "}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt cursor-pointer py-1"
          >
            Log in to your account
          </button>
        </p>

        <p className="max-w-[280px] font-mono text-[10px] leading-normal text-mute/60">
          By signing up, you agree to official tournament participation and
          university eligibility guidelines.
        </p>
      </div>
    </div>
  )
}
