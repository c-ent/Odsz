# Ods - Personality Quiz Application

**Ods** is an elegant, interactive personality quiz application that helps users discover their character archetype through thoughtful questions. Built with modern web technologies, it features beautiful animations, a starfield background, and smooth user interactions.

## ✨ Features

- **Interactive Personality Quiz**: 10 carefully crafted questions that reveal your character type
- **Three Character Archetypes**: 
  - 🌟 **Dream Chaser** - Goal-oriented and aspirational
  - 🌱 **Growth Seeker** - Focused on personal development and self-discovery
  - 🚀 **Voyager** - Curious explorer who loves new experiences
- **Beautiful UI/UX**: 
  - Animated starfield background with floating comets
  - Smooth transitions using Framer Motion
  - Responsive design that works on all devices
  - Greek letter choices (α, β, γ) for elegant selection
- **Real-time Analytics**: See what percentage of users got your result
- **Data Persistence**: Results are stored and tracked using Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS animations
- **Animations**: Framer Motion
- **Backend**: Supabase (Database & API)
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/c-ent/Ods.git
   cd Ods
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials in `.env.local`

4. **Set up Supabase Database**
   
   Create a table called `results` with the following structure:
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

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Banner/         # Landing page hero section
│   ├── Form/           # Quiz form component
│   ├── Head/           # SEO head component
│   └── Navbar/         # Navigation component
├── features/           # Feature-specific components
│   └── misc/
│       └── routes/     # Page components
├── files/              # Static data files
│   └── questions.json  # Quiz questions
├── providers/          # React context providers
├── routes/             # Routing configuration
└── svg/                # SVG assets
```

## 🎨 Character Archetypes

The quiz categorizes users into three distinct personality types:

### Dream Chaser 🌟
*"You're driven by your goals and aspirations. You work steadily to make your dreams a reality, motivated by a clear vision of what you want to achieve."*

### Growth Seeker 🌱
*"You value personal growth and self-discovery. You see change as an opportunity to learn about yourself and enjoy exploring different perspectives."*

### Voyager 🚀
*"You're naturally curious and love exploring new ideas and experiences. You're drawn to discovery and aren't afraid to step outside your comfort zone."*

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The app is configured for deployment on Vercel with automatic deployments from the main branch.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the philosophical quote: *"To realize one's destiny is a person's only obligation"*
- Built with modern React ecosystem and best practices
- Design inspired by minimalist aesthetics and smooth animations
