/**
 * Form validation helper functions for FNCTN frontend.
 */

/**
 * Validates whether an email string contains standard email formatting.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  const trimmed = email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(trimmed)
}

/**
 * Validates minimum string length.
 */
export function isMinLength(value: string, min: number): boolean {
  return typeof value === "string" && value.trim().length >= min
}

/**
 * Validates athlete sign-up fields.
 */
export function validateAthleteSignUp(data: {
  email: string
  password: string
}): { valid: boolean; error?: string } {
  if (!isValidEmail(data.email)) {
    return {
      valid: false,
      error: "Please enter a valid university or personal email address.",
    }
  }
  if (!isMinLength(data.password, 8)) {
    return {
      valid: false,
      error: "Password must be at least 8 characters long.",
    }
  }
  return { valid: true }
}

/**
 * Validates athlete onboarding profile details.
 */
export function validateAthleteOnboarding(data: {
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  age: string
  sports: string[]
  university: string
}): { valid: boolean; error?: string } {
  if (!data.firstName.trim() || !data.lastName.trim()) {
    return { valid: false, error: "First and last name are required." }
  }

  if (!data.phoneNumber.trim()) {
    return { valid: false, error: "Please enter your phone number." }
  }

  if (!data.gender.trim()) {
    return { valid: false, error: "Please select your gender." }
  }

  const ageNum = parseInt(data.age, 10)
  if (!data.age || isNaN(ageNum) || ageNum < 15 || ageNum > 45) {
    return {
      valid: false,
      error: "Please enter a valid collegiate athlete age (15–45).",
    }
  }

  if (!data.sports.length) {
    return {
      valid: false,
      error: "Please select at least one primary sport.",
    }
  }

  if (!data.university.trim()) {
    return {
      valid: false,
      error: "Please choose or specify your affiliated university.",
    }
  }

  return { valid: true }
}
