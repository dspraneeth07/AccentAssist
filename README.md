
# QwiXAccent - AI Pronunciation Analyzer

QwiXAccent is an advanced AI-powered pronunciation analysis tool designed to help users master American English pronunciation. Using cutting-edge speech recognition and AI analysis, it provides real-time feedback on pronunciation accuracy, helping users improve their accent and speaking confidence.

## Features

- **Real-time Speech Analysis**: Advanced AI-powered pronunciation evaluation
- **Interactive Voice Recording**: High-quality audio recording with waveform visualization
- **Instant Feedback**: Detailed analysis of vowels, consonants, stress, rhythm, and intonation
- **User Authentication**: Secure login and signup system with persistent storage
- **Progress Tracking**: Monitor improvement over time with detailed analytics
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI with shadcn/ui component library
- **State Management**: React hooks for local state management
- **Audio Processing**: Web Audio API for real-time audio analysis
- **Speech Recognition**: Google Gemini AI integration for transcription and analysis
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library
- **Fonts**: Poppins font family for modern typography

## Architecture

### File Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── VoiceRecorder.tsx      # Main recording interface
│   ├── FeedbackDisplay.tsx    # Analysis results display
│   ├── LearningSection.tsx    # Educational content
│   ├── PronunciationChart.tsx # Data visualization
│   ├── WaveformDisplay.tsx    # Audio waveform visualization
│   └── LandingPage.tsx        # Authentication and landing
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 error page
├── utils/
│   ├── speechAnalysis.ts      # AI speech processing logic
│   ├── textToSpeech.ts        # Audio playback utilities
│   └── geminiApi.ts           # Google Gemini AI integration
├── data/
│   └── credentials.ts         # User authentication system
├── hooks/
│   └── use-toast.ts           # Toast notification system
└── lib/
    └── utils.ts               # Utility functions
```

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │    │   Web Browser   │    │  QwiXAccent App │
│                 │    │                 │    │                 │
│ • Microphone    │───▶│ • Web Audio API │───▶│ • React Frontend│
│ • Voice         │    │ • MediaRecorder │    │ • State Mgmt    │
│ • Interactions  │    │ • AudioContext  │    │ • UI Components │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Data Storage   │    │   AI Analysis   │    │ Audio Processing│
│                 │◀───│                 │◀───│                 │
│ • Local Storage │    │ • Gemini AI     │    │ • Speech-to-Text│
│ • User Profiles │    │ • Transcription │    │ • Pronunciation │
│ • Credentials   │    │ • Feedback Gen. │    │ • Waveform Data │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Development Journey

### Phase 1: Foundation (Initial Setup)
- Set up React + TypeScript + Vite development environment
- Implemented Tailwind CSS for styling with custom design system
- Created basic component structure and routing

### Phase 2: Authentication System
- Developed secure user authentication with signup/login
- Implemented persistent local storage for user credentials
- Created attractive landing page with modern UI design
- Added form validation and error handling

### Phase 3: Audio Recording System
- Integrated Web Audio API for microphone access
- Built real-time audio recording with waveform visualization
- Implemented audio blob generation and playback functionality
- Added recording timer and visual feedback

### Phase 4: AI Integration
- Connected Google Gemini AI for speech analysis
- Implemented speech-to-text transcription
- Built pronunciation analysis and feedback system
- Added text-to-speech for correct pronunciation playback

### Phase 5: UI/UX Enhancement
- Designed responsive, mobile-friendly interface
- Implemented gradient backgrounds and modern styling
- Added interactive charts for pronunciation breakdown
- Created toast notifications for user feedback

### Phase 6: Polish & Optimization
- Optimized audio processing for better performance
- Enhanced error handling and user experience
- Added comprehensive logging and debugging
- Implemented clean, maintainable code structure

## Brand Identity

- **Logo**: ⚡ (Zap icon) - Represents the power and speed of AI-driven learning
- **Color Scheme**: Blue to Purple gradient - Modern, tech-forward, trustworthy
- **Typography**: Poppins - Clean, friendly, and highly readable
- **Design Philosophy**: Minimalist, user-centric, and accessibility-focused

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd qwixaccent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

The application is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

The `netlify.toml` file is configured for single-page application routing.

## Environment Setup

No environment variables required for basic functionality. The application uses:
- Local storage for user authentication
- Google Gemini AI (requires API key for production use)
- Web Audio API (browser-native)

## Browser Support

- Chrome 80+ (recommended for best audio support)
- Firefox 75+
- Safari 14+
- Edge 80+

**Note**: Microphone access requires HTTPS in production environments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for educational and demonstration purposes.

---

**QwiXAccent** - Empowering clear communication through AI-powered pronunciation analysis.
