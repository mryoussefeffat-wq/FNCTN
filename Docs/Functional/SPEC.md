# Functional Specification Document: FNCTN (College Sports Platform)

## 1. Project Overview & Objectives
* **Project Name:** FNCTN
* **Objective:** A mobile-first web platform for Egyptian university sports leagues to manage tournaments, track live team standings, profile student athletes, and connect emerging talent with scouts and sponsors.
* **Target Scale:** Optimized for ~10,000 active mobile users across multiple universities (e.g., Cairo University, AUC, GUC, MSA).
* **Technology Stack:**
  * **Frontend:** React (Vite) + Tailwind CSS (Mobile-first responsive layout, hosted on Vercel/Netlify)
  * **Backend:** Python Flask with Flask-SQLAlchemy & Flask-JWT-Extended (REST API, hosted on Railway)
  * **Database:** PostgreSQL (hosted on Supabase)

---

## 2. User Roles & Access Control (RBAC)
The system enforces strict role-based access control managed on the Flask backend:
1. **Participant (Student Athlete):**
   * Register/login via Email/Password or Google SSO.
   * Build and manage an athletic profile (sport, university, stats).
   * Browse published tournaments/schedules and submit requests to join tournaments.
2. **Organizer:**
   * Inherits all participant privileges.
   * Create, update, and publish new sports tournaments.
   * Review incoming participant requests and approve/reject entries.
   * **Strict Deletion Rule:** Can *only* delete tournaments that they personally created (`creator_id` match).
3. **Scouter:**
   * Access the talent-scouting hub to view athlete profiles, match histories, and filter performance metrics by sport, university, and rank.
   * Restricted from creating tournaments or modifying system data.
4. **Admin:**
   * Overarching system oversight, user management, content moderation, and override/deletion capabilities.

---

## 3. Functional Modules & Requirements

### Module 1: Authentication, SSO & Security
* **Email/Password Auth:** Secure registration with hashed passwords (via Werkzeug security).
* **Google SSO:** One-tap login via Google OAuth. Backend verifies the Google ID token and automatically links or provisions user records in PostgreSQL.
* **Password Reset Flow:** 
  * "Forgot Password" triggers a secure, time-sensitive token (15-minute expiration via `itsdangerous`).
  * An automated email delivers a reset link to the user; clicking it allows them to update their password securely.
* **JWT Session Management:** Protected API routes verify user identity and role via JSON Web Tokens.

### Module 2: Tournaments & Fixtures Management
* **Tournament Creation:** Organizers define tournament attributes (title, sport category, start date).
* **Creator-Only Deletion Enforcement:** When a delete request is fired, the backend checks if the requesting user's ID matches the tournament's `creator_id`. If unauthorized, it returns a `403 Forbidden` response.
* **Fixture Scheduling:** Mobile-optimized schedules displaying upcoming matches with timestamps and university pairings.

### Module 3: Participant Join Workflow
* **Join Application:** Participants request entry into active tournaments with a single tap.
* **Organizer Approval Dashboard:** Organizers manage applicants and update their participation status (*Pending*, *Approved*, *Rejected*).

### Module 4: Standings, Leaderboards, & Stats
* **University Standings:** Live standings table updated post-fixture (Cairo Univ., AUC, GUC, MSA).
* **Individual Leaderboards:** Highlights top performers by metrics like *most wins*, *top scorer*, and *MVP votes*.
* **Platform Metrics:** Summary counters for teams, universities, sports categories, and total matches played.

### Module 5: Talent Scouting Hub
* **Athlete Profiles & Filtering:** Filterable directory allowing verified scouters to sort emerging athletes by sport, university, and performance rank.

### Module 6: Content, Media, & Timeline
* **Media Feeds:** Season news reports, photo galleries, and video clip grids.
* **Events Timeline & Sponsorship:** Chronological season roadmap from kickoff to finals, alongside partnership tiers (Platinum, Gold, Silver).

---

## 4. Non-Functional & Mobile Requirements
* **Mobile-First Responsiveness:** Touch-friendly UI components, structured for small screens with scalable Tailwind CSS breakpoints (`md:`, `lg:`).
* **Network Performance:** Optimized asset loading, compressed image handling, and low initial bundle size for smooth cellular (4G/5G) usage.
* **Security Hardening:** Restricted CORS policy allowing requests solely from the production frontend domain; environment secrets isolated from version control.