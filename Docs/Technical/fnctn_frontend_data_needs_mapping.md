# FNCTN: Frontend Data Needs Mapping

This document outlines the specific data requirements (read operations) and user actions (write operations) for each page in the FNCTN application. Use this mapping to define exact field names and data types for the API contracts.

## 1. Public App Data Needs (Fan Hub Deactivated)
> **Note:** The Fan Hub module (`/hub`, `/hub/tournament/:id`, `/hub/tournament/:id/match/:matchId`, `/hub/team/:id`, `/hub/player/:id`) is **deactivated** for the current release phase. Only the public **Landing Page (`/`)** is active for public tournament showcase and athlete discovery.

| Page / Route | Status | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- | :--- |
| **Landing Page** (`/`) | **Active** | List of upcoming/featured tournaments (Sport, Uni, Dates, Sponsor, Fan Services). | None (Navigation only). |
| **Fan Hub Home** (`/hub`) | *Deactivated* | Live matches for the banner. Tournaments list grouped by Ongoing, Upcoming, Past. Filter options. | Search/Filter tournaments. |
| **Tournament Dashboard** (`/hub/tournament/:id`) | *Deactivated* | Tournament details (venue, fan services). Brackets and match schedules. Participating teams list. News/media feed. | Click to buy tickets (redirects to payment or shows ticket status). |
| **Live Match Viewer** (`/hub/tournament/:id/match/:matchId`) | *Deactivated* | Real-time score. Team members (names only). Sponsor ad banners. | Download graphics. |
| **Public Profiles** (`/hub/team/:id` or `/hub/player/:id`) | *Deactivated* | Win/loss records. Public team lineups. Player stats and positions. **(No private data)** | None. |

## 2. Authentication Data Needs
Standard login and registration flows.

| Page / Route | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- |
| **Log In** (`/login`) | None. | Submit email/password. Submit Google Auth token. |
| **Sign Up** (`/signup`) | None. | Submit new user details (Name, Email, Password). |
| **Forgot Password** (`/reset-password`) | None. | Submit email to request a reset link. Submit new password. |

## 3. Participant (Athlete) Data Needs
Requires a logged-in student athlete to manage personal details and teams.

| Page / Route | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- |
| **Player Dashboard** (`/dashboard`) | User's personalized upcoming match schedule. System alerts (e.g., "ID rejected"). | None. |
| **Profile Settings** (`/profile`) | Current user profile details. ID verification status (Pending, Approved, Rejected). | Update text details. Upload ID photo file. |
| **Team Hub** (`/teams`) | List of teams the user belongs to. User's role in each team (Captain/Member). Full roster for each team. Invite codes. | Create a new team. Join a team (via code/QR). Leave a team. |

## 4. Organizer Data Needs
Tools for tournament managers, optimized for mobile use on the pitch.

| Page / Route | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- |
| **Organizer Dashboard** (`/organizer/dashboard`) | List of tournaments managed by this specific organizer. | Create a new blank tournament. |
| **Tournament Setup** (`/organizer/tournament/:id/setup`) | Current settings for a specific tournament (Rules, services, sponsors, fees, dates). | Update tournament settings. Upload sponsor logos. |
| **Verification Desk** (`/organizer/tournament/:id/review`) | List of pending teams. Payment statuses. Player ID cards (if authorized). | Mark fee as Paid/Rejected. Approve/Reject team entry. |
| **Match Day Controller** (`/organizer/match/:matchId/live`) | Match details. Rosters for both teams. Current score. | Mark player present/no-show. Update score (+1/-1). End match. |

## 5. University Admin & Scouter Data Needs
Tools for university staff to clear students, and for scouters to find talent.

| Page / Route | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- |
| **Student ID Queue** (`/university/students`) | Queue of unverified students claiming to attend their university, including ID photos. | Approve or Reject student status. |
| **Team Approvals** (`/university/teams`) | Queue of teams wanting to represent the university. | Approve or Reject team representation. |
| **Talent Directory** (`/scout/directory`) | Searchable list of all players and their game statistics. | Filter/Search players. |

## 6. Platform Admin Data Needs
High-level overview for the platform owner.

| Page / Route | Data Needed to Display (Read) | Actions User Can Take (Write) |
| :--- | :--- | :--- |
| **Admin Dashboard** (`/admin/dashboard`) | System metrics (total users, active tournaments, page views). | None. |
| **User Management** (`/admin/users`) | Complete list of all users and their roles (Player, Organizer, Admin). | Change user roles. Suspend/Ban users. |