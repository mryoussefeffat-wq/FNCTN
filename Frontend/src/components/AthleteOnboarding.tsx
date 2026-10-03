import { useState, type FormEvent } from "react";

export interface AthleteProfileData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  sports: string[];
  university: string;
  notInUniversity: boolean;
  bio: string;
}

interface AthleteOnboardingProps {
  initialData: {
    email: string;
  };
  onComplete: (profile: AthleteProfileData) => void;
}

const POPULAR_SPORTS = [
  "Football",
  "Basketball",
  "Padel",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Track & Field",
  "Handball",
  "Squash",
  "CrossFit",
];

const UNIVERSITIES = [
  "Cairo University",
  "American University in Cairo (AUC)",
  "German University in Cairo (GUC)",
  "British University in Egypt (BUE)",
  "Ain Shams University",
  "Misr International University (MIU)",
  "Modern Sciences and Arts University (MSA)",
  "Helwan University",
  "Alexandria University",
  "Other / Unlisted",
];

export default function AthleteOnboarding({
  initialData,
  onComplete,
}: AthleteOnboardingProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>(["Football"]);
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [customUniversity, setCustomUniversity] = useState("");
  const [notInUniversity, setNotInUniversity] = useState(false);
  const [bio, setBio] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleSport(sport: string) {
    setSelectedSports((prev) => {
      if (prev.includes(sport)) {
        if (prev.length === 1) {
          setError("Please select at least one sport.");
          return prev;
        }
        setError(null);
        return prev.filter((s) => s !== sport);
      } else {
        setError(null);
        return [...prev, sport];
      }
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Please provide your first name.");
      return;
    }
    if (!lastName.trim()) {
      setError("Please provide your last name.");
      return;
    }
    if (!age || Number(age) < 14 || Number(age) > 60) {
      setError("Please enter a valid age between 14 and 60.");
      return;
    }
    if (selectedSports.length === 0) {
      setError("Please select at least one sport.");
      return;
    }

    let finalUniversity = notInUniversity ? "Independent Athlete" : university;
    if (!notInUniversity && university === "Other / Unlisted") {
      if (!customUniversity.trim()) {
        setError("Please enter your university name.");
        return;
      }
      finalUniversity = customUniversity.trim();
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onComplete({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: initialData.email,
        age: age.trim(),
        sports: selectedSports,
        university: finalUniversity,
        notInUniversity,
        bio: bio.trim(),
      });
    }, 400);
  }

  return (
    <div className="relative flex h-full flex-col overflow-y-auto px-6 py-6 no-scrollbar sm:px-8">
      {/* Top Bar with Mandatory Indicator */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
            Required Setup
          </span>
          <span className="text-mute/40">/</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
            Athlete Profile
          </span>
        </div>

        <span className="rounded-full border border-volt/30 bg-volt/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-volt">
          Mandatory
        </span>
      </div>

      {/* Progress Line */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full w-full bg-volt transition-all duration-500" />
      </div>

      {/* Headline */}
      <div className="mb-6">
        <h1 className="display text-3xl leading-none text-white sm:text-4xl">
          Athlete <span className="text-volt">Profile</span>
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-mute">
          Tell us about your game. Scouts and tournament organizers use these
          details to verify eligibility, rosters, and scout reports.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200"
        >
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-red-400 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Questionnaire Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pb-8">
        {/* Name Grid (Empty inputs, not prefilled) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
              First Name
            </span>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Omar"
              className="w-full rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-mute">
              Family Name
            </span>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Hassan"
              className="w-full rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40"
            />
          </label>
        </div>

        {/* Age Field */}
        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              Age
            </span>
            <span className="font-mono text-[10px] text-mute">Years (14–60)</span>
          </div>
          <input
            type="number"
            min="14"
            max="60"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 20"
            className="w-full rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40"
          />
        </label>

        {/* Multiple Sports Selection */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              Sports (Select all that apply)
            </span>
            <span className="font-mono text-[10px] text-volt">
              {selectedSports.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SPORTS.map((s) => {
              const isSelected = selectedSports.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSport(s)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-bold transition select-none ${
                    isSelected
                      ? "border border-volt bg-volt text-ink shadow-sm shadow-volt/20"
                      : "border border-line bg-card text-mute hover:border-volt/50 hover:text-white"
                  }`}
                >
                  <span className="text-[11px] leading-none">
                    {isSelected ? "✓" : "+"}
                  </span>
                  <span>{s}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* University Section */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              University Affiliation
            </span>

            {/* Not in university Checkbox */}
            <label className="inline-flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={notInUniversity}
                onChange={(e) => setNotInUniversity(e.target.checked)}
                className="h-4 w-4 rounded border-line bg-card text-volt accent-[#ccff00] focus:ring-volt/40 focus:ring-offset-ink"
              />
              <span className="font-mono text-[11px] text-white">
                Not in university
              </span>
            </label>
          </div>

          {!notInUniversity ? (
            <>
              <div className="relative">
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-line bg-card px-3.5 py-3 pr-10 text-[14px] text-white outline-none transition focus:border-volt focus:ring-1 focus:ring-volt/40"
                >
                  {UNIVERSITIES.map((u) => (
                    <option key={u} value={u} className="bg-ink text-white">
                      {u}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-mute">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {university === "Other / Unlisted" && (
                <input
                  type="text"
                  value={customUniversity}
                  onChange={(e) => setCustomUniversity(e.target.value)}
                  placeholder="Enter your institution name"
                  className="w-full rounded-xl border border-line bg-card px-3.5 py-3 text-[14px] text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40"
                />
              )}
            </>
          ) : (
            <div className="flex items-center gap-2.5 rounded-xl border border-line/60 bg-card/60 p-3.5 text-xs text-mute">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-volt/10 font-mono text-[10px] font-bold text-volt">
                ✓
              </span>
              <span>
                Registered as an <strong className="text-white">Independent / Free Agent Athlete</strong>. You can compete in open tournaments.
              </span>
            </div>
          )}
        </div>

        {/* Bio, Achievements & Major Studies Plans */}
        <label className="block pt-1">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
              Athlete Bio &amp; Academic Plans
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-mute">
              Optional
            </span>
          </div>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell scouts about your sports achievements, tournament awards, best scores or times (e.g. 100m sprint: 10.8s, 22 goals in Season 25), and your academic major or study plans (e.g. Computer Science major at AUC)..."
            className="w-full rounded-xl border border-line bg-card px-3.5 py-3 text-[13px] leading-relaxed text-white outline-none transition placeholder:text-mute/50 focus:border-volt focus:ring-1 focus:ring-volt/40 resize-none"
          />
        </label>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-volt py-3.5 text-xs font-extrabold uppercase tracking-widest text-ink transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <span>Saving Profile...</span>
          ) : (
            <span>Complete Profile &amp; Enter Arena</span>
          )}
        </button>
      </form>

      {/* Footer Info */}
      <p className="mt-2 text-center font-mono text-[10px] leading-relaxed text-mute/60">
        You can update your sports roster, positions, and academic bio anytime in Settings.
      </p>
    </div>
  );
}
