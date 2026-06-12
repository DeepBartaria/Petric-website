# Petric Website Frontend

Public website frontend for Petric India.

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/Petric-India/website-frontend.git
cd website-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Ask an admin for staging values.

For local backend testing:

```env
VITE_API_URL=http://localhost:3000/api/
```

For shared staging backend later:

```env
VITE_API_URL=https://staging-api.petric.in/api/
```

If `VITE_API_URL` is not set, the app falls back to production:

```text
https://petric.in/api/
```

## Run Locally

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Environment Rules

- Keep `.env` local only.
- Commit only `.env.example`.
- Never commit API keys or live payment credentials.
- Developers and interns should use staging/local backend URLs, not production, unless explicitly approved.

## Git Workflow
s
`main` is protected. Make changes on a branch:

```bash
git checkout -b feature/short-description
git add .
git commit -m "Describe change"
git push origin feature/short-description
```

Open a pull request into `main`. Do not push directly to `main`.
