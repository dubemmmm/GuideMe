import { useState, useEffect } from 'react'

export default function WelcomeScreen({ onNext }) {
  const [showAd, setShowAd] = useState(false)

  // Pop up a distracting ad after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-full flex flex-col bg-navy relative">
      {/* Upsell popup overlay */}
      {showAd && (
        <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gradient-to-b from-navy-mid to-navy border border-gold/50 rounded-xl p-6 max-w-md w-full mx-6 shadow-2xl text-center">
            <p className="text-gold font-black text-xl mb-2">✦ EXCLUSIVE OFFER ✦</p>
            <p className="text-white font-bold text-base mb-1">SkyWay Rewards Visa Card</p>
            <p className="text-slate-400 text-sm mb-4">Earn <span className="text-gold font-bold">80,000 bonus miles</span> after your first purchase. No annual fee for the first year!</p>
            <button className="bg-gold text-navy font-bold text-sm py-3 px-8 rounded-lg w-full mb-3 hover:bg-gold-bright">
              APPLY NOW — Pre-Approved!
            </button>
            <button className="bg-sky-accent text-white font-bold text-sm py-2.5 px-6 rounded w-full mb-3 hover:bg-blue-600">
              Learn More About Rewards
            </button>
            <button
              onClick={() => setShowAd(false)}
              className="text-[10px] text-slate-600 underline"
            >
              No thanks, continue to check-in
            </button>
          </div>
        </div>
      )}

      {/* Promo banner */}
      <div className="bg-gold/90 text-navy py-2 px-4 text-sm font-bold overflow-hidden shrink-0">
        <div className="whitespace-nowrap" style={{ animation: 'scroll-text 20s linear infinite' }}>
          ✈ SkyWay Gold Members — Skip the line! Tap here to learn more &nbsp;&nbsp;|&nbsp;&nbsp;
          NEW: SkyWay Rewards Visa Card — Earn 80,000 bonus miles &nbsp;&nbsp;|&nbsp;&nbsp;
          WiFi now available on all international flights &nbsp;&nbsp;|&nbsp;&nbsp;
          Download the SkyWay App for mobile boarding passes
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left panel — Scan Passport */}
        <div className="w-1/4 border-r border-slate-700 flex flex-col items-center justify-center p-4 gap-3">
          <div className="w-20 h-24 border-2 border-blue-400 rounded flex items-center justify-center" style={{ animation: 'pulse-border 2s infinite' }}>
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
              <rect x="4" y="4" width="40" height="48" rx="4" stroke="#60a5fa" strokeWidth="2" fill="#1a2d52" />
              <circle cx="24" cy="22" r="8" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
              <rect x="14" y="34" width="20" height="3" rx="1" fill="#60a5fa" />
              <rect x="16" y="40" width="16" height="2" rx="1" fill="#60a5fa" opacity="0.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-blue-300">Scan Passport</p>
            <p className="text-xs text-slate-400 mt-1">Place your passport face-down on the scanner below</p>
            <p className="text-2xl text-blue-400 mt-2">↓</p>
          </div>
        </div>

        {/* Center — Main actions */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-white mb-1">Welcome to SkyWay Airlines</h1>
            <p className="text-sm text-slate-400">Self-Service Check-In Kiosk</p>
          </div>

          {/* Begin Check-In — the correct button */}
          <button
            onClick={onNext}
            className="bg-sky-accent hover:bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-lg shadow-lg shadow-blue-900/50 transition-colors"
          >
            Begin Check-In
          </button>

          <div className="flex gap-3 mt-2">
            <button
              onClick={onNext}
              className="bg-navy-mid hover:bg-navy-light border border-slate-600 text-slate-300 text-sm py-3 px-6 rounded"
            >
              Enter Confirmation Code
            </button>
            <button className="bg-navy-mid hover:bg-navy-light border border-slate-600 text-slate-300 text-sm py-3 px-6 rounded">
              Frequent Flyer Login
            </button>
          </div>

          {/* Rewards upsell */}
          <div className="mt-4 border border-gold/40 rounded-lg p-3 bg-gold/5 max-w-md">
            <p className="text-gold text-xs font-bold">✦ SkyWay Rewards Member?</p>
            <p className="text-[11px] text-slate-400 mt-1">Log in to earn miles and access exclusive perks. Not a member? Sign up now and get 5,000 bonus miles!</p>
          </div>

          {/* Small help text */}
          <p className="text-[10px] text-slate-600 mt-4">Need Help? Call 1-800-SKYWAY (1-800-759-9291)</p>
        </div>

        {/* Right panel — Scan Boarding Pass */}
        <div className="w-1/4 border-l border-slate-700 flex flex-col items-center justify-center p-4 gap-3">
          <div className="w-20 h-20 border-2 border-slate-500 rounded flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="12" height="12" fill="#94a3b8" />
              <rect x="28" y="8" width="12" height="12" fill="#94a3b8" />
              <rect x="8" y="28" width="12" height="12" fill="#94a3b8" />
              <rect x="10" y="10" width="8" height="8" fill="#0a1628" />
              <rect x="30" y="10" width="8" height="8" fill="#0a1628" />
              <rect x="10" y="30" width="8" height="8" fill="#0a1628" />
              <rect x="12" y="12" width="4" height="4" fill="#94a3b8" />
              <rect x="32" y="12" width="4" height="4" fill="#94a3b8" />
              <rect x="12" y="32" width="4" height="4" fill="#94a3b8" />
              <rect x="24" y="24" width="4" height="4" fill="#94a3b8" />
              <rect x="32" y="28" width="4" height="4" fill="#94a3b8" />
              <rect x="28" y="36" width="4" height="4" fill="#94a3b8" />
              <rect x="36" y="32" width="4" height="4" fill="#94a3b8" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-300">Scan Boarding Pass</p>
            <p className="text-xs text-slate-400 mt-1">Hold your mobile boarding pass QR code to the reader</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-center gap-6 py-2 border-t border-slate-700 text-xs text-slate-500 shrink-0">
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" fill="none"/><text x="7" y="10" textAnchor="middle" fontSize="8" fill="currentColor">?</text></svg>
          Accessibility
        </span>
        <span>|</span>
        <span className="flex items-center gap-1">
          🌐 Language: English ▾
        </span>
        <span>|</span>
        <span>Terms and Conditions</span>
        <span>|</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  )
}
