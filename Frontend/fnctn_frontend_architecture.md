# FNCTN: Frontend Page Architecture & Routing Documentation

This document outlines the complete page structure, user flows, and URL routing for the FNCTN platform. It separates the public marketing site, the highly interactive Fan Hub, and the logged-in participant and organizer tools.

## 1. Public Landing Page (No Login Required)
This is a single scrolling page designed to show visitors what the app does, highlight sponsors, and encourage athletes to sign up.

### Section A: Home (Hero)
* **Content:** Main logo, large welcome text, and two call-to-action buttons: "Get Started" (for athletes) and "Follow Live Matches" (redirects fans to the Fan Hub).

### Section B: Upcoming Events & Fan Zone
* **Content:** A swipeable row of tournament cards.
* **Tabs:** Three simple filters at the top: Live, Upcoming, and Past.
* **Card Details:** Basic info (Sport, University, Dates), a clear Sponsor Showcase ("Presented by [Logo]"), and Fan Services icons (🍔 Food Trucks, 🎧 Live DJ, 🎁 Giveaways).
* **Interaction:** Tapping a card takes the user to that specific Tournament Dashboard in the Fan Hub.

### Section C: Who Are We
* **Content:** A short text section explaining the mission of FNCTN for Egyptian university sports.

### Section D: Participate
* **Content:** Four simple steps explaining how to play (1. Create Account, 2. Upload ID, 3. Form Team, 4. Play). Ends with a "Sign Up Now" button.

## 2. The Fan Hub (Public App & Engagement)
This is the interactive space where spectators follow the action, buy tickets, and check scores.

### Fan Hub Home (`/hub`)
* **Live Now Banner:** A glowing alert at the top linking to live matches.
* **Search & Filter:** Find tournaments by university, sport, or city.
* **Tabbed Views:** Switch between Ongoing (today's schedule/standings), Upcoming (ticket sales/hype), and Past (final brackets/champions).

### Tournament Dashboard (`/hub/tournament/:id`)
* **Tab 1: Overview:** Ticket purchasing buttons (available/sold out), venue map, fan services list, and organizer contact details.
* **Tab 2: Matches & Brackets:** A visual tournament tree and a chronological schedule of matches.
* **Tab 3: Teams:** A clean grid of participating team logos and names.
* **Tab 4: News & Media:** A feed for organizer updates, announcements, and photo galleries.

### Live Match Viewer (`/hub/tournament/:id/match/:matchId`)
* Real-time live scores, team rosters, dedicated sponsor ad slots, and a button to download match graphics for social media.

### Public Profiles
* **Team Profile (`/hub/team/:id`):** Win/loss record, logo, and current roster.
* **Player Profile (`/hub/player/:id`):** Name, university, position, and fun stats (e.g., "Top Scorer"). Secure ID photos and contact details remain strictly hidden.

## 3. Authentication Pages
Standard pages for users to access their accounts.
* **Log In:** Email/Password form and a "Sign in with Google" button.
* **Sign Up:** Form to create a new account.
* **Forgot Password:** A page to request a password reset email.

## 4. Protected App Area (Login Required)
Tools for participants, organizers, and platform admins.

### Participant Pages (Student Athletes)
* **Player Dashboard:** Main home screen showing their upcoming match schedule and important alerts.
* **Profile Settings:** Forms to edit details and securely upload their National/Student ID photo.
* **Team Hub:** Forms to create or join a team (via 6-character code), view the roster, and apply to tournaments once all IDs are uploaded.

### Organizer Pages (Tournament Committee)
*Designed with large buttons for easy mobile use on the pitch.*
* **Organizer Dashboard:** A list of their tournaments and a "Create New Tournament" button.
* **Tournament Setup:** Forms to set rules, add fan services, upload sponsor logos, set max teams, dates, and entry fees.
* **Verification & Payment Desk:** A review list to check player IDs and mark team fees as "Paid" or "Rejected".
* **Match Day Controller:**
  * **Roll Call:** "Present" or "No-Show" buttons 15 minutes before the game.
  * **Live Scoreboard:** Big "+1" and "-1" buttons to update live scores, and an "End Match" button to advance the winner in the bracket.

### Scouter Pages
* **Talent Directory:** A search list to find players by university, sport, or stats.
* **Player Stats View:** Detailed record of a player's wins and goals (ID documents remain hidden).

### Admin Pages (Platform Owner)
* **Admin Dashboard:** Charts showing total users, active tournaments, and page views.
* **User Management:** A table to list users, approve organizers, or resolve disputes.

## 5. URL Route Map

| Path / URL | Page Component | Access Level |
| :--- | :--- | :--- |
| `/` | Landing Page | Public |
| `/hub` | Fan Hub Home | Public |
| `/hub/tournament/:id` | Tournament Dashboard | Public |
| `/hub/tournament/:id/match/:matchId` | Live Match Viewer | Public |
| `/hub/team/:id` | Public Team Profile | Public |
| `/hub/player/:id` | Public Player Stats | Public |
| `/login` | Log In Page | Public |
| `/signup` | Sign Up Page | Public |
| `/reset-password` | Password Reset Page | Public |
| `/dashboard` | Player Dashboard | Participant |
| `/profile` | Profile & ID Upload | Participant |
| `/teams` | Team Management & Roster | Participant |
| `/organizer/dashboard` | Organizer Dashboard | Organizer |
| `/organizer/tournament/:id/setup` | Tournament Settings | Organizer |
| `/organizer/tournament/:id/review` | ID Verification & Payments Desk | Organizer |
| `/organizer/match/:matchId/live` | Match Day Controller | Organizer |
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
│   └── Admin/           # Platform management charts
├── hooks/               # Custom React hooks
├── services/            # API calls to your backend
├── utils/               # Helper functions (e.g., date formatting)
├── App.jsx              # Main routing configuration
└── main.jsx             # React entry point
```

## Design & Style

Strictly adhere to the FNCTN branding specifications as detailed in `image_0.png`.

### A. Color Palette
All UI elements must use these exact hex codes:
*   **Primary Accent (Vivid Red):** `#A60E13` (Used for accents, active states, special titles/headings).
*   **Primary Background (Black):** `#000000` (Used for overall page and component backgrounds).
*   **Secondary Text/Wordmark (White):** `#FFFFFF` (Used for body text, general headings, and the FNCTN full wordmark on dark backgrounds).

### B. Fonts
All text must use the defined Poppins family and hierarchy:
*   **Primary Font Family:** Poppins (Available via Google Fonts).
*   **Headings:** Use Poppins with heavy weights.
    *   Major Section Titles (e.g., "Visual Aspects") are Vivid Red (`#A60E13`) Poppins bold.
    *   Standard Headings (e.g., "Authentication, SSO & Security") are White (`#FFFFFF`) Poppins semi-bold.
*   **Body Text:** White (`#FFFFFF`) Poppins regular.
*   **Logo/Wordmark:** The full wordmark FNCTN is White (`#FFFFFF`) clean sans-serif.

### C. Assets & Identity
Maintain the visual hierarchy for branding elements:
*   **Full Logo:** The complete wordmark FNCTN (White) used in the header.
*   **Icons (App, Social, Favicon):** Use the defined dark grey square with the white "FN" and a prominent red dot.
*   **Color Use Cases:** Use Red only for specific titles and interaction cues. White is for general content on Black.