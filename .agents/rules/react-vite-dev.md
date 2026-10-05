---
trigger: model_decision
description: When working on the frontend of the application
---

# Project Development Rules for AI Assistant

## 1. Tech Stack & Setup
- **Framework:** React with Vite.
- **Styling:** Tailwind CSS (v4 using the Vite plugin and `@import "tailwindcss";` in `src/index.css`).
- **Language:** JavaScript (or JSX). Keep code clean, modern, and easy to read.

## 2. Folder & File Structure
Always place files in their correct directories under `src/`:
- `src/components/`: Reusable UI pieces (buttons, cards, modals, navbars).
- `src/hooks/`: Custom reusable React hooks.
- `src/services/`: API calls or data-fetching logic.
- `src/utils/`: Small helper/utility functions.
- Keep component files focused. If a component gets too big, break it down into smaller sub-components.

## 3. Coding Style & Best Practices
- **Components:** Write clean, functional components using arrow functions or standard function declarations. Use clear props.
- **State Management:** Use built-in React hooks (`useState`, `useEffect`, `useContext`) unless a complex library is requested. Avoid over-engineering.
- **Comments:** Add brief, helpful comments for complex logic so it's easy to understand.

## 4. Tailwind CSS Styling Guidelines
- **Utility-First:** Write Tailwind classes directly inside the `className` prop.
- **Readability:** If a `className` string becomes too long and messy, break it into smaller components or use simple layout variables.
- **Modern Syntax:** Follow Tailwind v4 standards (e.g., standard color palettes, modern utility names, and responsive prefixes like `sm:`, `md:`, `lg:`). Avoid old configuration files unless a custom theme extension is necessary.