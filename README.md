# GuideMe

A real-time accessibility assistant that bridges the digital divide by helping users navigate confusing public kiosks. Simply point your phone camera at the screen to receive clear, step-by-step guidance on what to do next.

Built for HackAtlanta 2026.

---

## Project Structure

```
GuideMe-Project/
├── backend/          # FastAPI server (AI-powered screen analysis)
├── phone/            # GuideMe mobile web app (React)
├── kiosk/            # SkyWay Airlines kiosk simulator (React)
├── requirements.txt  # Python dependencies for backend
├── .env              # Environment variables (API keys)
└── .env.example      # Template for .env setup
```

---

## Backend (`backend/`)

A Python FastAPI server that receives screenshots of kiosk screens and returns structured guidance using a multimodal AI model.

### Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app with two endpoints: `POST /analyze` (receives a base64 screenshot, returns guidance) and `GET /health` (health check). Includes CORS middleware, image saving for debug, and retry logic for API failures. |
| `openrouter.py` | Handles communication with the OpenRouter API using Google Gemini 2.0 Flash. Sends the kiosk screenshot along with a system prompt and parses the AI response into structured JSON. 30-second timeout, markdown stripping, and error handling built in. |
| `prompts.py` | Contains all system prompts that tell the AI how to analyze kiosk screens. Includes `OPTIONS_PROMPT` (identify the screen and give the user 3-4 choices), `INSTRUCTION_PROMPT` (give a single next action with a visual hint), and `KIOSK_CONTEXT` (detailed knowledge about all 6 kiosk screens). Supports English, Spanish, French, Yoruba, and Mandarin. |
| `schemas.py` | Pydantic models for request and response validation. `AnalyzeRequest` accepts image, language, intent, and context. Responses come in two shapes: `OptionsResponse` (multiple choices) and `InstructionResponse` (single step with visual hint). |

### How it works

1. The phone app captures a frame from the camera and sends it as base64 to `POST /analyze`
2. The backend builds a prompt using the user's language, intent, and conversation context
3. The prompt plus screenshot are sent to Gemini 2.0 Flash via OpenRouter
4. The AI response is parsed into structured JSON and returned to the phone app
5. The phone app renders the guidance (either options to pick from or a single instruction to follow)

---

## Phone App (`phone/`)

The GuideMe mobile web app. This is what the user holds in their hand and points at the kiosk screen. It uses the rear camera to see the kiosk, analyzes what's on screen, and walks the user through each step.

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main orchestrator. Manages the entire app flow: home screen, camera activation, frame capture, API calls, and rendering the correct panel state (analyzing, options, instruction, error). Auto-captures a frame 2 seconds after the camera starts. |
| `src/api/analyze.js` | The guidance engine. In demo mode, runs a deterministic state machine that maps each kiosk screen to the correct guidance without needing the backend. In production mode, calls the backend API. Contains all state definitions covering the full 6-screen kiosk flow. |
| `src/hooks/useCamera.js` | Custom hook for camera management. Requests the rear camera at 1280x720, manages the video stream, captures frames to base64 JPEG via a hidden canvas, and holds a wake lock to keep the screen on. |
| `src/hooks/useSpeech.js` | Custom hook for text-to-speech using the Web Speech API. Supports all 5 languages, runs at 0.85x speed for clarity, and exposes speak/stop/toggle controls. |
| `src/constants.js` | Language definitions (English, Spanish, French, Yoruba, Mandarin) and the backend API URL. |

### Components

| Component | Purpose |
|-----------|---------|
| `HomeScreen.jsx` | Landing page with the GuideMe branding, a language selector, an "I Need Help" button, and a "How it works" section explaining the 3-step process (Point, Pick, Follow). |
| `Header.jsx` | Top navigation bar with a back button, the GuideMe logo, and a language selector dropdown. |
| `CameraView.jsx` | Live camera feed taking up the top 40% of the screen. Includes a viewfinder overlay with corner brackets, a scanning line animation, a "Live" indicator pill, and the AR highlight overlay when an instruction is active. |
| `HighlightOverlay.jsx` | AR-style overlay that darkens the screen and cuts out a highlighted zone where the user should look. Includes a pulsing teal border and a "LOOK HERE" label. Uses percentage-based coordinates so it scales with the camera feed. |
| `InteractionPanel.jsx` | Bottom 60% of the screen. A scrollable panel that renders the current state: loading spinner while analyzing, option cards when choices are available, or instruction view when a specific action is needed. |
| `OptionCards.jsx` | Displays 3-4 numbered choices after the screen is analyzed. Each card describes an action the user might want to take. The last option is always "I don't know what to do" for users who are stuck. |
| `InstructionView.jsx` | Shows a single clear instruction telling the user exactly what to do next. Includes a "Where to look" card with a visual description of the button or area, a "Read aloud" button for text-to-speech, and a "Done, what's next?" button to advance. |
| `LoadingState.jsx` | Animated loading screen with a scanning eye icon, spinning ring, and shimmer progress bar shown while the screen is being analyzed. |
| `LanguageSelector.jsx` | Dropdown for switching between the 5 supported languages. Shows native language names and language codes. |

### Styling

| File | Purpose |
|------|---------|
| `src/index.css` | Tailwind CSS v4 theme with custom colors (cream, sand, teal, coral, bark, sage), custom fonts (Sora for headings, Plus Jakarta Sans for body), and keyframe animations (float, pulse-ring, slide-up, fade-in, scan-sweep, shimmer, highlight-pulse). |

### Configuration

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite config with React, Tailwind CSS, and Basic SSL plugins. HTTPS is required for iOS Safari to grant camera access. |
| `manifest.json` | PWA manifest so the app can be added to the home screen and run in standalone mode. |
| `.env` | Contains `VITE_API_URL` pointing to the backend server. |

---

## Kiosk Simulator (`kiosk/`)

A fake SkyWay Airlines self-check-in terminal built to look and feel like a real airport kiosk. It is intentionally designed with confusing UI patterns, upsell popups, and hidden buttons to demonstrate how overwhelming these interfaces can be for older adults and non-technical users.

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | State machine managing the 6-screen check-in flow. Tracks the current screen, selected seat, bag count, dangerous goods acknowledgment, and boarding pass method. Passes handlers and state down to each screen. |
| `src/components/KioskFrame.jsx` | Wrapper that gives every screen the kiosk look: dark navy background, SkyWay Airlines header with a live clock, and a footer with location info and copyright. |
| `src/components/SeatMap.jsx` | Interactive airplane seat map with 30 rows and 6 seats per row (A-F). Color coded by type: green (available), blue (extra legroom), yellow (preferred), red (exit row), grey (taken). The user's pre-assigned seat is 24B. |

### Screens

| Screen | What it does | What makes it confusing |
|--------|-------------|------------------------|
| `WelcomeScreen.jsx` | Starting screen with a "Begin Check-In" button. | A credit card upsell popup appears after 3 seconds covering the main content. The dismiss link is tiny. There are multiple scanner options and a rewards promo competing for attention. |
| `BookingLookup.jsx` | User enters their confirmation code to find their booking. | Three input methods shown side by side (passport scan, QR code, confirmation code). The correct option is on the right side and easy to miss. A rewards banner adds more visual noise. |
| `FlightSelection.jsx` | Shows the user's flight details (John Doe, ATL to DFW) and asks them to continue. | A fake session timeout popup with a countdown appears after 5 seconds. A bright gold upgrade banner dominates the top. Priority boarding and travel insurance checkboxes are pre-highlighted. The actual "Skip Upgrades and Continue" button is 11px grey text with no border, buried at the bottom. |
| `SeatSelection.jsx` | Lets the user pick a seat or keep their assigned one (24B). | The seat map is interactive and inviting, pushing users toward paid upgrades. A Comfort+ upsell is in the sidebar. The "Continue with assigned seat" link is 10px text in a muted color at the very bottom. |
| `BaggageScreen.jsx` | Bag selection, special assistance, and dangerous goods declaration. | Wheelchair assistance is buried inside a collapsed "Special assistance & accessibility" section that users have to scroll to and manually expand. The pricing table uses asterisks and mixed units. A mandatory dangerous goods checkbox must be checked before boarding pass options appear. |
| `ConfirmationScreen.jsx` | Check-in complete. Shows the boarding pass. | No confusion here. This is the success screen with a rendered boarding pass showing the passenger name (DOE / JOHN), route (ATL to DFW), flight number, gate, seat, and boarding time. |

### Styling

| File | Purpose |
|------|---------|
| `src/index.css` | Tailwind CSS v4 theme with kiosk-specific colors (navy, gold, sky-accent) and animations (pulse-border for scanner glow, scan-line, scroll-text for the promo banner). User selection and default cursors are disabled to feel more like a real kiosk. |

### Configuration

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite config with React, Tailwind CSS, and Basic SSL plugins. Server is configured with `host: true` on port 5174 so the kiosk can be accessed from a tablet on the same network. |

---

## Running the Project

### Prerequisites
- Node.js 18+
- Python 3.11+
- Both devices (phone and tablet/laptop for kiosk) on the same Wi-Fi network

### Backend
```bash
cd backend
pip install -r ../requirements.txt
cp ../.env.example ../.env   # Add your OpenRouter API key
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Kiosk (run on a tablet or second screen)
```bash
cd kiosk
npm install
npm run dev
# Open https://<your-local-ip>:5175 on the tablet
```

### Phone App
```bash
cd phone
npm install
npm run dev
# Open https://<your-local-ip>:5173 on your phone
```

Note: Both apps use self-signed HTTPS certificates. On first visit, you will need to accept the browser's security warning (this is expected for local development).

---

## Demo Flow

1. Open the kiosk on a tablet (acts as the self-check-in terminal)
2. Open the phone app on a phone
3. Tap "I Need Help" on the phone
4. Point the phone camera at the kiosk screen
5. Follow the step-by-step instructions to complete check-in
6. The phone guides you through all 6 screens, helping you avoid popups, find hidden buttons, and skip upsells

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, Uvicorn, httpx, Pydantic |
| AI | Google Gemini 2.0 Flash via OpenRouter API |
| Frontend (both apps) | React 19, Vite 8, Tailwind CSS 4 |
| Camera | `navigator.mediaDevices.getUserMedia` with rear camera |
| Speech | Web Speech API (text-to-speech) |
| PWA | Web App Manifest, standalone mode |
| HTTPS | `@vitejs/plugin-basic-ssl` (self-signed certs for camera access on iOS) |
