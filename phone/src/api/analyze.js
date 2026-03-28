// Deterministic interactive flow for the SkyWay Airlines kiosk demo.
// Each kiosk screen presents real options the user can see, and each
// option gives a specific instruction for what to tap.

// State machine: each state is either "options" (user picks) or "instruction" (user follows).
// "next" defines what state to go to after "Done, what's next?"
// For options states, each option maps to an instruction state.

const STATES = {
  // ─── FIRST SCAN ───
  initial_options: {
    mode: 'options',
    screen_description: 'This is a SkyWay Airlines self check-in kiosk.',
    options: [
      'Check in for my flight',
      'Look up my booking',
      'Change or cancel my flight',
      "I don't know what to do",
    ],
    transitions: {
      'Check in for my flight': 'welcome_instruction',
      'Look up my booking': 'welcome_instruction',
      'Change or cancel my flight': 'welcome_instruction_change',
      "I don't know what to do": 'welcome_instruction_help',
    },
  },

  // ─── SCREEN 1: WELCOME ───
  welcome_instruction: {
    mode: 'instruction',
    screen_description: 'Welcome screen of the SkyWay Airlines kiosk. A popup ad may be blocking the screen.',
    instruction:
      'If you see a popup offering a credit card or rewards, ignore it — look for the tiny text at the bottom that says "No thanks, continue to check-in" and tap it. Then tap the big blue "Begin Check-In" button in the center of the screen.',
    visual_hint: 'dismiss popup first, then center blue button',
    highlight: { x: 25, y: 30, w: 50, h: 20 },
    completed_context: 'Dismissed popup and tapped Begin Check-In.',
    next: 'booking_instruction',
  },
  welcome_instruction_change: {
    mode: 'instruction',
    screen_description: 'Welcome screen of the SkyWay Airlines kiosk.',
    instruction:
      'This kiosk is mainly for check-in. To change or cancel your flight, look for the small text at the bottom that says "Need Help? Call 1-800-SKYWAY." But first, let\'s try checking in. If there\'s a popup, dismiss it by tapping "No thanks" at the bottom. Then tap the blue "Begin Check-In" button.',
    visual_hint: 'center of screen, blue button',
    highlight: { x: 25, y: 30, w: 50, h: 20 },
    completed_context: 'Tapped Begin Check-In.',
    next: 'booking_instruction',
  },
  welcome_instruction_help: {
    mode: 'instruction',
    screen_description: 'Welcome screen of the SkyWay Airlines kiosk.',
    instruction:
      'No worries! If you see a popup ad, dismiss it by tapping "No thanks, continue to check-in" at the very bottom of the popup. Then tap the big blue button in the center of the screen that says "Begin Check-In."',
    visual_hint: 'center of screen, blue button',
    highlight: { x: 25, y: 30, w: 50, h: 20 },
    completed_context: 'Tapped Begin Check-In.',
    next: 'booking_instruction',
  },

  // ─── SCREEN 2: BOOKING LOOKUP ───
  booking_instruction: {
    mode: 'instruction',
    screen_description: 'Booking lookup screen with three panels: Scan Passport, Scan QR Code, and Enter Confirmation Code.',
    instruction:
      'Look at the right side of the screen. Tap the panel that says "Enter Confirmation Code." Tap the text box, type your booking code, and then tap the blue "Continue" button below it. Ignore the passport and QR code panels.',
    visual_hint: 'right panel, text input and blue Continue button',
    highlight: { x: 55, y: 20, w: 42, h: 50 },
    completed_context: 'Entered confirmation code and tapped Continue.',
    next: 'flight_options',
  },

  // ─── SCREEN 3: FLIGHT SELECTION ───
  flight_options: {
    mode: 'options',
    screen_description:
      'Your flight details are showing: SW-1247, Atlanta to Dallas, Texas. There are upgrade offers everywhere and a session timeout warning may pop up.',
    options: [
      'Skip all upgrades and continue',
      'Upgrade to Business Class ($849)',
      'Add Priority Boarding ($35)',
      'Add Travel Insurance ($29.99)',
    ],
    transitions: {
      'Skip all upgrades and continue': 'flight_skip',
      'Upgrade to Business Class ($849)': 'flight_upgrade',
      'Add Priority Boarding ($35)': 'flight_priority',
      'Add Travel Insurance ($29.99)': 'flight_insurance',
    },
  },
  flight_skip: {
    mode: 'instruction',
    screen_description: 'Flight details screen with upgrade offers and possibly a timeout warning.',
    instruction:
      'If you see a "Session Timeout Warning" popup, don\'t panic! Just tap the blue "Continue Check-In" button to dismiss it. Then ignore the big yellow "UPGRADE" banner and all offers. Look at the very bottom right corner for the tiny grey text that says "Skip Upgrades and Continue →" and tap it.',
    visual_hint: 'dismiss timeout popup, then bottom right tiny text',
    highlight: { x: 55, y: 80, w: 42, h: 16 },
    completed_context: 'Skipped upgrades.',
    next: 'seat_options',
  },
  flight_upgrade: {
    mode: 'instruction',
    screen_description: 'Flight details screen with upgrade offers.',
    instruction:
      'If a timeout warning pops up, tap "Continue Check-In" to dismiss it. Then look at the big yellow banner at the top. Tap the dark button that says "TAP HERE TO UPGRADE" on the right side. This will upgrade you to Business Class for $849.',
    visual_hint: 'top yellow banner, dark upgrade button',
    highlight: { x: 45, y: 0, w: 50, h: 22 },
    completed_context: 'Tapped upgrade to Business Class.',
    next: 'seat_options',
  },
  flight_priority: {
    mode: 'instruction',
    screen_description: 'Flight details screen with upgrade offers.',
    instruction:
      'If a timeout warning pops up, dismiss it first. Then look at the bottom of the flight details. Find the box that says "Add Priority Boarding — $35." Tap the checkbox next to it. Then find the tiny "Skip Upgrades and Continue →" text at the bottom right and tap it.',
    visual_hint: 'priority boarding checkbox, then bottom right skip text',
    highlight: { x: 0, y: 55, w: 55, h: 20 },
    completed_context: 'Added priority boarding, then continued.',
    next: 'seat_options',
  },
  flight_insurance: {
    mode: 'instruction',
    screen_description: 'Flight details screen with upgrade offers.',
    instruction:
      'If a timeout warning pops up, dismiss it first. Then look at the bottom right of the flight details. Find the "SkyWay Travel Insurance — $29.99" box and tap "Learn More." After reviewing, find the tiny "Skip Upgrades and Continue →" at the bottom right.',
    visual_hint: 'bottom right insurance box, then skip text',
    highlight: { x: 45, y: 50, w: 50, h: 25 },
    completed_context: 'Reviewed insurance, then continued.',
    next: 'seat_options',
  },

  // ─── SCREEN 4: SEAT SELECTION ───
  seat_options: {
    mode: 'options',
    screen_description:
      'Seat selection screen with an airplane seat map. You have been assigned seat 24B (a middle seat).',
    options: [
      'Keep my assigned seat (24B)',
      'Choose a different seat',
      'Upgrade for extra legroom ($89)',
    ],
    transitions: {
      'Keep my assigned seat (24B)': 'seat_keep',
      'Choose a different seat': 'seat_choose',
      'Upgrade for extra legroom ($89)': 'seat_upgrade',
    },
  },
  seat_keep: {
    mode: 'instruction',
    screen_description: 'Seat selection screen with airplane seat map.',
    instruction:
      'Look at the very bottom of the screen. There\'s a thin line with tiny underlined text that says "Continue with assigned seat (24B)." Tap that tiny text. Don\'t tap the bright "UPGRADE SEAT" button on the right — that costs $89.',
    visual_hint: 'very bottom center, tiny underlined text',
    highlight: { x: 15, y: 82, w: 70, h: 16 },
    completed_context: 'Kept assigned seat 24B.',
    next: 'baggage_options',
  },
  seat_choose: {
    mode: 'instruction',
    screen_description: 'Seat selection screen with airplane seat map.',
    instruction:
      'Look at the seat map in the center. Green seats are available for free. Tap any green seat you\'d like. After you tap one, a "Confirm Seat" button will appear on the right side — tap it to confirm.',
    visual_hint: 'center seat map, green colored seats',
    highlight: { x: 10, y: 15, w: 60, h: 60 },
    completed_context: 'Selected a new seat.',
    next: 'baggage_options',
  },
  seat_upgrade: {
    mode: 'instruction',
    screen_description: 'Seat selection screen with airplane seat map.',
    instruction:
      'Look at the right side panel. Tap the blue button that says "UPGRADE SEAT" under "Want more space?" This costs $89 for extra legroom.',
    visual_hint: 'right side panel, blue UPGRADE SEAT button',
    highlight: { x: 60, y: 25, w: 38, h: 25 },
    completed_context: 'Upgraded to Comfort+ seat.',
    next: 'baggage_options',
  },

  // ─── SCREEN 5: BAGGAGE ───
  baggage_options: {
    mode: 'options',
    screen_description:
      'Baggage declaration screen. You need to declare bags, accept the dangerous goods policy, and choose how to get your boarding pass. There\'s also a hidden "Special assistance" section with wheelchair options.',
    options: [
      'I have no checked bags',
      'I want to add 1 checked bag ($35)',
      'I want to add 2 checked bags ($80)',
      'I need wheelchair assistance at the gate',
    ],
    transitions: {
      'I have no checked bags': 'baggage_none',
      'I want to add 1 checked bag ($35)': 'baggage_one',
      'I want to add 2 checked bags ($80)': 'baggage_two',
      'I need wheelchair assistance at the gate': 'baggage_wheelchair',
    },
  },
  baggage_none: {
    mode: 'instruction',
    screen_description: 'Baggage declaration screen.',
    instruction:
      'You don\'t need to add any bags. Now look at the right side. Find the red section titled "⚠ Dangerous Goods Declaration." You must scroll down through all the legal text and check the small checkbox that says "I confirm that my luggage does not contain any prohibited items." You MUST check this box or the boarding pass buttons will stay greyed out.',
    visual_hint: 'right side, scroll down in red section, find checkbox',
    highlight: { x: 45, y: 45, w: 52, h: 25 },
    completed_context: 'No bags. Checked dangerous goods.',
    next: 'boarding_pass_options',
  },
  baggage_one: {
    mode: 'instruction',
    screen_description: 'Baggage declaration screen.',
    instruction:
      'Look at the top left. Find the "+" button next to the bag counter and tap it once so it shows "1." Then look at the right side — scroll down in the red "Dangerous Goods Declaration" section and check the small checkbox. You must check this or the boarding pass buttons stay greyed out.',
    visual_hint: 'top left + button, then right side checkbox',
    highlight: { x: 0, y: 8, w: 40, h: 22 },
    completed_context: 'Added 1 bag. Checked dangerous goods.',
    next: 'boarding_pass_options',
  },
  baggage_two: {
    mode: 'instruction',
    screen_description: 'Baggage declaration screen.',
    instruction:
      'Look at the top left. Find the "+" button and tap it twice so the number shows "2." Then look at the right side — scroll down in the red "Dangerous Goods Declaration" section and check the small checkbox. You must check this or the boarding pass buttons stay greyed out.',
    visual_hint: 'top left + button (tap twice), then right side checkbox',
    highlight: { x: 0, y: 8, w: 40, h: 22 },
    completed_context: 'Added 2 bags. Checked dangerous goods.',
    next: 'boarding_pass_options',
  },
  baggage_wheelchair: {
    mode: 'instruction',
    screen_description: 'Baggage declaration screen with a hidden special assistance section.',
    instruction:
      'Look at the left side of the screen and scroll down past the baggage pricing table and carry-on info. Find the collapsed section that says "▶ Special assistance & accessibility" and tap it to expand it. Inside, check the box next to "Wheelchair assistance at the gate." Then don\'t forget to also check the dangerous goods checkbox on the right side before choosing your boarding pass.',
    visual_hint: 'left side, scroll down, expand Special assistance section',
    highlight: { x: 0, y: 60, w: 55, h: 22 },
    completed_context: 'Enabled wheelchair assistance.',
    next: 'baggage_after_wheelchair',
  },
  baggage_after_wheelchair: {
    mode: 'options',
    screen_description:
      'Wheelchair is now enabled. You still need to set your bag count and check dangerous goods.',
    options: [
      'I have no checked bags',
      'I want to add 1 checked bag ($35)',
      'I want to add 2 checked bags ($80)',
    ],
    transitions: {
      'I have no checked bags': 'baggage_none',
      'I want to add 1 checked bag ($35)': 'baggage_one',
      'I want to add 2 checked bags ($80)': 'baggage_two',
    },
  },

  // ─── BOARDING PASS DELIVERY ───
  boarding_pass_options: {
    mode: 'options',
    screen_description:
      'The dangerous goods checkbox is checked. The boarding pass buttons are now active. Choose how to receive your boarding pass.',
    options: [
      'Print boarding pass at this kiosk',
      'Send boarding pass to my phone',
      'Email my boarding pass',
    ],
    transitions: {
      'Print boarding pass at this kiosk': 'bp_print',
      'Send boarding pass to my phone': 'bp_mobile',
      'Email my boarding pass': 'bp_email',
    },
  },
  bp_print: {
    mode: 'instruction',
    screen_description: 'Boarding pass delivery selection.',
    instruction:
      'Look at the bottom right. Tap the big blue button that says "🖨 Print Boarding Pass." Your boarding pass will print from the slot below the screen.',
    visual_hint: 'bottom right, blue Print Boarding Pass button',
    highlight: { x: 45, y: 58, w: 50, h: 22 },
    completed_context: 'Tapped Print Boarding Pass.',
    next: 'done',
  },
  bp_mobile: {
    mode: 'instruction',
    screen_description: 'Boarding pass delivery selection.',
    instruction:
      'Look at the bottom right. Tap the blue button that says "📱 Send to Mobile." The boarding pass will be sent to your phone number on file.',
    visual_hint: 'bottom right, blue Send to Mobile button',
    highlight: { x: 45, y: 45, w: 50, h: 22 },
    completed_context: 'Tapped Send to Mobile.',
    next: 'done',
  },
  bp_email: {
    mode: 'instruction',
    screen_description: 'Boarding pass delivery selection.',
    instruction:
      'Look at the bottom right. Tap the smaller button that says "✉ Email Boarding Pass." It\'s below the two blue buttons and has a thin border instead.',
    visual_hint: 'bottom right, bordered Email button (not blue)',
    highlight: { x: 45, y: 72, w: 50, h: 20 },
    completed_context: 'Tapped Email Boarding Pass.',
    next: 'done',
  },

  // ─── DONE ───
  done: {
    mode: 'instruction',
    screen_description: 'Check-in complete! Your boarding pass is ready.',
    instruction:
      "You're all done! Your boarding pass is ready. If you printed it, pick it up from the slot below the screen. Your gate is B27 and boarding starts at 2:05 PM. Have a wonderful flight!",
    visual_hint: 'collect boarding pass below the screen',
    highlight: null,
    completed_context: 'Check-in complete.',
    next: null,
  },
}

let currentState = null

export async function analyzeFrame({ image, language, intent = null, context = null }) {
  // Simulate a short delay to feel natural
  await new Promise((resolve) => setTimeout(resolve, 800))

  // First scan — no intent, show initial options
  if (!intent && !currentState) {
    currentState = 'initial_options'
    return { ...STATES.initial_options }
  }

  // "Done, what's next?" — advance to the next state
  if (intent === '__advance__' && currentState) {
    const state = STATES[currentState]
    if (state && state.next) {
      currentState = state.next
      return { ...STATES[currentState] }
    }
    // If no next state (we're done), restart
    currentState = 'initial_options'
    return { ...STATES.initial_options }
  }

  // User selected an option from an options screen
  if (intent && currentState) {
    const state = STATES[currentState]
    if (state && state.mode === 'options' && state.transitions[intent]) {
      currentState = state.transitions[intent]
      return { ...STATES[currentState] }
    }
  }

  // Fallback — restart from options
  currentState = 'initial_options'
  return { ...STATES.initial_options }
}

export function resetFlow() {
  currentState = null
}
