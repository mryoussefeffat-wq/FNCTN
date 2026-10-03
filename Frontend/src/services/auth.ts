/**
 * Client-side Authentication service for FNCTN Frontend (Standalone / UI Mode).
 * Operates purely in-memory and in localStorage without requiring a backend connection.
 */

export interface AthleteSignUpPayload {
  firstName: string;
  familyName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  full_name: string;
  role: string;
  university_id?: number | null;
  created_at?: string;
}

const STORAGE_KEY = "fnctn_athletes_mock";

function getLocalAthletes(): Record<
  string,
  { fullName: string; role: string }
> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeLocalAthlete(email: string, fullName: string) {
  try {
    const athletes = getLocalAthletes();
    athletes[email.toLowerCase()] = { fullName, role: "participant" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(athletes));
  } catch {
    // Graceful fallback for storage-restricted environments
  }
}

/**
 * Register a student athlete purely on the client-side.
 * Simulates network response smoothly without reaching out to any backend.
 */
export async function registerAthlete(
  data: AthleteSignUpPayload
): Promise<SignUpResponse> {
  const cleanEmail = data.email.trim().toLowerCase();
  const fullName = `${data.firstName.trim()} ${data.familyName.trim()}`;

  // Realistic UI loading simulation
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if athlete is already in local state
  const existing = getLocalAthletes();
  if (existing[cleanEmail]) {
    throw new Error("An athlete account with this email already exists.");
  }

  // Save athlete locally
  storeLocalAthlete(cleanEmail, fullName);

  return {
    id: Date.now(),
    email: cleanEmail,
    full_name: fullName,
    role: "participant",
    created_at: new Date().toISOString(),
  };
}
