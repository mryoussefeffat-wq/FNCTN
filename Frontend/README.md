# FNCTN Frontend

This is the web client for the FNCTN Egyptian university sports platform, built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS v4**.

## Quick Local Run

From this directory (`c:\Users\user\Desktop\Freelancing\FNCTN\FNCTN\Frontend`):

```powershell
# 1. Install dependencies (already present in node_modules)
pnpm install

# 2. Start the development server
pnpm run dev
```

Open your browser at **[http://localhost:8443](http://localhost:8443)**.

*(Note: The default port configured in `vite.config.ts` is `8443`. If you want port 5173, run `$env:PORT="5173"; pnpm run dev` in PowerShell).*

---

## Detailed Documentation

- **[RUN_AND_DEPLOYMENT_GUIDE.md](file:///c:/Users/user/Desktop/Freelancing/FNCTN/FNCTN/Frontend/RUN_AND_DEPLOYMENT_GUIDE.md)**: Full guide explaining how to run locally, troubleshooting common PowerShell errors, and deployment plans (Netlify, Vercel, Docker).
- **[fnctn_frontend_architecture.md](file:///c:/Users/user/Desktop/Freelancing/FNCTN/FNCTN/Frontend/fnctn_frontend_architecture.md)**: Page structure, routing, and user flows.
- **[AGENTS.md](file:///c:/Users/user/Desktop/Freelancing/FNCTN/FNCTN/Frontend/AGENTS.md)**: Project structure and coding rules.

---

## Scripts

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | Launch local dev server (port 8443) |
| `pnpm run build` | Compile to `dist/` |
| `pnpm run preview` | Preview production bundle locally |
| `pnpm run format` | Format code using `oxfmt` |
