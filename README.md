# Ods 🌟

An interactive personality quiz application that helps you discover your character through thoughtful questions.

## Features

- **Interactive Personality Quiz**: 10 questions that reveal your character type
- **Three Character Types**: Dream Chaser, Growth Seeker, and Voyager - each with unique traits
- **Real-time Analytics**: See what percentage of users share your result
- **Data Tracking**: Results stored and tracked using Supabase
- **Smooth Animations**: Engaging UI powered by Framer Motion
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Backend**: Supabase (Database & API)
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account

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
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase Database:

Create a table called `results` in your Supabase project:
```sql
CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  count INTEGER DEFAULT 0
);

-- Insert initial data
INSERT INTO results (category, count) VALUES 
('dream', 0),
('soul', 0),
('adventure', 0);
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
ods/
├── src/
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific modules
│   ├── files/             # Static data (questions.json)
│   ├── providers/         # React context providers
│   ├── routes/            # Routing configuration
│   └── svg/               # SVG assets for character types
└── public/                # Static assets
```

## Character Types

**Dream Chaser** - Driven by goals and aspirations, working steadily to make dreams a reality with a clear vision of what you want to achieve.

**Growth Seeker** - Values personal growth and self-discovery, seeing change as an opportunity to learn and explore different perspectives.

**Voyager** - Naturally curious explorer who loves new ideas and experiences, unafraid to step outside the comfort zone.

## Deployment

The app is configured for automatic deployment on Vercel from the main branch.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgments

Inspired by the philosophical quote: *"To realize one's destiny is a person's only obligation"*
