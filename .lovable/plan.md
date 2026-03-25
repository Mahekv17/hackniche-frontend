
# SafeGuard Pro — Gamified Workplace Safety App

## Design System
- **Dark theme**: Near-black backgrounds (#0a0a0a, #1a1a1a), dark card surfaces with subtle borders
- **Primary accent**: Neon green (#39FF14 / #00FF41) for active states, scores, buttons
- **Secondary accents**: Yellow (#FFD700) for warnings/streaks, Red (#FF3B30) for SOS/emergencies
- **Typography**: Bold uppercase headings (tracking-wider), monospace for data readouts
- **Glassmorphism**: Cards with backdrop-blur, semi-transparent backgrounds, subtle green/gray borders
- **Mobile-first**: max-w-md container centered on desktop, full-width on mobile

## App Shell (`Layout.tsx`)
- **Top Bar**: Fixed — avatar thumbnail, "SAFEGUARD PRO" title, "SHIFT: ACTIVE" badge, glowing notification bell icon
- **Bottom Nav**: Fixed — 5 tabs: Home, Leaderboard/Ranking, Camera (central FAB with green glow), Store, SOS
- **Page transitions**: framer-motion AnimatePresence with slide/fade between routes
- **Content area**: Scrollable between top and bottom bars

## Pages

### 1. Home (`/`)
- Hero card with operator status banner (avatar area, "OPERATOR 042", bio-sync/fatigue badges, green progress bar)
- Two stat cards side-by-side: Safety Score (radial progress ring, score number, "+12% TODAY") and Incident Free streak ("14 DAYS", "NEW PERSONAL BEST")
- "Rapid Protocol Review" section: horizontally swipeable flashcards (High Voltage Lockout, Chemical Handling, etc.) with icons, descriptions, "TAP TO REVIEW", point values

### 2. Leaderboard (`/leaderboard`)
- User's current points displayed prominently at top
- "Top Workers of the Shift" ranked list — top 3 highlighted with gold/silver/bronze accent colors
- Each row: rank, avatar, name, points, trend indicator

### 3. Store (`/store`)
- Header with user points balance ("12,450 PTS")
- "REWARD STORE" title with description text
- Vertical list of reward cards: image placeholder area, title, point cost, green "REDEEM" button
- Items: Free Lunch (1000), Team Coffee (500), Personal Gear (5000 - premium tier), 15-Min Break (2500)
- Locked section teaser at bottom ("NEW REWARDS UNLOCKING SOON")

### 4. SOS (`/sos`)
- System status header ("98% READY", location precision)
- Critical Emergency card: warning icon, "Emergency Response" title, description, swipe-to-SOS slider (red handle, must drag to activate)
- Fatigue Index card (score out of 100 with progress bar) and Biometric BPM card (heart icon, BPM value)
- Management Protocol card: "Request Cool-Down" button with moon icon
- Protocol info note at bottom

### 5. Camera (`/camera`)
- Full-screen dark overlay mimicking camera viewfinder
- "LIVE FEED // ACTIVE" + "HAZARD SCAN" header
- Green corner brackets as viewfinder frame
- Simulated detection overlay ("OBSTRUCTION DETECTED" badge)
- Bottom controls: Gallery thumbnail, large green "CAPTURE HAZARD +500 PTS" button, Flash toggle
- Signal strength, ISO/exposure, encoding readouts
- Close (X) button to navigate back

## Technical Notes
- Install `framer-motion` for page transitions
- All data is static/mock — no backend needed
- Swipe-to-SOS uses a draggable slider with threshold detection
- Flashcards use horizontal scroll with snap points
- Radial progress uses SVG circle with stroke-dasharray
