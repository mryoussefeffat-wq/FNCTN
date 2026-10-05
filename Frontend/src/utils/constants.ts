/**
 * Shared mock data, media assets, and constants for FNCTN frontend.
 */
import type { TournamentEvent } from "../types/tournament"

export const PLAYER_IMAGE =
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop&auto=format"

export const PITCH_IMAGE =
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop&auto=format"

export const CROWD_IMAGE =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?w=800&h=500&fit=crop&auto=format"

export const POPULAR_SPORTS = [
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
]

export const UNIVERSITIES = [
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
]

export const UPCOMING_GAMES = [
  { sport: "Basketball", a: "AUC", b: "GUC", time: "18:30", day: "Today" },
  { sport: "Padel", a: "BUE", b: "Ain Shams", time: "10:00", day: "Tomorrow" },
  { sport: "Football", a: "Helwan", b: "MSA", time: "16:00", day: "Sat 11" },
]

export const LEAGUE_TABLES: Record<string, [string, number, number, number][]> =
  {
    Football: [
      ["Cairo University", 24, 8, 1],
      ["AUC", 21, 7, 2],
      ["Ain Shams", 17, 5, 4],
      ["GUC", 15, 4, 4],
      ["MSA", 12, 3, 6],
      ["Helwan", 9, 2, 7],
      ["BUE", 4, 1, 8],
    ],
    Basketball: [
      ["AUC", 18, 9, 1],
      ["GUC", 16, 8, 2],
      ["Cairo University", 12, 6, 4],
      ["BUE", 10, 5, 5],
      ["Ain Shams", 8, 4, 6],
      ["MSA", 4, 2, 8],
      ["Helwan", 2, 1, 9],
    ],
    Padel: [
      ["GUC", 15, 5, 0],
      ["MSA", 12, 4, 1],
      ["AUC", 9, 3, 2],
      ["BUE", 6, 2, 3],
      ["Cairo University", 3, 1, 4],
      ["Ain Shams", 3, 1, 4],
      ["Helwan", 0, 0, 5],
    ],
  }

export const CORPORATE_SPONSORS = [
  { name: "Red Bull", tier: "Title Sponsor", logoText: "RED BULL" },
  { name: "Vodafone", tier: "Telecom Partner", logoText: "VODAFONE" },
  { name: "Banque Misr", tier: "Banking Partner", logoText: "BANQUE MISR" },
  { name: "Nike", tier: "Athletic Apparel", logoText: "NIKE SPORTS" },
  { name: "Under Armour", tier: "Gear Partner", logoText: "UNDER ARMOUR" },
]

export const TOURNAMENTS: TournamentEvent[] = [
  {
    id: "football-cup-26",
    title: "Capital University Football Championship '26",
    sport: "Football",
    statusCategory: "live",
    date: "May 12 – May 26, 2026",
    venue: "Cairo International Stadium & CU Arena",
    sponsor: {
      name: "Red Bull",
      tagline: "Presented by Red Bull Energy",
      badge: "⚡ RED BULL",
    },
    fanServices: [
      { icon: "🍔", label: "Food Trucks" },
      { icon: "🎧", label: "Live DJ" },
      { icon: "🎁", label: "Energy Giveaways" },
      { icon: "🪑", label: "Bleacher Seating" },
    ],
    teamsCount: "16 Universities",
    prize: "EGP 250,000",
    scoreOrWinner: "AUC 2 - 1 GUC (Live)",
    matchClock: "67' Second Half",
    teams: [
      { name: "Cairo Univ Lions", uni: "CU", seed: 1 },
      { name: "AUC Titans", uni: "AUC", seed: 2 },
      { name: "GUC Eagles", uni: "GUC", seed: 3 },
      { name: "BUE Knights", uni: "BUE", seed: 4 },
      { name: "Ain Shams Warriors", uni: "ASU", seed: 5 },
      { name: "MSA Stallions", uni: "MSA", seed: 6 },
    ],
    rulesSummary:
      "Official 11v11 FIFA Rules · Knockout Stages · Full VAR Support on Finals",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "padel-masters",
    title: "Cairo Inter-Varsity Padel Masters",
    sport: "Padel",
    statusCategory: "live",
    date: "June 20 – June 24, 2026",
    venue: "GUC Padel Arena, Tagamoa",
    sponsor: {
      name: "Vodafone Egypt",
      tagline: "Presented by Vodafone RED",
      badge: "🔴 VODAFONE RED",
    },
    fanServices: [
      { icon: "🎧", label: "Live DJ" },
      { icon: "🎁", label: "Brand Giveaways" },
      { icon: "🪑", label: "Courtside Lounge" },
      { icon: "🅿️", label: "Free Campus Parking" },
    ],
    teamsCount: "32 Doubles Teams",
    prize: "EGP 80,000",
    scoreOrWinner: "Hassan/Tarek (CU) 6-4, 3-2 Sherif/Adel (AUC)",
    matchClock: "Set 2 Ongoing",
    teams: [
      { name: "CU Alpha Pair", uni: "CU", seed: 1 },
      { name: "AUC Premier", uni: "AUC", seed: 2 },
      { name: "GUC Aces", uni: "GUC", seed: 3 },
    ],
    rulesSummary:
      "FIP Regulation Scoring · Best of 3 Sets · Golden Point Active",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "basketball-masters",
    title: "Nile Valley Inter-Collegiate Basketball Masters",
    sport: "Basketball",
    statusCategory: "upcoming",
    date: "June 2 – June 14, 2026",
    venue: "AUC Sports Complex, New Cairo",
    sponsor: {
      name: "Banque Misr",
      tagline: "Presented by Banque Misr Sports Fund",
      badge: "🏛️ BANQUE MISR",
    },
    fanServices: [
      { icon: "🍔", label: "Food Trucks" },
      { icon: "🎧", label: "Live DJ" },
      { icon: "🎁", label: "Half-Court Cash Shot" },
      { icon: "🪑", label: "2,000 Capacity Arena" },
    ],
    teamsCount: "12 Universities",
    prize: "EGP 150,000",
    teams: [
      { name: "AUC Panthers", uni: "AUC", seed: 1 },
      { name: "Cairo Univ Giants", uni: "CU", seed: 2 },
      { name: "Helwan Hawks", uni: "HU", seed: 3 },
      { name: "BUE Dragons", uni: "BUE", seed: 4 },
    ],
    rulesSummary:
      "FIBA Standard 4x10 Min Quarters · 24-second Shot Clock · 3-Referee Crew",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "sprint-showcase",
    title: "National University Sprint & Athletics Showcase",
    sport: "Track & Field",
    statusCategory: "upcoming",
    date: "July 5 – July 7, 2026",
    venue: "Maadi Olympic Center, Cairo",
    sponsor: {
      name: "Nike Running",
      tagline: "Presented by Nike Middle East",
      badge: "✔️ NIKE RUNNING",
    },
    fanServices: [
      { icon: "🎁", label: "Nike Merch Booth" },
      { icon: "🍔", label: "Healthy Fuel Bar" },
      { icon: "🪑", label: "Grandstand Seating" },
      { icon: "🎧", label: "Stadium Announcer" },
    ],
    teamsCount: "250+ Competitors",
    prize: "EGP 100,000 + Pro Club Trials",
    teams: [
      { name: "Ain Shams Track Delegation", uni: "ASU", seed: 1 },
      { name: "Cairo University Athletics", uni: "CU", seed: 2 },
      { name: "Alexandria Univ Sprinters", uni: "AU", seed: 3 },
    ],
    rulesSummary:
      "Electronic Timing (FAT) · Certified Track Surface · Direct Scouting Radar",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "winter-cup-25",
    title: "Winter Cup 2025: All-University Football Trophy",
    sport: "Football",
    statusCategory: "past",
    date: "Dec 10 – Dec 22, 2025",
    venue: "BUE Stadium, El Shorouk",
    sponsor: {
      name: "Under Armour",
      tagline: "Presented by Under Armour Egypt",
      badge: "⚡ UNDER ARMOUR",
    },
    fanServices: [
      { icon: "🏆", label: "Championship Stage" },
      { icon: "🎧", label: "Concert Finale" },
      { icon: "🍔", label: "Campus Food Fest" },
      { icon: "🎁", label: "Replica Jersey Drops" },
    ],
    teamsCount: "16 Universities",
    prize: "EGP 200,000",
    scoreOrWinner: "Champions: Cairo University (3 - 1 vs AUC)",
    teams: [
      { name: "Cairo Univ Lions (Champions)", uni: "CU", seed: 1 },
      { name: "AUC Titans (Runners-up)", uni: "AUC", seed: 2 },
      { name: "GUC Eagles (3rd Place)", uni: "GUC", seed: 3 },
    ],
    rulesSummary:
      "Full 16-team bracket tournament completed with 32,000 physical attendees.",
    image:
      "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "autumn-hoops-25",
    title: "Autumn 3x3 Inter-Collegiate Basketball Showdown",
    sport: "Basketball",
    statusCategory: "past",
    date: "November 14 – 16, 2025",
    venue: "Ain Shams Outdoor Sports Arena",
    sponsor: {
      name: "Orange Egypt",
      tagline: "Presented by Orange Egypt",
      badge: "🟧 ORANGE SPORTS",
    },
    fanServices: [
      { icon: "🎧", label: "Hip-Hop DJ" },
      { icon: "🎁", label: "Dunk Contest Prizes" },
      { icon: "🍔", label: "Food Trucks" },
      { icon: "🪑", label: "Court Bleachers" },
    ],
    teamsCount: "24 Teams",
    prize: "EGP 60,000",
    scoreOrWinner: "Champions: GUC Eagles (21 - 18 vs BUE)",
    teams: [
      { name: "GUC Eagles", uni: "GUC", seed: 1 },
      { name: "BUE Dragons", uni: "BUE", seed: 2 },
    ],
    rulesSummary:
      "Official FIBA 3x3 half-court rules with sudden death overtime.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop&auto=format",
  },
]
