# FNCTN: Frontend Data Models & API Specifications

This document defines the complete frontend data models, payload structures, field types, and sample JSON contracts for each page mapped in [`fnctn_frontend_data_needs_mapping.md`](file:///c:/Users/user/Desktop/Freelancing/FNCTN/FNCTN/Docs/Technical/fnctn_frontend_data_needs_mapping.md). It serves as the single source of truth for frontend client data contracts and backend API design.

---

## Global Conventions & Standards

- **Field Naming**: Strict `camelCase` across all request and response payloads (e.g., `tournamentTitle`, `liveScore`, `studentIdCardUrl`).
- **Identifiers**: `UUID` string format for database primary keys (e.g., `"f47ac10b-58cc-4372-a567-0e02b2c3d479"`), or standardized alpha-numeric codes (e.g., join code `"CAI-782"`).
- **Date & Time**: `ISO 8601` UTC strings (`YYYY-MM-DDTHH:mm:ssZ`) for timestamps and dates (e.g., `"2026-11-01T16:00:00Z"`).
- **Currency & Amounts**: Integer or floating-point numerical values denominated in Egyptian Pounds (**EGP**).
- **File Uploads**: Multipart form uploads or presigned storage URLs returning HTTPS image strings.
- **Role Scoping**: Public endpoints strictly exclude sensitive PII (National IDs, Student ID images, personal phone numbers, and private emails).

---

## Table of Contents

1. [Public App Data Models (Fan Hub Deactivated)](#1-public-app-data-models-fan-hub-deactivated)
   - [1.1 Landing Page (`/`) [ACTIVE]](#11-landing-page---active)
   - [1.2 Fan Hub Home (`/hub`) [DEACTIVATED]](#12-fan-hub-home-hub-deactivated--post-mvp)
   - [1.3 Tournament Dashboard (`/hub/tournament/:id`) [DEACTIVATED]](#13-tournament-dashboard-hubtournamentid-deactivated--post-mvp)
   - [1.4 Live Match Viewer (`/hub/tournament/:id/match/:matchId`) [DEACTIVATED]](#14-live-match-viewer-hubtournamentidmatchmatchid-deactivated--post-mvp)
   - [1.5 Public Profiles (`/hub/team/:id` & `/hub/player/:id`) [DEACTIVATED]](#15-public-profiles-hubteamid--hubplayerid-deactivated--post-mvp)
2. [Authentication Data Models](#2-authentication-data-models)
   - [2.1 Log In (`/login`)](#21-log-in-login)
   - [2.2 Sign Up & Athlete Onboarding (`/signup`)](#22-sign-up--athlete-onboarding-signup)
   - [2.3 Forgot & Reset Password (`/reset-password`)](#23-forgot--reset-password-reset-password)
3. [Participant (Athlete) Data Models](#3-participant-athlete-data-models)
   - [3.1 Player Dashboard (`/dashboard`)](#31-player-dashboard-dashboard)
   - [3.2 Profile Settings (`/profile`)](#32-profile-settings-profile)
   - [3.3 Team Hub (`/teams`)](#33-team-hub-teams)
4. [Organizer Data Models](#4-organizer-data-models)
   - [4.1 Organizer Dashboard (`/organizer/dashboard`)](#41-organizer-dashboard-organizerdashboard)
   - [4.2 Tournament Setup (`/organizer/tournament/:id/setup`)](#42-tournament-setup-organizertournamentidsetup)
   - [4.3 Verification Desk (`/organizer/tournament/:id/review`)](#43-verification-desk-organizertournamentidreview)
   - [4.4 Match Day Controller (`/organizer/match/:matchId/live`)](#44-match-day-controller-organizermatchmatchidlive)
5. [University Admin & Scouter Data Models](#5-university-admin--scouter-data-models)
   - [5.1 Student ID Queue (`/university/students`)](#51-student-id-queue-universitystudents)
   - [5.2 Team Approvals (`/university/teams`)](#52-team-approvals-universityteams)
   - [5.3 Talent Directory (`/scout/directory`)](#53-talent-directory-scoutdirectory)
6. [Platform Admin Data Models](#6-platform-admin-data-models)
   - [6.1 Admin Dashboard (`/admin/dashboard`)](#61-admin-dashboard-admindashboard)
   - [6.2 User Management (`/admin/users`)](#62-user-management-adminusers)

---

## 1. Public App Data Models (Fan Hub Deactivated)

> [!WARNING]
> **Fan Hub Scope Status: DEACTIVATED**
> The Fan Hub public engagement module (`/hub`, `/hub/tournament/:id`, `/hub/tournament/:id/match/:matchId`, `/hub/team/:id`, `/hub/player/:id`) has been **deactivated** for the current release phase. 
> Only **1.1 Landing Page (`/`)** is currently active as the public web face for collegiate tournament discovery and athlete registration.
> The data models in sections 1.2 through 1.5 are preserved below for reference and deferred until future spectator-facing phases.

### 1.1 Landing Page (`/`) [ACTIVE]
Displays upcoming and featured collegiate championship fixtures, corporate brand partners, and stadium spectator highlights.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `featuredTournaments` | Array[Object] | Required | List of featured showcase tournaments |
| `featuredTournaments[].id` | UUID | Required | Unique tournament identifier |
| `featuredTournaments[].title` | String | Required | Official title (e.g., `"Egyptian Collegiate Football Cup"`) |
| `featuredTournaments[].sport` | String | Required | Sport category (`"Football"`, `"Basketball"`, `"Padel"`, etc.) |
| `featuredTournaments[].statusCategory` | String (Enum) | Required | `"live"` \| `"upcoming"` \| `"past"` |
| `featuredTournaments[].startDate` | Date (ISO 8601) | Required | Tournament commencement date |
| `featuredTournaments[].endDate` | Date (ISO 8601) | Required | Tournament conclusion date |
| `featuredTournaments[].venue` | String | Required | Host stadium / university athletic arena |
| `featuredTournaments[].city` | String | Required | Host governorate / city (e.g., `"Cairo"`) |
| `featuredTournaments[].coverImageUrl` | String (URL) | Required | High-resolution banner image |
| `featuredTournaments[].teamsCount` | Integer | Required | Number of participating delegations |
| `featuredTournaments[].sponsor` | Object | Required | Brand sponsor info |
| `featuredTournaments[].sponsor.name` | String | Required | Corporate partner name (e.g., `"Red Bull"`) |
| `featuredTournaments[].sponsor.badge` | String | Required | Short logo badge abbreviation (e.g., `"REDBULL"`) |
| `featuredTournaments[].sponsor.logoUrl` | String (URL) | Optional | Sponsor brand icon image |
| `featuredTournaments[].fanServices` | Array[Object] | Required | List of on-site spectator amenities |
| `featuredTournaments[].fanServices[].icon` | String | Required | Service emoji/icon (e.g., `"🍔"`) |
| `featuredTournaments[].fanServices[].label` | String | Required | Service label (e.g., `"Food Trucks"`) |

#### Write Model (Request)
*None (Read-only promotional marketing surface).*

#### JSON Example
```json
{
  "featuredTournaments": [
    {
      "id": "e4b2d184-7c98-4c01-a1b7-d1a293849102",
      "title": "Egyptian Collegiate Football Cup 2026",
      "sport": "Football",
      "statusCategory": "live",
      "startDate": "2026-10-15T09:00:00Z",
      "endDate": "2026-10-28T21:00:00Z",
      "venue": "Cairo University Stadium",
      "city": "Giza",
      "coverImageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
      "teamsCount": 16,
      "sponsor": {
        "name": "Red Bull Egypt",
        "badge": "REDBULL",
        "logoUrl": "https://cdn.fnctn.eg/sponsors/redbull.png"
      },
      "fanServices": [
        { "icon": "🍔", "label": "Food Trucks" },
        { "icon": "🎧", "label": "Live DJ Sets" },
        { "icon": "🎁", "label": "Energy Giveaways" }
      ]
    }
  ]
}
```

---

### 1.2 Fan Hub Home (`/hub`) [DEACTIVATED / POST-MVP]
*Status: Deactivated for current phase (Deferred to future spectator release).*
Public hub displaying ongoing matches, chronological tournament schedules, filter toggles, and live scoring telemetry.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `liveTickerMatches` | Array[Object] | Required | Live matches displayed in ticker/hero |
| `liveTickerMatches[].id` | UUID | Required | Match identifier |
| `liveTickerMatches[].tournamentId` | UUID | Required | Associated tournament ID |
| `liveTickerMatches[].tournamentTitle` | String | Required | Tournament name |
| `liveTickerMatches[].sport` | String | Required | Sport name |
| `liveTickerMatches[].stage` | String | Required | Match stage (e.g., `"Quarter-Finals"`) |
| `liveTickerMatches[].teamA` | Object | Required | Home team summary |
| `liveTickerMatches[].teamA.id` | UUID | Required | Home team ID |
| `liveTickerMatches[].teamA.name` | String | Required | Home team name |
| `liveTickerMatches[].teamA.university` | String | Required | Home team university |
| `liveTickerMatches[].teamA.score` | Integer | Required | Current home score |
| `liveTickerMatches[].teamB` | Object | Required | Away team summary |
| `liveTickerMatches[].teamB.id` | UUID | Required | Away team ID |
| `liveTickerMatches[].teamB.name` | String | Required | Away team name |
| `liveTickerMatches[].teamB.university` | String | Required | Away team university |
| `liveTickerMatches[].teamB.score` | Integer | Required | Current away score |
| `liveTickerMatches[].matchClock` | String | Required | Clock string (e.g., `"68'"`) |
| `liveTickerMatches[].period` | String | Required | `"1st Half"` \| `"Halftime"` \| `"2nd Half"` \| `"Full-Time"` |
| `tournaments` | Array[Object] | Required | Filtered list of tournaments |
| `tournaments[].id` | UUID | Required | Tournament ID |
| `tournaments[].title` | String | Required | Tournament title |
| `tournaments[].sport` | String | Required | Sport |
| `tournaments[].city` | String | Required | City |
| `tournaments[].statusCategory` | String (Enum) | Required | `"ongoing"` \| `"upcoming"` \| `"past"` |
| `tournaments[].dateRange` | String | Required | Formatted dates (e.g., `"Oct 15 - Oct 28"`) |
| `tournaments[].primaryVenue` | String | Required | Main pitch or arena |
| `tournaments[].prizePool` | String | Required | Prize pool description |
| `tournaments[].teamsCountLabel`| String | Required | e.g. `"16 Teams"` |
| `availableFilters` | Object | Required | Available search filter dimensions |
| `availableFilters.sports` | Array[String] | Required | e.g. `["Football", "Basketball", "Padel"]` |
| `availableFilters.cities` | Array[String] | Required | e.g. `["Cairo", "New Cairo", "Giza", "Alexandria"]` |

#### Write Model (Query Parameters)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Optional | `"all"` \| `"ongoing"` \| `"upcoming"` \| `"past"` |
| `sport` | String | Optional | Filter by sport name |
| `city` | String | Optional | Filter by governorate / city |
| `search` | String | Optional | Case-insensitive text search string |

#### JSON Example
```json
{
  "liveTickerMatches": [
    {
      "id": "7a3e9c11-1254-46f9-b883-82a17019f2a9",
      "tournamentId": "e4b2d184-7c98-4c01-a1b7-d1a293849102",
      "tournamentTitle": "Egyptian Collegiate Football Cup 2026",
      "sport": "Football",
      "stage": "Semi-Final",
      "teamA": {
        "id": "team-cairo-wolves",
        "name": "Cairo Wolves",
        "university": "Cairo University",
        "score": 2
      },
      "teamB": {
        "id": "team-auc-titans",
        "name": "AUC Titans",
        "university": "American University in Cairo",
        "score": 1
      },
      "matchClock": "74'",
      "period": "2nd Half"
    }
  ],
  "tournaments": [
    {
      "id": "e4b2d184-7c98-4c01-a1b7-d1a293849102",
      "title": "Egyptian Collegiate Football Cup 2026",
      "sport": "Football",
      "city": "Giza",
      "statusCategory": "ongoing",
      "dateRange": "Oct 15 – Oct 28, 2026",
      "primaryVenue": "Cairo University Stadium",
      "prizePool": "50,000 EGP Cash + Gold Trophy",
      "teamsCountLabel": "16 Teams"
    }
  ],
  "availableFilters": {
    "sports": ["Football", "Basketball", "Padel", "Track & Field"],
    "cities": ["Cairo", "New Cairo", "Giza", "Alexandria"]
  }
}
```

---

### 1.3 Tournament Dashboard (`/hub/tournament/:id`) [DEACTIVATED / POST-MVP]
*Status: Deactivated for current phase (Deferred to future spectator release).*
Comprehensive public hub for an individual tournament including bracket trees, match schedules, squads, tickets, and rules.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Tournament ID |
| `title` | String | Required | Tournament title |
| `sport` | String | Required | Sport category |
| `city` | String | Required | Host city |
| `statusCategory` | String (Enum) | Required | `"ongoing"` \| `"upcoming"` \| `"past"` |
| `venue` | Object | Required | Arena details |
| `venue.name` | String | Required | Venue facility name |
| `venue.address` | String | Required | Physical street address |
| `venue.city` | String | Required | City location |
| `venue.capacity` | String | Required | e.g. `"5,000 Spectators"` |
| `venue.parkingInfo` | String | Required | Gate and parking details |
| `sponsor` | Object | Required | Official presenting sponsor |
| `sponsor.name` | String | Required | Sponsor name |
| `sponsor.badge` | String | Required | Sponsor logo code |
| `ticketOptions` | Array[Object] | Required | Spectator pass tiers |
| `ticketOptions[].id` | UUID | Required | Ticket tier ID |
| `ticketOptions[].tier` | String | Required | Tier title (e.g., `"General Admission"`, `"VIP Court-side"`) |
| `ticketOptions[].priceEgp` | Integer | Required | Price in EGP (`0` for free access) |
| `ticketOptions[].status` | String (Enum) | Required | `"available"` \| `"limited"` \| `"sold_out"` |
| `bracket` | Array[Object] | Required | Single-elimination match bracket nodes |
| `bracket[].id` | UUID | Required | Bracket match node ID |
| `bracket[].round` | String | Required | `"Quarter-Finals"` \| `"Semi-Finals"` \| `"Final"` |
| `bracket[].matchNumber` | Integer | Required | Ordering index |
| `bracket[].teamA` | Object | Required | Team A details (`id`, `name`, `uni`, `seed`, `score`, `isWinner`) |
| `bracket[].teamB` | Object | Required | Team B details (`id`, `name`, `uni`, `seed`, `score`, `isWinner`) |
| `bracket[].status` | String (Enum) | Required | `"scheduled"` \| `"live"` \| `"completed"` |
| `bracket[].winnerId` | UUID | Optional | Winning team ID |
| `schedule` | Array[Object] | Required | Chronological fixture list |
| `schedule[].id` | UUID | Required | Match ID |
| `schedule[].date` | Date (ISO 8601) | Required | Match date |
| `schedule[].time` | String | Required | Match kickoff time (e.g., `"16:30"`) |
| `schedule[].pitch` | String | Required | Pitch identifier (e.g., `"Pitch 1"`) |
| `schedule[].status` | String (Enum) | Required | `"scheduled"` \| `"live"` \| `"completed"` |
| `teams` | Array[Object] | Required | Enrolled university delegations list |
| `teams[].id` | UUID | Required | Team ID |
| `teams[].name` | String | Required | Team name |
| `teams[].university` | String | Required | Affiliated university |
| `teams[].logoUrl` | String (URL) | Required | Team crest image URL |
| `teams[].seed` | Integer | Required | Tournament seeding number |
| `news` | Array[Object] | Required | Published editorial & media updates |
| `news[].id` | UUID | Required | Article ID |
| `news[].title` | String | Required | Article headline |
| `news[].publishedAt` | Date (ISO 8601) | Required | Timestamp |
| `news[].category` | String | Required | e.g. `"Match Recap"` |
| `news[].snippet` | String | Required | Summary paragraph |

#### Write Model (`POST /api/hub/tournaments/:id/tickets/reserve`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `ticketOptionId` | UUID | Required | Selected ticket tier ID |
| `quantity` | Integer | Required | Number of passes (1–10) |
| `fanName` | String | Required | Spectator full name |
| `fanEmail` | String | Required | Email address for ticket QR delivery |
| `fanPhone` | String | Required | Mobile phone number |

#### JSON Example (Response)
```json
{
  "id": "e4b2d184-7c98-4c01-a1b7-d1a293849102",
  "title": "Egyptian Collegiate Football Cup 2026",
  "sport": "Football",
  "city": "Giza",
  "statusCategory": "ongoing",
  "venue": {
    "name": "Cairo University Main Stadium",
    "address": "Tharwat Street, Orman",
    "city": "Giza",
    "capacity": "5,000 Spectators",
    "parkingInfo": "Gate 4 Free Parking for Valid Pass Holders"
  },
  "sponsor": {
    "name": "Red Bull Egypt",
    "badge": "REDBULL"
  },
  "ticketOptions": [
    {
      "id": "tkt-ga-free",
      "tier": "Student Spectator Pass",
      "priceEgp": 0,
      "status": "available"
    },
    {
      "id": "tkt-vip-pass",
      "tier": "VIP Pitch-side Pass",
      "priceEgp": 150,
      "status": "limited"
    }
  ],
  "bracket": [
    {
      "id": "brk-m1",
      "round": "Semi-Finals",
      "matchNumber": 1,
      "teamA": {
        "id": "tm-cairo-wolves",
        "name": "Cairo Wolves",
        "uni": "Cairo University",
        "seed": 1,
        "score": 2,
        "isWinner": true
      },
      "teamB": {
        "id": "tm-auc-titans",
        "name": "AUC Titans",
        "uni": "AUC",
        "seed": 4,
        "score": 1,
        "isWinner": false
      },
      "status": "completed",
      "winnerId": "tm-cairo-wolves"
    }
  ],
  "schedule": [
    {
      "id": "match-final-01",
      "date": "2026-10-28T18:00:00Z",
      "time": "18:00",
      "pitch": "Main Stadium Pitch",
      "status": "scheduled"
    }
  ],
  "teams": [
    {
      "id": "tm-cairo-wolves",
      "name": "Cairo Wolves",
      "university": "Cairo University",
      "logoUrl": "https://cdn.fnctn.eg/teams/cairo-wolves.png",
      "seed": 1
    }
  ],
  "news": [
    {
      "id": "news-01",
      "title": "Cairo Wolves Advance to Final After Dramatic 2-1 Semi-Final",
      "publishedAt": "2026-10-25T20:30:00Z",
      "category": "Match Recap",
      "snippet": "Omar Hassan scores in the 74th minute to secure finals ticket."
    }
  ]
}
```

---

### 1.4 Live Match Viewer (`/hub/tournament/:id/match/:matchId`) [DEACTIVATED / POST-MVP]
*Status: Deactivated for current phase (Deferred to future spectator release).*
Public real-time match dashboard providing live scoreboard, chronological match timeline, starting lineups, and match stats.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Match identifier |
| `tournamentId` | UUID | Required | Tournament ID |
| `tournamentTitle` | String | Required | Tournament title |
| `sport` | String | Required | Sport category |
| `stage` | String | Required | Match stage (e.g., `"Semi-Final"`) |
| `venue` | String | Required | Match pitch or arena |
| `status` | String (Enum) | Required | `"live"` \| `"halftime"` \| `"fulltime"` |
| `period` | String | Required | Active period display string |
| `matchClock` | String | Required | Elapsed time string (e.g., `"74'"`) |
| `teamA` | Object | Required | Home team data |
| `teamA.id` | UUID | Required | Team A ID |
| `teamA.name` | String | Required | Team A name |
| `teamA.university` | String | Required | Team A university |
| `teamA.logoUrl` | String (URL) | Required | Team crest |
| `teamA.score` | Integer | Required | Current score |
| `teamA.lineup` | Array[Object] | Required | Public lineup players list |
| `teamA.lineup[].id` | UUID | Required | Player ID |
| `teamA.lineup[].name` | String | Required | Public name (e.g., `"Omar Hassan"`) |
| `teamA.lineup[].jerseyNumber` | Integer | Required | Jersey number |
| `teamA.lineup[].position` | String | Required | Position (e.g., `"ST"`) |
| `teamA.lineup[].avatarUrl` | String (URL) | Required | Player headshot URL |
| `teamB` | Object | Required | Away team data (mirrors teamA structure) |
| `timeline` | Array[Object] | Required | Chronological in-game events |
| `timeline[].minute` | Integer | Required | Match minute |
| `timeline[].type` | String (Enum) | Required | `"goal"` \| `"yellow_card"` \| `"red_card"` \| `"substitution"` |
| `timeline[].team` | String (Enum) | Required | `"teamA"` \| `"teamB"` |
| `timeline[].playerName` | String | Required | Event actor name |
| `timeline[].detail` | String | Optional | Secondary info (e.g., `"Assist by Tarek Shehata"`) |
| `stats` | Object | Required | In-game comparative telemetry |
| `stats.possession` | Array[Integer] | Required | `[homePercent, awayPercent]` |
| `stats.shotsOnTarget` | Array[Integer] | Required | `[homeShots, awayShots]` |
| `stats.fouls` | Array[Integer] | Required | `[homeFouls, awayFouls]` |
| `sponsor` | Object | Required | Pitch-side title sponsor banner |
| `sponsor.name` | String | Required | Sponsor name |
| `sponsor.badge` | String | Required | Short logo badge |
| `sponsor.offerText` | String | Required | Fan perk (e.g., `"Scan for 20% off Red Bull Can"`) |

#### Write Model (`POST /api/hub/matches/:id/graphics/download`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `graphicType` | String (Enum) | Required | `"scoreboard"` \| `"lineups"` \| `"full_time_recap"` |
| `format` | String (Enum) | Required | `"png"` \| `"jpeg"` \| `"story_9x16"` |

#### JSON Example (Response)
```json
{
  "id": "7a3e9c11-1254-46f9-b883-82a17019f2a9",
  "tournamentId": "e4b2d184-7c98-4c01-a1b7-d1a293849102",
  "tournamentTitle": "Egyptian Collegiate Football Cup 2026",
  "sport": "Football",
  "stage": "Semi-Final",
  "venue": "Cairo University Stadium · Pitch 1",
  "status": "live",
  "period": "2nd Half",
  "matchClock": "74'",
  "teamA": {
    "id": "tm-cairo-wolves",
    "name": "Cairo Wolves",
    "university": "Cairo University",
    "logoUrl": "https://cdn.fnctn.eg/teams/cairo-wolves.png",
    "score": 2,
    "lineup": [
      {
        "id": "usr-omar-hassan",
        "name": "Omar Hassan",
        "jerseyNumber": 9,
        "position": "ST",
        "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      }
    ]
  },
  "teamB": {
    "id": "tm-auc-titans",
    "name": "AUC Titans",
    "university": "American University in Cairo",
    "logoUrl": "https://cdn.fnctn.eg/teams/auc-titans.png",
    "score": 1,
    "lineup": [
      {
        "id": "usr-ziad-farouk",
        "name": "Ziad Farouk",
        "jerseyNumber": 10,
        "position": "CAM",
        "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ]
  },
  "timeline": [
    {
      "minute": 18,
      "type": "goal",
      "team": "teamA",
      "playerName": "Tarek Shehata",
      "detail": "Left-footed volley from box edge"
    },
    {
      "minute": 52,
      "type": "goal",
      "team": "teamB",
      "playerName": "Ziad Farouk",
      "detail": "Direct free-kick into top corner"
    },
    {
      "minute": 74,
      "type": "goal",
      "team": "teamA",
      "playerName": "Omar Hassan",
      "detail": "Header from corner delivery"
    }
  ],
  "stats": {
    "possession": [54, 46],
    "shotsOnTarget": [7, 4],
    "fouls": [9, 12]
  },
  "sponsor": {
    "name": "Red Bull Egypt",
    "badge": "REDBULL",
    "offerText": "Scan QR at the gate for free Red Bull Can"
  }
}
```

---

### 1.5 Public Profiles (`/hub/team/:id` & `/hub/player/:id`) [DEACTIVATED / POST-MVP]
*Status: Deactivated for current phase (Deferred to future spectator release).*
Public sport profiles accessible to fans, university students, and scouting agents without exposing confidential national IDs or private contacts.

#### 1.5.1 Public Team Profile (`/hub/team/:id`)
##### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Team ID |
| `name` | String | Required | Team name |
| `university` | String | Required | Affiliated university |
| `sport` | String | Required | Sport category |
| `logoUrl` | String (URL) | Required | Official crest |
| `coachName` | String | Required | Head coach name |
| `captainName` | String | Required | Team captain name |
| `seed` | Integer | Required | Tournament seeding |
| `record` | Object | Required | Official season record |
| `record.played` | Integer | Required | Matches played |
| `record.won` | Integer | Required | Matches won |
| `record.drawn` | Integer | Required | Matches drawn |
| `record.lost` | Integer | Required | Matches lost |
| `trophies` | Array[Object] | Required | Past tournament titles |
| `trophies[].year` | String | Required | Championship year |
| `trophies[].title` | String | Required | Trophy name |
| `members` | Array[Object] | Required | Public squad lineup / team members |
| `members[].id` | UUID | Required | Player ID |
| `members[].name` | String | Required | Full public name |
| `members[].position` | String | Required | Playing position |
| `members[].jerseyNumber` | Integer | Required | Jersey number |
| `members[].avatarUrl` | String (URL) | Required | Photo URL |
| `members[].matchesPlayed`| Integer | Required | Season appearances |
| `members[].goalsOrPoints`| Integer | Required | Cumulative scoring |

##### JSON Example
```json
{
  "id": "tm-cairo-wolves",
  "name": "Cairo Wolves",
  "university": "Cairo University",
  "sport": "Football",
  "logoUrl": "https://cdn.fnctn.eg/teams/cairo-wolves.png",
  "coachName": "Capt. Hossam Hassan",
  "captainName": "Omar Hassan",
  "seed": 1,
  "record": { "played": 8, "won": 7, "drawn": 1, "lost": 0 },
  "trophies": [
    { "year": "2025", "title": "Egyptian Universities Gold Cup Champions" }
  ],
  "members": [
    {
      "id": "usr-omar-hassan",
      "name": "Omar Hassan",
      "position": "Striker (ST)",
      "jerseyNumber": 9,
      "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "matchesPlayed": 8,
      "goalsOrPoints": 11
    }
  ]
}
```

#### 1.5.2 Public Player Profile (`/hub/player/:id`)
##### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Athlete ID |
| `name` | String | Required | Public name |
| `university` | String | Required | Affiliated university |
| `teamId` | UUID | Required | Current primary team ID |
| `teamName` | String | Required | Current primary team name |
| `sport` | String | Required | Sport category |
| `position` | String | Required | Primary field position |
| `jerseyNumber` | Integer | Required | Jersey number |
| `avatarUrl` | String (URL) | Required | Public photo URL |
| `bio` | String | Optional | Public athlete summary statement |
| `stats` | Object | Required | Public season performance stats |
| `stats.matches` | Integer | Required | Official matches contested |
| `stats.goalsOrPoints` | Integer | Required | Goals scored / points recorded |
| `stats.assists` | Integer | Optional | Key assists delivered |
| `stats.mvpAwards` | Integer | Required | Match MVP awards received |

##### JSON Example
```json
{
  "id": "usr-omar-hassan",
  "name": "Omar Hassan",
  "university": "Cairo University",
  "teamId": "tm-cairo-wolves",
  "teamName": "Cairo Wolves",
  "sport": "Football",
  "position": "Striker (ST)",
  "jerseyNumber": 9,
  "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "bio": "Sophomore striker. Cairo University top scorer 2025/2026 season.",
  "stats": {
    "matches": 8,
    "goalsOrPoints": 11,
    "assists": 4,
    "mvpAwards": 3
  }
}
```

---

## 2. Authentication Data Models

### 2.1 Log In (`/login`)

#### Write Model (`POST /api/auth/login`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | Required | User email address |
| `password` | String | Required | Plaintext password |

#### Response Model (`200 OK`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `accessToken` | String (JWT) | Required | Bearer token for protected requests |
| `refreshToken` | String (JWT) | Required | Rotation token |
| `user` | Object | Required | Authenticated profile summary |
| `user.id` | UUID | Required | User ID |
| `user.email` | String | Required | Email |
| `user.fullName` | String | Required | Full legal or display name |
| `user.role` | String (Enum) | Required | `"participant"` \| `"organizer"` \| `"university"` \| `"admin"` |
| `user.universityId` | UUID | Optional | Affiliated university ID (if university staff or athlete) |
| `user.isOnboardingComplete` | Boolean | Required | `true` if questionnaire completed |

#### JSON Example
```json
// Request: POST /api/auth/login
{
  "email": "omar.hassan@eng.cu.edu.eg",
  "password": "Password123!"
}

// Response: 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3Itb21hci1oYXNzYW4iLCJyb2xlIjoicGFydGljaXBhbnQifQ...",
  "refreshToken": "dGhpcy1pcy1hLXZhbGlkLXJlZnJlc2gtdG9rZW4...",
  "user": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "omar.hassan@eng.cu.edu.eg",
    "fullName": "Omar Hassan",
    "role": "participant",
    "universityId": "uni-cairo-uuid",
    "isOnboardingComplete": true
  }
}
```

---

### 2.2 Sign Up & Athlete Onboarding (`/signup`)
A two-step registration flow:
1. **Initial Sign Up Form**: Credentials registration (Email & Password).
2. **Onboarding Form**: Athletic profile questionnaire (Name, Phone, Gender, Age, Sports, University, Bio).

#### 2.2.1 Step 1: Initial Registration (`POST /api/auth/register`)
##### Write Model (Request)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | Required | Valid personal or institutional email |
| `password` | String | Required | Minimum 8 characters |

##### Response Model (`201 Created`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `userId` | UUID | Required | Created user account ID |
| `email` | String | Required | Registered email |
| `tempToken` | String (JWT) | Required | Temporary bearer token for onboarding session |
| `nextStep` | String | Required | Value: `"onboarding"` |

##### JSON Example
```json
// Request: POST /api/auth/register
{
  "email": "omar.hassan@eng.cu.edu.eg",
  "password": "SecurePassword2026!"
}

// Response: 201 Created
{
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "omar.hassan@eng.cu.edu.eg",
  "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nextStep": "onboarding"
}
```

#### 2.2.2 Step 2: Athlete Onboarding Questionnaire (`POST /api/athlete/onboarding`)
##### Write Model (Request)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `firstName` | String | Required | First name (e.g., `"Omar"`) |
| `lastName` | String | Required | Family name (e.g., `"Hassan"`) |
| `phoneNumber` | String | Required | Valid Egyptian mobile number (`01xxxxxxxxx` or `+20...`) |
| `gender` | String (Enum) | Required | `"Male"` \| `"Female"` |
| `age` | Integer | Required | Collegiate eligibility range (15–45) |
| `sports` | Array[String] | Required | Selected sports (minimum 1, e.g. `["Football"]`) |
| `university` | String | Required | Selected university name or unlisted name |
| `bio` | String | Optional | Student-athlete bio & athletic background |

##### Response Model (`200 OK`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `profileId` | UUID | Required | Athlete profile ID |
| `accessToken` | String (JWT) | Required | Full authenticated session token |
| `refreshToken` | String (JWT) | Required | Refresh token |
| `profile` | Object | Required | Consolidated athlete profile |

##### JSON Example
```json
// Request: POST /api/athlete/onboarding
{
  "firstName": "Omar",
  "lastName": "Hassan",
  "phoneNumber": "+20 100 123 4567",
  "gender": "Male",
  "age": 21,
  "sports": ["Football"],
  "university": "Cairo University",
  "bio": "Sophomore forward. Focused on sports analytics and collegiate tournaments."
}

// Response: 200 OK
{
  "profileId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "dGhpcy1pcy1hLXZhbGlkLXJlZnJlc2gtdG9rZW4...",
  "profile": {
    "firstName": "Omar",
    "lastName": "Hassan",
    "email": "omar.hassan@eng.cu.edu.eg",
    "phoneNumber": "+20 100 123 4567",
    "gender": "Male",
    "age": 21,
    "sports": ["Football"],
    "university": "Cairo University",
    "bio": "Sophomore forward. Focused on sports analytics and collegiate tournaments."
  }
}
```

---

### 2.3 Forgot & Reset Password (`/reset-password`)

#### 2.3.1 Request Reset Link (`POST /api/auth/forgot-password`)
##### Write Model (Request)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | Required | Registered account email |

##### JSON Example
```json
// Request: POST /api/auth/forgot-password
{
  "email": "omar.hassan@eng.cu.edu.eg"
}

// Response: 200 OK
{
  "success": true,
  "message": "If an account exists, a password reset link has been dispatched to your email."
}
```

#### 2.3.2 Confirm Password Reset (`POST /api/auth/reset-password`)
##### Write Model (Request)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `resetToken` | String | Required | Single-use token from reset link |
| `newPassword` | String | Required | New password (minimum 8 characters) |

##### JSON Example
```json
// Request: POST /api/auth/reset-password
{
  "resetToken": "token-9201-abc-reset-key",
  "newPassword": "BrandNewPassword2026!"
}

// Response: 200 OK
{
  "success": true,
  "message": "Password successfully updated. You may now log in with your new credentials."
}
```

---

## 3. Participant (Athlete) Data Models

### 3.1 Player Dashboard (`/dashboard`)
Personalized command center for the student-athlete displaying upcoming match schedules, accreditation alerts, and performance metrics.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `athlete` | Object | Required | Logged-in athlete summary |
| `athlete.id` | UUID | Required | Athlete ID |
| `athlete.fullName` | String | Required | Full name |
| `athlete.university` | String | Required | Enrolled university |
| `athlete.verificationStatus` | String (Enum) | Required | `"verified"` \| `"under_review"` \| `"action_required"` \| `"not_uploaded"` |
| `upcomingMatches` | Array[Object] | Required | Upcoming matches for athlete's teams |
| `upcomingMatches[].id` | UUID | Required | Match ID |
| `upcomingMatches[].tournamentTitle`| String | Required | Tournament name |
| `upcomingMatches[].round` | String | Required | Match stage / round |
| `upcomingMatches[].dateTime` | Date (ISO 8601) | Required | Scheduled kickoff timestamp |
| `upcomingMatches[].countdownText` | String | Required | Relative countdown (e.g., `"Tomorrow in 18 hrs"`) |
| `upcomingMatches[].venue` | String | Required | Stadium facility name |
| `upcomingMatches[].pitch` | String | Required | Pitch allocation (e.g., `"Pitch 1"`) |
| `upcomingMatches[].rollCallTime` | String | Required | Pitch-side check-in deadline (e.g., `"15:30"`) |
| `upcomingMatches[].opponentTeam` | String | Required | Rival team name |
| `upcomingMatches[].opponentUniversity` | String | Required | Rival university |
| `upcomingMatches[].opponentLogo` | String (URL) | Required | Rival crest URL |
| `upcomingMatches[].jerseyColor` | String | Required | Required kit color (e.g., `"Red / Home Kit"`) |
| `activeTeamSummary` | Object | Optional | Primary team snapshot |
| `activeTeamSummary.id` | UUID | Required | Team ID |
| `activeTeamSummary.name` | String | Required | Team name |
| `activeTeamSummary.code` | String | Required | 6-character team join code |
| `activeTeamSummary.membersCount` | Integer | Required | Total registered squad members |
| `activeTeamSummary.verifiedCount` | Integer | Required | Cleared university members |
| `alerts` | Array[Object] | Required | Priority inbox notifications |
| `alerts[].id` | UUID | Required | Alert ID |
| `alerts[].type` | String (Enum) | Required | `"id_verification"` \| `"match_roll_call"` \| `"tournament_update"` |
| `alerts[].title` | String | Required | Alert title |
| `alerts[].message` | String | Required | Body text |
| `alerts[].severity` | String (Enum) | Required | `"urgent"` \| `"info"` \| `"success"` |
| `alerts[].actionTarget` | String (Enum) | Optional | Navigation target: `"profile"` \| `"teams"` |

#### Write Model
*None (Dashboard is read-only summary).*

#### JSON Example
```json
{
  "athlete": {
    "id": "usr-omar-hassan",
    "fullName": "Omar Hassan",
    "university": "Cairo University",
    "verificationStatus": "verified"
  },
  "upcomingMatches": [
    {
      "id": "match-semis-01",
      "tournamentTitle": "Egyptian Collegiate Football Cup 2026",
      "round": "Semi-Final",
      "dateTime": "2026-10-27T16:00:00Z",
      "countdownText": "Tomorrow in 18 hrs",
      "venue": "Cairo University Stadium",
      "pitch": "Pitch 1",
      "rollCallTime": "15:15",
      "opponentTeam": "AUC Titans",
      "opponentUniversity": "American University in Cairo",
      "opponentLogo": "https://cdn.fnctn.eg/teams/auc-titans.png",
      "jerseyColor": "Red / Home Kit"
    }
  ],
  "activeTeamSummary": {
    "id": "tm-cairo-wolves",
    "name": "Cairo Wolves",
    "code": "CAI-782",
    "membersCount": 11,
    "verifiedCount": 11
  },
  "alerts": [
    {
      "id": "alt-01",
      "type": "match_roll_call",
      "title": "Mandatory Match Roll Call",
      "message": "Bring your physical National ID to Pitch 1 check-in desk at 15:15.",
      "severity": "urgent",
      "actionTarget": "profile"
    }
  ]
}
```

---

### 3.2 Profile Settings (`/profile`)
Athlete profile management, academic credentials, athletic metrics, and official ID document uploads.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Athlete user ID |
| `firstName` | String | Required | First name |
| `lastName` | String | Required | Family name |
| `email` | String | Required | Verified email address |
| `phone` | String | Required | Phone number |
| `gender` | String (Enum) | Required | `"Male"` \| `"Female"` |
| `university` | String | Required | Affiliated university |
| `faculty` | String | Optional | College/Faculty (e.g., `"Faculty of Engineering"`) |
| `academicYear` | String | Optional | Current term (e.g., `"Year 2"`, `"Junior"`) |
| `studentIdNumber` | String | Optional | University student enrollment ID |
| `nationalIdNumber` | String | Optional | 14-digit Egyptian National ID |
| `sports` | Array[String] | Required | List of registered sports |
| `primaryPosition` | String | Optional | Field position |
| `jerseyNumber` | Integer | Optional | Preferred shirt number |
| `dominantFoot` | String (Enum) | Optional | `"Right"` \| `"Left"` \| `"Both"` |
| `heightCm` | Integer | Optional | Height in centimeters |
| `weightKg` | Integer | Optional | Weight in kilograms |
| `bio` | String | Optional | Bio statement |
| `avatarUrl` | String (URL) | Optional | Profile image URL |
| `studentIdDoc` | Object | Required | Academic student ID verification state |
| `studentIdDoc.status` | String (Enum) | Required | `"not_uploaded"` \| `"under_review"` \| `"verified"` \| `"action_required"` |
| `studentIdDoc.fileUrl` | String (URL) | Optional | Secure uploaded image URL |
| `studentIdDoc.rejectionReason`| String | Optional | Reason provided if rejected |
| `nationalIdDoc` | Object | Required | Egyptian National ID card verification state |
| `nationalIdDoc.status` | String (Enum) | Required | `"not_uploaded"` \| `"under_review"` \| `"verified"` \| `"action_required"` |
| `nationalIdDoc.frontFileUrl` | String (URL) | Optional | Front face image URL |
| `nationalIdDoc.backFileUrl` | String (URL) | Optional | Back face image URL |
| `nationalIdDoc.rejectionReason`| String | Optional | Reason provided if rejected |
| `overallVerificationStatus` | String (Enum) | Required | `"verified"` \| `"under_review"` \| `"action_required"` \| `"not_uploaded"` |

#### Write Model 1: Update Profile Details (`PUT /api/athlete/profile`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `faculty` | String | Optional | Faculty / Department name |
| `academicYear` | String | Optional | Academic year |
| `studentIdNumber` | String | Optional | Official campus student ID code |
| `nationalIdNumber` | String | Optional | 14-digit Egyptian national ID |
| `primaryPosition` | String | Optional | Field position |
| `jerseyNumber` | Integer | Optional | Shirt number |
| `dominantFoot` | String (Enum) | Optional | `"Right"` \| `"Left"` \| `"Both"` |
| `heightCm` | Integer | Optional | Height |
| `weightKg` | Integer | Optional | Weight |
| `bio` | String | Optional | Bio |

#### Write Model 2: Upload Verification Document (`POST /api/athlete/documents`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `documentType` | String (Enum) | Required | `"student_id"` \| `"national_id_front"` \| `"national_id_back"` |
| `file` | Binary / Base64 | Required | Document photo file (JPEG/PNG/PDF, max 10MB) |

#### JSON Example
```json
// Response: GET /api/athlete/profile
{
  "id": "usr-omar-hassan",
  "firstName": "Omar",
  "lastName": "Hassan",
  "email": "omar.hassan@eng.cu.edu.eg",
  "phone": "+20 100 123 4567",
  "gender": "Male",
  "university": "Cairo University",
  "faculty": "Faculty of Engineering",
  "academicYear": "Year 2 (Sophomore)",
  "studentIdNumber": "ENG-2024-0891",
  "nationalIdNumber": "30309150102938",
  "sports": ["Football"],
  "primaryPosition": "Striker (ST)",
  "jerseyNumber": 9,
  "dominantFoot": "Right",
  "heightCm": 182,
  "weightKg": 76,
  "bio": "Focused striker with collegiate championship goals.",
  "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "studentIdDoc": {
    "status": "verified",
    "fileUrl": "https://cdn.fnctn.eg/docs/student-id-omar.jpg"
  },
  "nationalIdDoc": {
    "status": "verified",
    "frontFileUrl": "https://cdn.fnctn.eg/docs/nid-front-omar.jpg",
    "backFileUrl": "https://cdn.fnctn.eg/docs/nid-back-omar.jpg"
  },
  "overallVerificationStatus": "verified"
}
```

---

### 3.3 Team Hub (`/teams`)
Team roster management, squad creation, join codes, and tournament championship entries.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `teams` | Array[Object] | Required | List of teams the athlete belongs to |
| `teams[].id` | UUID | Required | Team ID |
| `teams[].name` | String | Required | Team name |
| `teams[].code` | String | Required | Unique 6-character invitation code |
| `teams[].sport` | String | Required | Sport category |
| `teams[].university` | String | Required | Affiliated university |
| `teams[].logoUrl` | String (URL) | Required | Team logo |
| `teams[].color` | String (Hex) | Required | Primary team color (e.g., `"#A60E13"`) |
| `teams[].captainId` | UUID | Required | User ID of registered captain |
| `teams[].captainName` | String | Required | Name of captain |
| `teams[].userRole` | String (Enum) | Required | Role of logged-in athlete: `"Captain"` \| `"Player"` |
| `teams[].members` | Array[Object] | Required | Full team squad list |
| `teams[].members[].id` | UUID | Required | Member user ID |
| `teams[].members[].name` | String | Required | Member name |
| `teams[].members[].role` | String (Enum) | Required | `"Captain"` \| `"Player"` \| `"Substitute"` |
| `teams[].members[].jerseyNumber` | Integer | Required | Number |
| `teams[].members[].position` | String | Required | Field position |
| `teams[].members[].university` | String | Required | University name |
| `teams[].members[].avatarUrl` | String (URL) | Required | Member avatar |
| `teams[].members[].verificationStatus`| String (Enum) | Required | `"verified"` \| `"under_review"` \| `"action_required"` \| `"not_uploaded"` |
| `teams[].appliedTournaments` | Array[Object] | Required | Tournament registrations |
| `teams[].appliedTournaments[].tournamentId` | UUID | Required | Tournament ID |
| `teams[].appliedTournaments[].tournamentTitle` | String | Required | Tournament name |
| `teams[].appliedTournaments[].status` | String (Enum) | Required | `"applied"` \| `"approved"` \| `"rejected"` |
| `openTournaments` | Array[Object] | Required | Tournaments currently accepting entries |
| `openTournaments[].id` | UUID | Required | Tournament ID |
| `openTournaments[].title` | String | Required | Tournament name |
| `openTournaments[].sport` | String | Required | Sport |
| `openTournaments[].dates` | String | Required | Date range string |
| `openTournaments[].venue` | String | Required | Venue |
| `openTournaments[].entryFee` | String | Required | Entry fee description (e.g., `"EGP 1,500 / Team"`) |
| `openTournaments[].minTeamSize`| Integer | Required | Minimum required squad size |

#### Write Models
##### 1. Create Team (`POST /api/teams`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required | Unique team name |
| `sport` | String | Required | Sport category |
| `university` | String | Required | University delegation affiliation |
| `logoUrl` | String (URL) | Optional | Selected avatar or uploaded crest |
| `color` | String (Hex) | Optional | Primary team color |

##### 2. Join Team via Code (`POST /api/teams/join`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `code` | String | Required | 6-character team code (e.g., `"CAI-782"`) |

##### 3. Leave Team (`POST /api/teams/:id/leave`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `confirm` | Boolean | Required | Explicit consent (`true`) |

##### 4. Apply Team to Tournament (`POST /api/tournaments/:id/apply`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `teamId` | UUID | Required | Team submitting the entry |
| `captainCertified` | Boolean | Required | Mandatory captain legal certification checkbox |

#### JSON Example
```json
// Request: POST /api/teams
{
  "name": "Cairo Wolves FC",
  "sport": "Football",
  "university": "Cairo University",
  "color": "#A60E13"
}

// Response: 201 Created
{
  "id": "tm-cairo-wolves",
  "name": "Cairo Wolves FC",
  "code": "CAI-782",
  "sport": "Football",
  "university": "Cairo University",
  "captainId": "usr-omar-hassan",
  "captainName": "Omar Hassan",
  "members": [
    {
      "id": "usr-omar-hassan",
      "name": "Omar Hassan",
      "role": "Captain",
      "jerseyNumber": 9,
      "position": "ST",
      "university": "Cairo University",
      "verificationStatus": "verified"
    }
  ]
}
```

---

## 4. Organizer Data Models

### 4.1 Organizer Dashboard (`/organizer/dashboard`)
Tournament committee overview displaying all managed championships, entry fee collections, and pitch review metrics.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `organizerCommittee` | String | Required | Host committee organization |
| `tournaments` | Array[Object] | Required | Tournaments owned by organizer |
| `tournaments[].id` | UUID | Required | Tournament ID |
| `tournaments[].title` | String | Required | Title |
| `tournaments[].sport` | String | Required | Sport category |
| `tournaments[].status` | String (Enum) | Required | `"live"` \| `"upcoming"` \| `"completed"` |
| `tournaments[].startDate` | Date (ISO 8601) | Required | Commencement date |
| `tournaments[].endDate` | Date (ISO 8601) | Required | Ending date |
| `tournaments[].venue` | String | Required | Main venue facility |
| `tournaments[].enrolledTeamsCount`| Integer | Required | Enrolled teams |
| `tournaments[].maxTeams` | Integer | Required | Tournament team cap |
| `tournaments[].entryFeeEgp` | Integer | Required | Team entry fee in EGP |
| `tournaments[].collectedFeesEgp` | Integer | Required | Total fees collected to date in EGP |
| `tournaments[].totalExpectedFeesEgp` | Integer | Required | Maximum potential fee collection |
| `tournaments[].pendingVerificationsCount` | Integer | Required | Pending student ID and fee reviews |

#### Write Model: Create Tournament (`POST /api/organizer/tournaments`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Required | Official tournament title |
| `sport` | String | Required | Sport category |
| `universityLeague` | String | Required | Associated collegiate athletic conference |
| `startDate` | Date (ISO 8601) | Required | Opening match date |
| `endDate` | Date (ISO 8601) | Required | Championship final date |
| `venue` | String | Required | Facility name |
| `pitchName` | String | Required | Primary pitch or court label |
| `maxTeams` | Integer | Required | Maximum squad capacity (e.g., `16`) |
| `entryFeeEgp` | Integer | Required | Per-team entry fee in EGP |
| `paymentInstructions` | String | Optional | InstaPay / bank transfer instructions |

#### JSON Example
```json
// Request: POST /api/organizer/tournaments
{
  "title": "Giza Universities Spring Cup 2026",
  "sport": "Football",
  "universityLeague": "Egyptian Collegiate Athletic League (ECAL)",
  "startDate": "2026-11-01T09:00:00Z",
  "endDate": "2026-11-15T21:00:00Z",
  "venue": "Cairo University Stadium Complex",
  "pitchName": "Main Stadium Pitch",
  "maxTeams": 16,
  "entryFeeEgp": 1500,
  "paymentInstructions": "InstaPay transfer to 01012345678 (Cairo Uni Athletic Dept)."
}

// Response: 201 Created
{
  "id": "tourn-giza-spring-2026",
  "title": "Giza Universities Spring Cup 2026",
  "status": "upcoming",
  "enrolledTeamsCount": 0,
  "maxTeams": 16,
  "entryFeeEgp": 1500,
  "collectedFeesEgp": 0,
  "pendingVerificationsCount": 0
}
```

---

### 4.2 Tournament Setup (`/organizer/tournament/:id/setup`)
Tournament configuration management for rules, brand partners, fan amenities, and match structures.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Tournament ID |
| `title` | String | Required | Tournament title |
| `sport` | String | Required | Sport category |
| `rules` | Object | Required | Match rules configuration |
| `rules.matchDurationMinutes` | Integer | Required | Regular playing time (e.g., `80`) |
| `rules.extraTimeEnabled` | Boolean | Required | Extra time allowed if tied |
| `rules.penaltyShootoutEnabled` | Boolean | Required | Penalties allowed |
| `rules.maxSubstitutes` | Integer | Required | Max substitutes permitted |
| `rules.summary` | String | Required | Formatted rules description |
| `sponsors` | Array[Object] | Required | Brand sponsor lineup |
| `sponsors[].id` | UUID | Required | Sponsor record ID |
| `sponsors[].name` | String | Required | Sponsor brand name |
| `sponsors[].tier` | String (Enum) | Required | `"Title"` \| `"Presenting"` \| `"Official Partner"` \| `"Supporter"` |
| `sponsors[].logoUrl` | String (URL) | Required | Sponsor crest image |
| `sponsors[].tagline` | String | Optional | Sponsor tagline |
| `fanServices` | Array[Object] | Required | On-site services status |
| `fanServices[].id` | String | Required | Service identifier |
| `fanServices[].icon` | String | Required | Display icon |
| `fanServices[].label` | String | Required | Display title |
| `fanServices[].enabled` | Boolean | Required | Activation status on spectator view |

#### Write Model: Update Settings (`PUT /api/organizer/tournaments/:id/setup`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `rules` | Object | Optional | Modified rules configuration |
| `sponsors` | Array[Object] | Optional | Updated sponsors array |
| `fanServices` | Array[Object] | Optional | Updated fan services array |

#### JSON Example
```json
// Request: PUT /api/organizer/tournaments/e4b2d184-7c98-4c01-a1b7-d1a293849102/setup
{
  "rules": {
    "matchDurationMinutes": 90,
    "extraTimeEnabled": true,
    "penaltyShootoutEnabled": true,
    "maxSubstitutes": 5,
    "summary": "FIFA rules apply with university athlete eligibility enforcement."
  },
  "sponsors": [
    {
      "id": "sp-redbull",
      "name": "Red Bull Egypt",
      "tier": "Title",
      "logoUrl": "https://cdn.fnctn.eg/sponsors/redbull.png",
      "tagline": "Gives You Wings"
    }
  ]
}
```

---

### 4.3 Verification Desk (`/organizer/tournament/:id/review`)
Review queue for tournament directors to inspect team entry fee payments and verify athlete identity cards before match clearance.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `tournamentId` | UUID | Required | Tournament ID |
| `tournamentTitle` | String | Required | Tournament name |
| `pendingPayments` | Array[Object] | Required | Team entry fee review items |
| `pendingPayments[].id` | UUID | Required | Payment record ID |
| `pendingPayments[].teamId` | UUID | Required | Team ID |
| `pendingPayments[].teamName` | String | Required | Team name |
| `pendingPayments[].university` | String | Required | University name |
| `pendingPayments[].amountEgp` | Integer | Required | Fee amount transferred in EGP |
| `pendingPayments[].method` | String (Enum) | Required | `"InstaPay"` \| `"Bank Transfer"` \| `"Cash Desk"` |
| `pendingPayments[].referenceCode` | String | Required | Transfer transaction reference |
| `pendingPayments[].receiptImageUrl`| String (URL) | Required | Uploaded payment proof slip image |
| `pendingPayments[].submittedAt` | Date (ISO 8601) | Required | Submission timestamp |
| `pendingPayments[].status` | String (Enum) | Required | `"pending"` \| `"paid"` \| `"rejected"` |
| `pendingPayments[].teamMemberCount`| Integer | Required | Total team members |
| `pendingPayments[].verifiedMemberCount`| Integer | Required | Cleared members with valid IDs |
| `playerCardReviews` | Array[Object] | Required | Individual athlete document review cards |
| `playerCardReviews[].id` | UUID | Required | Review item ID |
| `playerCardReviews[].playerName` | String | Required | Athlete full name |
| `playerCardReviews[].studentAcademicId` | String | Required | Campus ID code |
| `playerCardReviews[].nationalIdNumber` | String | Required | 14-digit Egyptian National ID |
| `playerCardReviews[].studentIdCardUrl` | String (URL) | Required | High-res student ID card image |
| `playerCardReviews[].nationalIdFrontUrl`| String (URL) | Required | National ID front scan |
| `playerCardReviews[].status` | String (Enum) | Required | `"pending"` \| `"verified"` \| `"rejected"` |

#### Write Models
##### 1. Review Payment (`PUT /api/organizer/payments/:id/review`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Required | `"paid"` \| `"rejected"` |
| `rejectionReason` | String | Optional | Required if status is `"rejected"` |

##### 2. Review Player Card (`PUT /api/organizer/player-reviews/:id/review`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Required | `"verified"` \| `"rejected"` |
| `rejectionReason` | String | Optional | Reason if rejected (e.g., `"Expired academic card"`) |

#### JSON Example
```json
// Request: PUT /api/organizer/payments/pay-cairo-wolves/review
{
  "status": "paid"
}

// Request: PUT /api/organizer/player-reviews/rev-player-01/review
{
  "status": "rejected",
  "rejectionReason": "Expired academic student ID card (Must be valid for 2026 academic year)."
}
```

---

### 4.4 Match Day Controller (`/organizer/match/:matchId/live`)
Pitch-side referee and official table controller for team roll call check-in, real-time stopwatch clock, score updates, and match conclusion.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | Required | Match ID |
| `tournamentTitle` | String | Required | Tournament name |
| `stage` | String | Required | Match stage |
| `pitch` | String | Required | Pitch allocation |
| `status` | String (Enum) | Required | `"live"` \| `"halftime"` \| `"fulltime"` |
| `period` | String (Enum) | Required | `"Pre-Match Roll Call"` \| `"1st Half"` \| `"Halftime"` \| `"2nd Half"` \| `"Full-Time (Ended)"` |
| `clockSeconds` | Integer | Required | Match clock in elapsed seconds (e.g., `4440` for 74:00) |
| `clockRunning` | Boolean | Required | `true` if stopwatch is actively running |
| `teamA` | Object | Required | Team A roll call & scoring |
| `teamA.id` | UUID | Required | Team A ID |
| `teamA.name` | String | Required | Team A name |
| `teamA.score` | Integer | Required | Current score |
| `teamA.teamMembers` | Array[Object] | Required | Pitch-side roll call roster |
| `teamA.teamMembers[].id` | UUID | Required | Athlete ID |
| `teamA.teamMembers[].name` | String | Required | Athlete name |
| `teamA.teamMembers[].jerseyNumber` | Integer | Required | Shirt number |
| `teamA.teamMembers[].isCaptain` | Boolean | Required | Captain flag |
| `teamA.teamMembers[].rollCallStatus` | String (Enum) | Required | `"present"` \| `"no_show"` \| `"unmarked"` |
| `teamA.teamMembers[].checkInTime` | String | Optional | Time of physical pitch check-in |
| `teamB` | Object | Required | Team B roll call & scoring (mirrors teamA) |
| `events` | Array[Object] | Required | Recorded official events |
| `events[].id` | UUID | Required | Event ID |
| `events[].minute` | Integer | Required | Minute recorded |
| `events[].type` | String (Enum) | Required | `"goal"` \| `"yellow_card"` \| `"red_card"` \| `"substitution"` |
| `events[].team` | String (Enum) | Required | `"teamA"` \| `"teamB"` |
| `events[].playerName` | String | Required | Player name |
| `isEnded` | Boolean | Required | `true` once match concluded |
| `winnerTeamId` | UUID | Optional | Winning team ID |

#### Write Models
##### 1. Record Roll Call (`PUT /api/organizer/matches/:id/roll-call`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `playerId` | UUID | Required | Athlete ID |
| `status` | String (Enum) | Required | `"present"` \| `"no_show"` |

##### 2. Score Event (`POST /api/organizer/matches/:id/events`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `type` | String (Enum) | Required | `"goal"` \| `"yellow_card"` \| `"red_card"` \| `"substitution"` |
| `team` | String (Enum) | Required | `"teamA"` \| `"teamB"` |
| `playerName` | String | Required | Scorer or penalized player |
| `minute` | Integer | Required | Current match minute |
| `details` | String | Optional | Additional note |

##### 3. Clock & Period Control (`PUT /api/organizer/matches/:id/clock`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `action` | String (Enum) | Required | `"start"` \| `"pause"` \| `"reset"` \| `"set_period"` |
| `clockSeconds` | Integer | Optional | New clock time |
| `period` | String (Enum) | Optional | New match period |

##### 4. End Match (`POST /api/organizer/matches/:id/end`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `winnerTeamId` | UUID | Optional | Winning team ID |

#### JSON Example
```json
// Request: POST /api/organizer/matches/7a3e9c11-1254-46f9-b883-82a17019f2a9/events
{
  "type": "goal",
  "team": "teamA",
  "playerName": "Omar Hassan (#9)",
  "minute": 74,
  "details": "Header into top-right corner"
}

// Response: 200 OK
{
  "matchId": "7a3e9c11-1254-46f9-b883-82a17019f2a9",
  "scoreA": 2,
  "scoreB": 1,
  "eventLoggedId": "evt-goal-74"
}
```

---

## 5. University Admin & Scouter Data Models

### 5.1 Student ID Queue (`/university/students`)
Dean of Students & Athletic Affairs registrar queue for verifying student cards against university enrollment records.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `universityId` | UUID | Required | University ID |
| `universityName` | String | Required | University name (e.g., `"Cairo University"`) |
| `pendingCount` | Integer | Required | Number of unverified students in queue |
| `students` | Array[Object] | Required | List of student review items |
| `students[].id` | UUID | Required | Review queue item ID |
| `students[].studentName` | String | Required | Student full name |
| `students[].studentAcademicId` | String | Required | Claimed university seat/student number |
| `students[].nationalIdNumber` | String | Required | 14-digit Egyptian National ID |
| `students[].faculty` | String | Required | College / Faculty |
| `students[].academicYear` | String | Required | Term / Year |
| `students[].primarySport` | String | Required | Primary sport |
| `students[].avatarUrl` | String (URL) | Required | Headshot |
| `students[].studentIdCardUrl` | String (URL) | Required | Scanned student ID card image |
| `students[].nationalIdFrontUrl`| String (URL) | Required | National ID front |
| `students[].nationalIdBackUrl` | String (URL) | Required | National ID back |
| `students[].submittedAt` | Date (ISO 8601) | Required | Upload date |
| `students[].status` | String (Enum) | Required | `"pending"` \| `"approved"` \| `"rejected"` |
| `students[].rejectionReason` | String | Optional | Existing reason if rejected |

#### Write Model: Student Clearance Decision (`PUT /api/university/students/:id/clearance`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Required | `"approved"` \| `"rejected"` |
| `rejectionReason` | String | Optional | Required if status is `"rejected"` |

#### JSON Example
```json
// Request: PUT /api/university/students/stu-rev-01/clearance
{
  "status": "approved"
}

// Rejection Example:
{
  "status": "rejected",
  "rejectionReason": "Expired Student ID Card (Must be valid for current academic year)."
}
```

---

### 5.2 Team Approvals (`/university/teams`)
Dean / Athletic Affairs desk for reviewing campus athletic teams seeking official delegation permits to represent the university in intercollegiate championships.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `universityId` | UUID | Required | University ID |
| `teams` | Array[Object] | Required | Team endorsement requests |
| `teams[].id` | UUID | Required | Clearance request ID |
| `teams[].teamName` | String | Required | Team squad name |
| `teams[].teamLogoUrl` | String (URL) | Required | Team logo |
| `teams[].sport` | String | Required | Sport category |
| `teams[].targetTournamentTitle` | String | Required | Target tournament title |
| `teams[].captainName` | String | Required | Captain name |
| `teams[].captainEmail` | String | Required | Captain email |
| `teams[].status` | String (Enum) | Required | `"pending"` \| `"approved"` \| `"rejected"` |
| `teams[].officialPermitCode` | String | Optional | Generated permit code (e.g., `"DEAN-ATH-829104"`) |
| `teams[].rejectionReason` | String | Optional | Rejection explanation |
| `teams[].teamMembers` | Array[Object] | Required | Full delegation squad |
| `teams[].teamMembers[].studentId` | String | Required | Campus seat number |
| `teams[].teamMembers[].name` | String | Required | Athlete name |
| `teams[].teamMembers[].jerseyNumber` | Integer | Required | Shirt number |
| `teams[].teamMembers[].position` | String | Required | Field position |
| `teams[].teamMembers[].faculty` | String | Required | Enrolled faculty |
| `teams[].teamMembers[].isEnrolledVerified` | Boolean | Required | `true` if student ID cleared by registrar |

#### Write Model: Endorsement Decision (`PUT /api/university/teams/:id/clearance`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Required | `"approved"` \| `"rejected"` |
| `officialPermitCode` | String | Optional | Generated clearance certificate permit code |
| `rejectionReason` | String | Optional | Required if rejected |

#### JSON Example
```json
// Request: PUT /api/university/teams/clr-cairo-wolves/clearance
{
  "status": "approved",
  "officialPermitCode": "DEAN-ATH-829104"
}
```

---

### 5.3 Talent Directory (`/scout/directory`)
Searchable, filterable athlete discovery platform for university athletic directors, professional club scouts, and agents.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `totalAthletesCount` | Integer | Required | Total matching records |
| `page` | Integer | Required | Current page |
| `limit` | Integer | Required | Page limit |
| `athletes` | Array[Object] | Required | Discovered athlete cards |
| `athletes[].id` | UUID | Required | Athlete user ID |
| `athletes[].fullName` | String | Required | Full name |
| `athletes[].university` | String | Required | University |
| `athletes[].sport` | String | Required | Sport category |
| `athletes[].primaryPosition` | String | Required | Position (e.g., `"Striker"`) |
| `athletes[].age` | Integer | Required | Age |
| `athletes[].heightCm` | Integer | Optional | Height in cm |
| `athletes[].dominantFoot` | String (Enum) | Optional | `"Right"` \| `"Left"` \| `"Both"` |
| `athletes[].avatarUrl` | String (URL) | Required | Athlete headshot |
| `athletes[].stats` | Object | Required | Athletic telemetry summary |
| `athletes[].stats.matchesPlayed` | Integer | Required | Official matches contested |
| `athletes[].stats.goalsOrPoints` | Integer | Required | Cumulative scoring |
| `athletes[].stats.assists` | Integer | Optional | Assists |
| `athletes[].stats.mvpAwards` | Integer | Required | Man of the Match awards |
| `athletes[].isBookmarked` | Boolean | Required | `true` if saved by current scout |

#### Write Model: Query Filters (`GET /api/scout/athletes`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `sport` | String | Optional | Filter by sport |
| `university` | String | Optional | Filter by university |
| `position` | String | Optional | Filter by position |
| `minGoals` | Integer | Optional | Minimum goals threshold |
| `search` | String | Optional | Name search query |

#### Write Model: Bookmark Athlete (`POST /api/scout/bookmarks`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `athleteId` | UUID | Required | Target athlete user ID |
| `notes` | String | Optional | Private scout evaluation notes |

#### JSON Example
```json
// Response: GET /api/scout/athletes?sport=Football&position=Striker
{
  "totalAthletesCount": 42,
  "page": 1,
  "limit": 20,
  "athletes": [
    {
      "id": "usr-omar-hassan",
      "fullName": "Omar Hassan",
      "university": "Cairo University",
      "sport": "Football",
      "primaryPosition": "Striker (ST)",
      "age": 21,
      "heightCm": 182,
      "dominantFoot": "Right",
      "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      "stats": {
        "matchesPlayed": 8,
        "goalsOrPoints": 11,
        "assists": 4,
        "mvpAwards": 3
      },
      "isBookmarked": true
    }
  ]
}
```

---

## 6. Platform Admin Data Models

### 6.1 Admin Dashboard (`/admin/dashboard`)
Executive telemetry for platform administrators overseeing system health, user acquisition, tournament velocity, and fee processing.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `metrics` | Object | Required | Aggregate platform counts |
| `metrics.totalUsersCount` | Integer | Required | Total registered accounts across all roles |
| `metrics.totalAthletesCount` | Integer | Required | Total athlete profiles |
| `metrics.totalOrganizersCount` | Integer | Required | Total registered tournament directors |
| `metrics.totalUniversitiesCount` | Integer | Required | Accredited Egyptian universities |
| `metrics.activeTournamentsCount` | Integer | Required | Live championships currently underway |
| `metrics.liveMatchesNowCount` | Integer | Required | Matches currently live on pitch |
| `metrics.totalFeesProcessedEgp` | Integer | Required | Gross fee transactions processed in EGP |
| `systemHealth` | Object | Required | Real-time service uptime & telemetry |
| `systemHealth.databaseStatus` | String (Enum) | Required | `"healthy"` \| `"degraded"` \| `"down"` |
| `systemHealth.storageStatus` | String (Enum) | Required | `"healthy"` \| `"degraded"` \| `"down"` |
| `systemHealth.apiLatencyMs` | Integer | Required | Average response latency in milliseconds |
| `recentActivity` | Array[Object] | Required | System audit event log |
| `recentActivity[].id` | UUID | Required | Event ID |
| `recentActivity[].eventType` | String | Required | e.g. `"TOURNAMENT_CREATED"`, `"PAYMENT_CLEARED"` |
| `recentActivity[].description` | String | Required | Human-readable event description |
| `recentActivity[].actorEmail` | String | Required | User who initiated event |
| `recentActivity[].timestamp` | Date (ISO 8601) | Required | Event timestamp |

#### Write Model
*None (Read-only executive analytics surface).*

#### JSON Example
```json
{
  "metrics": {
    "totalUsersCount": 1420,
    "totalAthletesCount": 1280,
    "totalOrganizersCount": 42,
    "totalUniversitiesCount": 18,
    "activeTournamentsCount": 6,
    "liveMatchesNowCount": 2,
    "totalFeesProcessedEgp": 185000
  },
  "systemHealth": {
    "databaseStatus": "healthy",
    "storageStatus": "healthy",
    "apiLatencyMs": 42
  },
  "recentActivity": [
    {
      "id": "act-9102",
      "eventType": "TOURNAMENT_CREATED",
      "description": "Created 'Giza Universities Spring Cup 2026' with 16 team capacity",
      "actorEmail": "director@cu.edu.eg",
      "timestamp": "2026-10-13T21:40:00Z"
    }
  ]
}
```

---

### 6.2 User Management (`/admin/users`)
Administrative tool for managing user identity credentials, role permissions, and disciplinary account suspensions.

#### Read Model (Response)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `totalUsersCount` | Integer | Required | Total user records matching query |
| `page` | Integer | Required | Current pagination index |
| `limit` | Integer | Required | Results limit per page |
| `users` | Array[Object] | Required | User accounts list |
| `users[].id` | UUID | Required | Unique user ID |
| `users[].email` | String | Required | Email address |
| `users[].fullName` | String | Required | Full display name |
| `users[].role` | String (Enum) | Required | `"participant"` \| `"organizer"` \| `"university"` \| `"scout"` \| `"admin"` |
| `users[].universityName` | String | Optional | Affiliated university (if applicable) |
| `users[].status` | String (Enum) | Required | `"active"` \| `"suspended"` \| `"pending_approval"` |
| `users[].createdAt` | Date (ISO 8601) | Required | Registration timestamp |
| `users[].lastLoginAt` | Date (ISO 8601) | Optional | Most recent session timestamp |

#### Write Models
##### 1. Update User Role (`PUT /api/admin/users/:id/role`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `role` | String (Enum) | Required | `"participant"` \| `"organizer"` \| `"university"` \| `"scout"` \| `"admin"` |

##### 2. Update Account Status (`PUT /api/admin/users/:id/status`)
| Field Name | Data Type | Status | Description |
| :--- | :--- | :--- | :--- |
| `status` | String (Enum) | Required | `"active"` \| `"suspended"` |
| `reason` | String | Optional | Required when suspending an account |

#### JSON Example
```json
// Request: PUT /api/admin/users/f47ac10b-58cc-4372-a567-0e02b2c3d479/role
{
  "role": "organizer"
}

// Request: PUT /api/admin/users/f47ac10b-58cc-4372-a567-0e02b2c3d479/status
{
  "status": "suspended",
  "reason": "Repeated submission of forged student accreditation documents."
}

// Response: 200 OK
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "omar.hassan@eng.cu.edu.eg",
  "status": "suspended",
  "updatedAt": "2026-10-13T22:15:00Z"
}
```
