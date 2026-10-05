/**
 * Text and UI formatting helper functions for FNCTN frontend.
 */

/**
 * Smoothly scrolls the window or view to an element by its ID.
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

/**
 * Extracts 2-letter uppercase initials from a full name (e.g. "Cairo University" -> "CU").
 */
export function formatInitials(name: string): string {
  if (!name) return ""
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/**
 * Formats a score string (e.g. 2, 1 -> "2 : 1").
 */
export function formatScore(scoreA: number, scoreB: number): string {
  return `${scoreA} : ${scoreB}`
}

/**
 * Safely copies text to clipboard with fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    return false
  } catch {
    return false
  }
}
