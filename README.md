# Odsz 🌟

An interactive personality quiz application that helps you discover your character through thoughtful questions.

**Live demo:** [https://odsz.vercel.app/](https://odsz.vercel.app/)

## Features

- **Interactive Personality Quiz**: 10 questions that reveal your character type (shuffled each session)
- **Three Character Types**: Dream Chaser, Growth Seeker, and Voyager — each with unique traits
- **Real-time Analytics**: See what percentage of users share your result
- **Data Tracking**: Results stored and tracked using Supabase
- **Smooth Animations**: Engaging UI powered by Framer Motion
- **Bot Protection**: Cloudflare Turnstile with server-side verification via Supabase Edge Functions

## Routes

| Path | Page |
|------|------|
| `/` | Landing (hero + quiz) |
| `/result/:category` | Results (`dream`, `soul`, or `adventure`) |
| `*` | 404 fallback |

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS v4 (Vite plugin, CSS-first config)
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Meta / errors**: react-helmet-async, react-error-boundary
- **Backend**: Supabase (Database, Edge Functions)
- **Security**: Cloudflare Turnstile
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions (lint, type-check, tests, build)

## Getting Started

### Prerequisites

- Node.js 18+ (CI uses Node 24)
- npm
- Supabase account
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) site key (required to submit results)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/c-ent/Ods.git
cd Ods
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Fill in your environment values in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

Without `VITE_TURNSTILE_SITE_KEY`, the quiz UI loads but cannot complete submission after the final question.

4. Add the background image:

Place your hero background at `public/images/bg-main.png` (referenced in `src/App.css`). The app expects this path at runtime.

5. Set up Supabase Database:

Run migrations in the Supabase SQL editor (or via the Supabase CLI):

```bash
# Supabase CLI (optional)
supabase db push
```

Or paste the contents of [`supabase/migrations/001_results.sql`](supabase/migrations/001_results.sql) into **SQL → New query** in the Supabase dashboard.

6. Deploy the Supabase Edge Function:

Install the [Supabase CLI](https://supabase.com/docs/guides/cli), link your project, then:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set TURNSTILE_SECRET_KEY=your_turnstile_secret_key
supabase functions deploy submit-result
```

Add `TURNSTILE_SECRET_KEY` in Supabase secrets only — never in Vercel or `.env` with a `VITE_` prefix.

7. Start the development server:

```bash
npm run dev
```

8. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run test` — Run unit tests
- `npm run test:watch` — Run unit tests in watch mode

## Project Structure

```
odsz/
├── src/
│   ├── components/            # UI (Banner, Form, Navbar, Comets, etc.)
│   │   └── Form/hooks/        # useQuiz, useSubmitResult
│   ├── features/quiz/routes/  # Landing, Results, NotFound
│   ├── files/                 # questions.json
│   ├── lib/                   # categories, results, Supabase client
│   ├── providers/             # Router, error boundary, helmet
│   ├── routes/                # Route table
│   └── svg/                   # Character result artwork
├── tests/                     # Unit tests (mirrors src layout)
├── supabase/
│   ├── functions/             # submit-result Edge Function
│   └── migrations/            # Database migrations
└── public/                    # Static assets (images, svg)
```

## Character Types

**Dream Chaser** — Driven by goals and aspirations, working steadily to make dreams a reality with a clear vision of what you want to achieve.

**Growth Seeker** — Values personal growth and self-discovery, seeing change as an opportunity to learn and explore different perspectives.

**Voyager** — Naturally curious explorer who loves new ideas and experiences, unafraid to step outside the comfort zone.

Category slugs in the database (`dream`, `soul`, `adventure`) map to the display names above.

## Architecture

```
Landing → Form (useQuiz) → Turnstile → submit-result Edge Function → RPC → Results
                ↓                                              ↓
         questions.json                            getCategoryPercentage (SELECT)
```

- **Quiz state** lives in `useQuiz` (shuffled question order, answers, auto-advance between questions). **Submission** is isolated in `useSubmitResult` (compute winner, captcha token, persist, navigate).
- **Domain logic** (`getWinningCategory`, category metadata) sits in `src/lib/` so it stays testable without React.
- **Supabase** stores aggregate counts only — no user accounts or PII. Writes go through a Turnstile-protected Edge Function; reads use public `SELECT`.

## Security

Row Level Security is enabled on `results`:

| Operation | Who | How |
|-----------|-----|-----|
| Read counts | `anon` | `SELECT` policy on `results` |
| Increment count | Edge Function | Turnstile verify → `increment_result_count` RPC (service role) |
| Direct RPC from browser | Blocked | `REVOKE EXECUTE` for `anon` / `authenticated` |
| Direct table writes | Blocked | No INSERT/UPDATE/DELETE policies for clients |

The Edge Function verifies a [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) token server-side, then calls the RPC with the service role. The RPC validates the category slug and atomically increments by 1.

## Running with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running

### Build and run

Make sure your env file has the Vite variables before building:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

```bash
docker build --secret id=env,src=.env -t odsz .
docker run -p 8080:8080 odsz
```

or

```bash
docker compose up --build
```

Then open your browser at `http://localhost:8080`.

## Deployment

The app deploys automatically to [Vercel](https://vercel.com/) from the `main` branch (`vercel.json` rewrites all routes to the SPA).

Set these environment variables in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TURNSTILE_SITE_KEY`

Ensure `public/images/bg-main.png` is committed or otherwise available in the build output.

### CI

On every push and pull request, [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run test`
4. `npm run build`

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [`LICENSE`](LICENSE) file for details.

## Acknowledgments

Inspired by the philosophical quote: *"To realize one's destiny is a person's only obligation"*
