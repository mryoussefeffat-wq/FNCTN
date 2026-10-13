# FNCTN: Frontend Page Architecture & Routing Documentation

This document outlines the complete page structure, user flows, and URL routing for the FNCTN platform. It covers the public marketing site, logged-in participant tools, organizer management, and university administrative suites. *(Note: The Fan Hub spectator module is deactivated for the current release phase).*

## 1. Public Landing Page (No Login Required)

This is a single scrolling page designed to show visitors what the app does, highlight sponsors, and encourage athletes to sign up.

### Section A: Home (Hero)

- **Content:** Main logo, large welcome text, and call-to-action buttons: "Athlete Sign Up" (direct to onboarding) and "Explore Tournament Schedule" (scrolls to events).

### Section B: Upcoming Events & Fan Zone

- **Content:** A swipeable row of tournament cards.

- **Tabs:** Three simple filters at the top: Live, Upcoming, and Past.

- **Card Details:** Basic info (Sport, University, Dates), a clear Sponsor Showcase ("Presented by [Logo]"), and Fan Services icons (🍔 Food Trucks, 🎧 Live DJ, 🎁 Giveaways).

- **Interaction:** Tapping a card opens the comprehensive in-page tournament details showcase modal.

### Section C: Who Are We

- **Content:** A short text section explaining the mission of FNCTN for Egyptian university sports.

### Section D: Participate

- **Content:** Four simple steps explaining how to play (1. Create Account, 2. Upload ID, 3. Form Team, 4. Play). Ends with a "Sign Up Now" button.

## 2. The Fan Hub (Deactivated for Current Release Phase)

> **Status Notice:** The Fan Hub module is deactivated in the current release to focus on the core athlete participation, university student verification, and tournament organizer workflows. The specifications below are preserved for future spectator rollouts.

### Fan Hub Home (`/hub`) [DEACTIVATED]

- **Live Now Banner:** A glowing alert at the top linking to live matches.

- **Search & Filter:** Find tournaments by university, sport, or city.

- **Tabbed Views:** Switch between Ongoing (today's schedule/standings), Upcoming (ticket sales/hype), and Past (final brackets/champions).

### Tournament Dashboard (`/hub/tournament/:id`)

- **Tab 1: Overview:** Ticket purchasing buttons (available/sold out), venue map, fan services list, and organizer contact details.

- **Tab 2: Matches & Brackets:** A visual tournament tree and a chronological schedule of matches.

- **Tab 3: Teams:** A clean grid of participating team logos and names.

- **Tab 4: News & Media:** A feed for organizer updates, announcements, and photo galleries.

### Live Match Viewer (`/hub/tournament/:id/match/:matchId`)

- Real-time live scores, team rosters, dedicated sponsor ad slots, and a button to download match graphics for social media.

### Public Profiles

- **Team Profile (`/hub/team/:id`):** Win/loss record, logo, and current roster.

- **Player Profile (`/hub/player/:id`):** Name, university, position, and fun stats (e.g., "Top Scorer"). Secure ID photos and contact details remain strictly hidden.

## 3. Authentication Pages

Standard pages for users to access their accounts.

- **Log In:** Email/Password form and a "Sign in with Google" button.

- **Sign Up:** Form to create a new account.

- **Forgot Password:** A page to request a password reset email.

## 4. Protected App Area (Login Required)

Tools for participants, organizers, and platform admins.

### Participant Pages (Student Athletes)

- **Player Dashboard:** Main home screen showing their upcoming match schedule and important alerts.

- **Profile Settings:** Forms to edit details and securely upload their National/Student ID photo.

- **Team Hub & Roster Management (`/teams`):** Allows athletes to create or join teams, view their current teams, manage team membership, and apply to tournaments once all required IDs are uploaded.

#### Empty State

If the user has no teams, display two main entry points:

1. **Join Team:** A scanner tool to read a QR code or an input field to type a 6-character invite code.
2. **Create Team:** A form to establish a new team with:

   * Team Name
   * Team Logo
   * University

#### My Teams Dashboard

Once the user belongs to one or more teams, display a scrollable list of all teams the athlete is currently enrolled in.

Each team should be displayed as a card showing:

- Team name
- Team logo
- The user's role:

  * **Captain**
  * **Member**

Each team card should provide access to the team's roster and relevant team actions.

#### Header Actions

Persistent buttons should be displayed at the top of the Team Dashboard allowing the user to:

- **Join Team**
- **Create Team**

These actions should remain available even when the athlete already belongs to one or more teams.

#### Leave Team Workflow

A **"Leave Team"** action is available on each team card.

Tapping **"Leave Team"** must trigger a mandatory confirmation modal.

The modal should clearly warn the user that leaving the team will remove them from the active roster.

The confirmation/destructive action must use the FNCTN Vivid Red:

`#A60E13`

This action should require explicit confirmation before the athlete is removed from the team.

### Organizer Pages (Tournament Committee)

*Designed with large buttons for easy mobile use on the pitch.*

- **Organizer Dashboard:** A list of their tournaments and a "Create New Tournament" button.

- **Tournament Setup:** Forms to set rules, add fan services, upload sponsor logos, set max teams, dates, and entry fees.

- **Verification & Payment Desk:** A review list to check player IDs and mark team fees as "Paid" or "Rejected".

- **Match Day Controller:**

  * **Roll Call:** "Present" or "No-Show" buttons 15 minutes before the game.
  * **Live Scoreboard:** Big "+1" and "-1" buttons to update live scores, and an "End Match" button to advance the winner in the bracket.

### University Admin Pages

- **University Dashboard:** Overview of student verification queues and pending team participation requests for their specific university.

- **Student ID Verification:** Portal for university staff to inspect student ID photos, confirm enrollment, and accept or reject participant accounts.

- **Team Participation Approvals:** Portal to review and confirm/reject teams representing their university in external or internal tournaments.

### Scouter Pages

- **Talent Directory:** A search list to find players by university, sport, or stats.

- **Player Stats View:** Detailed record of a player's wins and goals (ID documents remain hidden).

### Admin Pages (Platform Owner)

- **Admin Dashboard:** Charts showing total users, active tournaments, and page views.

- **User Management:** A table to list users, approve organizers, or resolve disputes.

## 5. URL Route Map
 
| Path / URL | Page Component | Access Level |
| :--- | :--- | :--- |
| `/` | Landing Page | Public |
| `/hub` | Fan Hub Home | *Public (Deactivated)* |
| `/hub/tournament/:id` | Tournament Dashboard | *Public (Deactivated)* |
| `/hub/tournament/:id/match/:matchId` | Live Match Viewer | *Public (Deactivated)* |
| `/hub/team/:id` | Public Team Profile | *Public (Deactivated)* |
| `/hub/player/:id` | Public Player Stats | *Public (Deactivated)* |
| `/login` | Log In Page | Public |
| `/signup` | Sign Up Page | Public |
| `/reset-password` | Password Reset Page | Public |
| `/dashboard` | Player Dashboard | Participant |
| `/profile` | Profile & ID Upload | Participant |
| `/teams` | Team Management & Lineup | Participant |
| `/organizer/dashboard` | Organizer Dashboard | Organizer |
| `/organizer/tournament/:id/setup` | Tournament Settings | Organizer |
| `/organizer/tournament/:id/review` | ID Verification & Payments Desk | Organizer |
| `/organizer/match/:matchId/live` | Match Day Controller | Organizer |
| `/university/dashboard` | University Admin Dashboard | University Admin |
| `/university/students` | Student ID Verification Queue | University Admin |
| `/university/teams` | University Team Approvals | University Admin |
| `/scout/directory` | Talent Directory | Scouter |
| `/admin/dashboard` | Admin Dashboard | Admin |

## 6. Project Folder Structure

To keep the codebase clean and easy to navigate as you build this out, organizing your `src/` folder by features is highly effective:

```text
src/
├── assets/              # Images, global CSS (Tailwind import)
├── components/          # Reusable UI pieces (Buttons, Inputs, Modals)
├── features/            # Feature-specific components
│   ├── FanHub/          # All spectator pages and components
│   ├── Participant/     # Athlete dashboards and team management
│   ├── Organizer/       # Pitch-side tools and verification desk
│   ├── UniversityAdmin/ # Student ID and team clearance tools
│   └── Admin/           # Platform management charts
├── hooks/               # Custom React hooks
├── services/            # API calls to your backend
├── utils/               # Helper functions (e.g., date formatting)
├── App.jsx              # Main routing configuration
└── main.jsx             # React entry point