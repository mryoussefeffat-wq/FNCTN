import { useState, useEffect, type FormEvent } from "react"
import { Phone } from "./PhoneLayout"
import Logo from "./Logo"
import Field from "./Field"

interface LoginViewProps {
  onLogin: () => void
  onNavigateToSignUpAthlete: () => void
  onBackToLanding?: () => void
  signupNotice?: string | null
  defaultEmail?: string
}

export default function LoginView({
  onLogin,
  onNavigateToSignUpAthlete,
  onBackToLanding,
  signupNotice,
  defaultEmail = "",
}: LoginViewProps) {
  const [email, setEmail] = useState(defaultEmail)
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail)
    }
  }, [defaultEmail])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onLogin()
  }

  return (
    <Phone>
      <div className="relative flex min-h-full flex-col justify-center px-6 py-10 sm:px-8 overflow-y-auto no-scrollbar">
        {onBackToLanding && (
          <button
            type="button"
            onClick={onBackToLanding}
            className="absolute left-6 top-6 inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition hover:text-volt cursor-pointer"
          >
            ← Back to Website
          </button>
        )}

        <div className="mb-6 sm:mb-8 text-center pt-8 sm:pt-0">
          <Logo size="text-5xl sm:text-6xl" />
          <p className="mt-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-mute">
            University tournaments. Live.
          </p>
        </div>

        {signupNotice && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-volt/50 bg-volt/15 p-3.5 text-xs text-white"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 shrink-0 text-volt"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{signupNotice}</span>
            </div>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field
            label="Email"
            type="email"
            placeholder="you@university.edu.eg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-volt py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-[0.99] cursor-pointer"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onNavigateToSignUpAthlete}
            className="font-bold text-white underline decoration-volt decoration-2 underline-offset-4 hover:text-volt cursor-pointer py-1"
          >
            Create Student Athlete Account
          </button>
          <a
            href="#"
            className="text-mute underline underline-offset-4 hover:text-white py-1"
          >
            Apply for Scout Access
          </a>
        </div>
      </div>
    </Phone>
  )
}
