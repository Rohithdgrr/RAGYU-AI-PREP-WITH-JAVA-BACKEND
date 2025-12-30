# RAGYU - Government Jobs Prep

AI-powered quiz platform for Indian Government exam preparation (RRB, IBPS, SBI, SSC, UPSC, LIC).

## Features

- **AI-Generated Questions** - Unique questions using Gemini/Mistral AI
- **Multiple Exam Types** - Railway, Banking, SSC, UPSC, Insurance exams
- **8 Subject Areas** - General Studies, Quantitative Aptitude, English, Reasoning, Computer Knowledge, Banking Awareness, Hindi, Static GK
- **Smart Question Tracking** - Avoids repetition for 7 days
- **Visual Explanations** - SVG diagrams for better understanding
- **Multiplayer Mode** - Compete with friends
- **AI Tutor (Libra)** - Get help with difficult concepts

## Tech Stack

- React 19 + TypeScript
- Vite
- Google Gemini AI / Mistral AI
- Tailwind CSS

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## License

MIT
