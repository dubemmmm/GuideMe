import { useState } from 'react'

export default function BookingLookup({ onNext }) {
  const [code, setCode] = useState('')
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    setFocused(true)
    setTimeout(() => setCode('SKY-7492X'), 400)
  }

  return (
    <div className="h-full flex flex-col bg-navy">
      {/* Progress bar */}
      <div className="shrink-0 px-6 py-3 bg-navy-mid border-b border-slate-700">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {['Identification', 'Flight Selection', 'Seat Selection', 'Baggage', 'Confirmation'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i === 0 ? 'bg-sky-accent text-white' : 'bg-slate-700 text-slate-500'
              }`}>
                {i + 1}
              </div>
              <span className={`text-[10px] ${i === 0 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
              {i < 4 && <span className="text-slate-600 mx-1 text-[10px]">→</span>}
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-2 h-1 bg-slate-700 rounded-full">
          <div className="h-full w-[20%] bg-sky-accent rounded-full"></div>
        </div>
      </div>

      <div className="text-center mt-4 mb-3 shrink-0">
        <h2 className="text-xl font-bold text-white">How would you like to check in?</h2>
        <p className="text-xs text-slate-400 mt-1">Step 1 of 5 — Identify yourself using one of the methods below</p>
      </div>

      {/* Three panels */}
      <div className="flex-1 flex gap-4 px-6 pb-3 min-h-0">
        {/* Panel 1: Scan Passport */}
        <div className="flex-1 bg-navy-light border border-slate-600 rounded-lg flex flex-col items-center justify-center p-4 gap-3">
          <div className="w-24 h-28 border-2 rounded relative overflow-hidden" style={{ animation: 'pulse-border 2s infinite' }}>
            <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="mx-auto mt-2">
              <rect x="6" y="6" width="48" height="58" rx="4" stroke="#60a5fa" strokeWidth="2" fill="#1a2d52" />
              <circle cx="30" cy="28" r="10" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
              <rect x="18" y="44" width="24" height="3" rx="1" fill="#60a5fa" />
              <rect x="20" y="50" width="20" height="2" rx="1" fill="#60a5fa" opacity="0.5" />
            </svg>
            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-blue-400 opacity-70" style={{ animation: 'scan-line 2s linear infinite' }}></div>
          </div>
          <p className="text-sm font-bold text-blue-300">Scan Passport</p>
          <p className="text-xs text-slate-400 text-center">Place passport face-down on the scanner below the screen</p>
          <div className="text-3xl text-blue-400">↓</div>
        </div>

        {/* Panel 2: Scan QR */}
        <div className="flex-1 bg-navy-light border border-slate-600 rounded-lg flex flex-col items-center justify-center p-4 gap-3">
          <div className="w-24 h-24 border-2 border-slate-500 rounded flex items-center justify-center">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="8" y="8" width="14" height="14" fill="#94a3b8" />
              <rect x="34" y="8" width="14" height="14" fill="#94a3b8" />
              <rect x="8" y="34" width="14" height="14" fill="#94a3b8" />
              <rect x="11" y="11" width="8" height="8" fill="#0a1628" />
              <rect x="37" y="11" width="8" height="8" fill="#0a1628" />
              <rect x="11" y="37" width="8" height="8" fill="#0a1628" />
              <rect x="13" y="13" width="4" height="4" fill="#94a3b8" />
              <rect x="39" y="13" width="4" height="4" fill="#94a3b8" />
              <rect x="13" y="39" width="4" height="4" fill="#94a3b8" />
              <rect x="28" y="28" width="6" height="6" fill="#94a3b8" />
              <rect x="38" y="34" width="6" height="4" fill="#94a3b8" />
              <rect x="34" y="42" width="4" height="6" fill="#94a3b8" />
            </svg>
          </div>
          <p className="text-sm font-bold text-slate-300">Scan Boarding Pass QR Code</p>
          <p className="text-xs text-slate-400 text-center">Hold your mobile device up to the reader on the right side of the kiosk</p>
          <div className="text-3xl text-slate-500">→</div>
        </div>

        {/* Panel 3: Confirmation Code */}
        <div
          className="flex-1 bg-navy-light border border-slate-600 rounded-lg flex flex-col items-center justify-center p-4 gap-3 cursor-pointer hover:border-sky-accent transition-colors"
          onClick={() => { if (code) onNext() }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="12" width="36" height="24" rx="3" stroke="#94a3b8" strokeWidth="2" fill="#1a2d52" />
            <text x="24" y="28" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">SKY-XXXX</text>
          </svg>
          <p className="text-sm font-bold text-slate-300">Enter Confirmation Code</p>
          <p className="text-xs text-slate-400 text-center mb-2">Type your 6-character booking code</p>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onFocus={handleFocus}
            placeholder="e.g. SKY-7492X"
            className="w-full max-w-[200px] bg-navy border border-slate-500 rounded px-3 py-2 text-center text-white font-mono text-sm focus:border-sky-accent focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="bg-sky-accent hover:bg-blue-600 text-white text-sm font-bold py-2 px-8 rounded mt-1"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Bottom distraction */}
      <div className="shrink-0 py-2 px-6 border-t border-slate-700 flex items-center justify-center gap-2">
        <span className="text-gold text-xs font-bold">✦ SkyWay Rewards Member?</span>
        <span className="text-xs text-slate-400">Log in here to earn miles and skip the line</span>
        <button className="text-xs text-gold underline ml-2">Sign In</button>
      </div>
    </div>
  )
}
