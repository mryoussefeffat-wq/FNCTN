import type {
  AthleteProfile,
  ParticipantTeam,
  UpcomingMatch,
  ParticipantAlert,
} from "../../types/participant"

export const INITIAL_ATHLETE_PROFILE: AthleteProfile = {
  id: "ath-omar-9",
  firstName: "Omar",
  lastName: "Hassan",
  email: "omar.hassan@eng.cu.edu.eg",
  phone: "+20 100 554 9922",
  university: "Cairo University",
  faculty: "Faculty of Engineering",
  academicYear: "Junior (Year 3)",
  studentIdNumber: "CU-ENG-2023-4819",
  nationalIdNumber: "30209140102934",
  sports: ["Football", "Futsal"],
  primaryPosition: "Centre Forward (Striker)",
  jerseyNumber: 9,
  dominantFoot: "Right",
  heightCm: 184,
  weightKg: 78,
  bio: "Striker & Season MVP contender. Computer Engineering junior combining physical attacking presence with tactical data analysis. 14 tournament goals in the 2025/2026 season.",
  photoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  studentIdDoc: {
    type: "student_id",
    status: "verified",
    fileName: "cairo_univ_student_card_omar_hassan.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80",
    uploadedAt: "2026-09-15T10:30:00Z",
  },
  nationalIdDoc: {
    type: "national_id",
    status: "verified",
    fileName: "egypt_national_id_card_front.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    uploadedAt: "2026-09-15T10:32:00Z",
  },
  overallVerificationStatus: "verified",
  scoutViews: 48,
  stats: {
    goals: 14,
    assists: 9,
    matchesPlayed: 12,
    mvpAwards: 3,
    topSpeedKmH: 34.2,
  },
}

export const INITIAL_PARTICIPANT_TEAM: ParticipantTeam = {
  id: "team-cairo-wolves",
  name: "Cairo Wolves FC",
  code: "CAI-782",
  sport: "Football",
  university: "Cairo University",
  logoUrl:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80",
  color: "#A60E13",
  captainId: "ath-omar-9",
  captainName: "Omar Hassan",
  createdAt: "2026-09-10",
  record: {
    wins: 5,
    losses: 1,
    draws: 1,
  },
  appliedTournaments: [
    {
      tournamentId: "football-cup-26",
      tournamentTitle: "Egyptian Collegiate Football Cup 2026",
      appliedAt: "2026-09-20",
      status: "approved",
      seedGroup: "Group A",
    },
  ],
  roster: [
    {
      id: "ath-omar-9",
      name: "Omar Hassan",
      role: "Captain",
      jerseyNumber: 9,
      position: "Striker",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-tarek-10",
      name: "Tarek Zaki",
      role: "Player",
      jerseyNumber: 10,
      position: "Attacking Midfielder",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-karim-7",
      name: "Karim Fouad",
      role: "Player",
      jerseyNumber: 7,
      position: "Right Winger",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-ziad-4",
      name: "Ziad Mansour",
      role: "Player",
      jerseyNumber: 4,
      position: "Centre Back",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-mostafa-1",
      name: "Mostafa El-Sayed",
      role: "Player",
      jerseyNumber: 1,
      position: "Goalkeeper",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-ahmed-8",
      name: "Ahmed Nabil",
      role: "Player",
      jerseyNumber: 8,
      position: "Central Midfielder",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-youssef-11",
      name: "Youssef Radi",
      role: "Substitute",
      jerseyNumber: 11,
      position: "Left Winger",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
  ],
}

export const SECOND_PARTICIPANT_TEAM: ParticipantTeam = {
  id: "team-cairo-padel",
  name: "Cairo Padel Knights",
  code: "CAI-310",
  sport: "Padel",
  university: "Cairo University",
  logoUrl:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=300&q=80",
  color: "#1D4ED8",
  captainId: "ath-ziad-4",
  captainName: "Ziad Mansour",
  createdAt: "2026-09-18",
  record: {
    wins: 3,
    losses: 0,
    draws: 0,
  },
  appliedTournaments: [
    {
      tournamentId: "cairo-padel-26",
      tournamentTitle: "Cairo Intercollegiate Padel Open 2026",
      appliedAt: "2026-09-22",
      status: "applied",
      seedGroup: "Men's Doubles Division 1",
    },
  ],
  roster: [
    {
      id: "ath-ziad-4",
      name: "Ziad Mansour",
      role: "Captain",
      jerseyNumber: 1,
      position: "Right Side / Driver",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
    {
      id: "ath-omar-9",
      name: "Omar Hassan",
      role: "Player",
      jerseyNumber: 2,
      position: "Left Side / Smasher",
      university: "Cairo University",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verificationStatus: "verified",
    },
  ],
}

export const INITIAL_PARTICIPANT_TEAMS: ParticipantTeam[] = [
  INITIAL_PARTICIPANT_TEAM,
  SECOND_PARTICIPANT_TEAM,
]

export const UPCOMING_PARTICIPANT_MATCHES: UpcomingMatch[] = [
  {
    id: "match-cup-qf-auc",
    tournamentTitle: "Egyptian Collegiate Football Cup 2026",
    round: "Quarter-Final 1",
    dateTime: "Tomorrow, 18:30",
    dateFormatted: "Wednesday, Oct 7, 2026",
    timeFormatted: "18:30 CLT",
    countdownText: "Kick-off in 17h 45m",
    venue: "Cairo International Stadium Olympic Complex",
    pitch: "Field B (Pitch 3)",
    rollCallTime: "18:15 CLT (15 mins prior)",
    opponentTeam: "AUC Titans",
    opponentUniversity: "American University in Cairo",
    opponentLogo: "AUC",
    jerseyColor: "Red Primary vs White Away",
    referee: "Capt. Sherif Amin (FIFA Accredited)",
  },
  {
    id: "match-cup-guc",
    tournamentTitle: "Egyptian Collegiate Football Cup 2026",
    round: "Semi-Final / Bracket 2",
    dateTime: "Friday, Oct 9, 2026",
    dateFormatted: "Friday, Oct 9, 2026",
    timeFormatted: "20:00 CLT",
    countdownText: "In 3 days",
    venue: "New Administrative Capital Sports City",
    pitch: "Stadium Pitch 1",
    rollCallTime: "19:45 CLT",
    opponentTeam: "GUC Eagles",
    opponentUniversity: "German University in Cairo",
    opponentLogo: "GUC",
    jerseyColor: "Red Primary vs Blue Away",
    referee: "Capt. Tamer Farouk",
  },
]

export const INITIAL_PARTICIPANT_ALERTS: ParticipantAlert[] = [
  {
    id: "alert-roll-call",
    type: "match_roll_call",
    title: "Official Pitch Roll Call in 17h",
    message:
      "Match referee roll call for Cairo Wolves vs AUC Titans commences 15 mins before kick-off at Field B, Pitch 3. Ensure your Digital Athlete Pass is ready on your phone.",
    severity: "urgent",
    actionText: "View Match Pass",
    actionTarget: "match_pass",
    timestamp: "10 mins ago",
  },
  {
    id: "alert-id-verified",
    type: "id_verification",
    title: "Accreditation Granted",
    message:
      "Your Official Cairo University Student ID & National ID have been reviewed and approved by the Tournament Committee. Official Collegiate Player License #EGY-2026-0941 is active.",
    severity: "success",
    actionText: "View Clearance",
    actionTarget: "profile",
    timestamp: "2 hours ago",
  },
  {
    id: "alert-scout-views",
    type: "scout_interest",
    title: "3 Professional Scouts Viewed Your Profile",
    message:
      "Scouts from Al Ahly SC Youth Academy, ENPPI Scouting Network, and Pyramids FC monitored your telemetry and highlight reels following your 2 goals against Ain Shams.",
    severity: "info",
    actionText: "Check Stats",
    actionTarget: "profile",
    timestamp: "Yesterday",
  },
]

export const AVAILABLE_COLLEGIATE_TOURNAMENTS = [
  {
    id: "football-cup-26",
    title: "Egyptian Collegiate Football Cup 2026",
    sport: "Football",
    dates: "Oct 15 - Nov 2, 2026",
    entryFee: "EGP 0 (Sponsored Entry)",
    maxTeams: 16,
    registeredTeams: 14,
    venue: "Cairo International Stadium Complex",
    status: "registration_open",
    minRoster: 7,
    maxRoster: 11,
  },
  {
    id: "winter-derby-26",
    title: "Alexandria University Winter Derby 2026",
    sport: "Football",
    dates: "Nov 12 - Nov 26, 2026",
    entryFee: "EGP 500 / Team",
    maxTeams: 12,
    registeredTeams: 8,
    venue: "Alexandria Stadium",
    status: "registration_open",
    minRoster: 7,
    maxRoster: 11,
  },
  {
    id: "cairo-padel-26",
    title: "Cairo Intercollegiate Padel Open 2026",
    sport: "Padel",
    dates: "Dec 5 - Dec 8, 2026",
    entryFee: "EGP 300 / Pair",
    maxTeams: 32,
    registeredTeams: 26,
    venue: "Palm Hills Sports Club, 6th of October",
    status: "registration_open",
    minRoster: 2,
    maxRoster: 4,
  },
]
