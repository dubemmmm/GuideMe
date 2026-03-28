import { useState, useEffect } from 'react'

export default function FlightSelection({ onNext }) {
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)
  const [countdown, setCountdown] = useState(120)

  // Show a fake session timeout warning after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTimeoutWarning(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Countdown timer that ticks but never actually expires
  useEffect(() => {
    if (!showTimeoutWarning) return
    const interval = setInterval(() => {
      setCountdown((c) => (c > 30 ? c - 1 : 30))
    }, 1000)
    return () => clearInterval(interval)
  }, [showTimeoutWarning])

  return (
    <div className="h-full flex flex-col bg-navy relative">
      {/* Session timeout warning overlay */}
      {showTimeoutWarning && (
        <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-navy-light border border-red-900/60 rounded-xl p-6 max-w-sm w-full mx-6 shadow-2xl text-center">
            <p className="text-red-400 font-bold text-lg mb-2">⚠ Session Timeout Warning</p>
            <p className="text-slate-300 text-sm mb-1">Your session will expire in</p>
            <p className="text-3xl font-mono font-bold text-red-400 mb-3">
              {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-slate-400 text-xs mb-4">
              Please complete your check-in to avoid losing your progress. Tap below to continue.
            </p>
            <button
              onClick={() => setShowTimeoutWarning(false)}
              className="bg-sky-accent hover:bg-blue-600 text-white font-bold text-sm py-3 px-8 rounded w-full mb-2"
            >
              Continue Check-In
            </button>
            <button className="text-[10px] text-slate-600">
              Start over from the beginning
            </button>
          </div>
        </div>
      )}

      {/* Upgrade banner */}
      <div className="shrink-0 bg-gradient-to-r from-yellow-700 via-gold-bright to-yellow-700 px-6 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <p className="text-navy font-black text-lg">✈ UPGRADE AVAILABLE!</p>
            <p className="text-navy/80 text-sm">SkyWay Business Class — Extra legroom, priority boarding, lounge access</p>
          </div>
          <div className="text-right">
            <p className="text-navy font-black text-2xl">Only $849</p>
            <button className="bg-navy text-gold font-bold text-sm py-2 px-6 rounded mt-1 hover:bg-navy-light">
              TAP HERE TO UPGRADE
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="shrink-0 px-6 py-2 bg-navy-mid border-b border-slate-700">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {['Identification', 'Flight Selection', 'Seat Selection', 'Baggage', 'Confirmation'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                i <= 1 ? 'bg-sky-accent text-white' : 'bg-slate-700 text-slate-500'
              }`}>
                {i < 1 ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] ${i <= 1 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
              {i < 4 && <span className="text-slate-600 mx-0.5 text-[9px]">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Flight details + side offers */}
      <div className="flex-1 flex min-h-0 px-6 py-3 gap-4">
        {/* Main flight info */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-3">We found your booking</h2>

          <div className="bg-navy-light border border-slate-600 rounded-lg p-4 flex-1">
            {/* Passenger */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
              <div>
                <p className="text-xs text-slate-400">Passenger</p>
                <p className="text-lg font-bold text-white">John Doe</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Confirmation</p>
                <p className="text-sm font-mono text-sky-accent">SKY-7492X</p>
              </div>
            </div>

            {/* Flight details */}
            <div className="flex items-center gap-6 mb-4">
              <div>
                <p className="text-xs text-slate-400">Flight</p>
                <p className="text-xl font-bold text-white">SW-1247</p>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">ATL</p>
                  <p className="text-[10px] text-slate-400">Atlanta</p>
                  <p className="text-xs text-white mt-1">2:45 PM</p>
                  <p className="text-[10px] text-slate-500">Today</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <p className="text-[10px] text-slate-500">Direct</p>
                  <div className="w-full flex items-center gap-1 my-1">
                    <div className="h-px flex-1 bg-slate-600"></div>
                    <span className="text-slate-400">✈</span>
                    <div className="h-px flex-1 bg-slate-600"></div>
                  </div>
                  <p className="text-[10px] text-slate-500">Non-stop</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">DFW</p>
                  <p className="text-[10px] text-slate-400">Dallas, Texas</p>
                  <p className="text-xs text-white mt-1">5:15 PM</p>
                  <p className="text-[10px] text-slate-500">Today</p>
                </div>
              </div>
            </div>

            {/* Class & status */}
            <div className="flex gap-4 text-xs mb-4 pb-3 border-b border-slate-700">
              <div><span className="text-slate-400">Class:</span> <span className="text-white">Economy (Y)</span></div>
              <div><span className="text-slate-400">Status:</span> <span className="text-green-400">Confirmed</span></div>
              <div><span className="text-slate-400">Fare:</span> <span className="text-white">Basic Economy</span></div>
            </div>

            {/* Inline upsells */}
            <div className="flex gap-3">
              <div className="flex-1 bg-navy border border-yellow-700/50 rounded p-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" readOnly />
                  <div>
                    <p className="text-xs font-bold text-gold">Add Priority Boarding</p>
                    <p className="text-[10px] text-slate-400">Board first, guaranteed overhead bin space</p>
                  </div>
                  <p className="text-sm font-bold text-gold ml-auto">$35</p>
                </div>
              </div>
              <div className="flex-1 bg-navy border border-slate-600 rounded p-3">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-300">SkyWay Travel Insurance</p>
                    <p className="text-[10px] text-slate-400">Trip cancellation, medical, lost baggage</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-bold text-white">$29.99</p>
                    <button className="text-[10px] text-sky-accent underline">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue — intentionally muted and tiny */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-[10px] text-slate-600">Is this not your flight? Contact SkyWay support at 1-800-SKYWAY</p>
            <button
              onClick={onNext}
              className="text-slate-500 hover:text-slate-300 text-[11px] py-1.5 px-4 transition-colors"
            >
              Skip Upgrades and Continue →
            </button>
          </div>
        </div>

        {/* Side panel — more upsells */}
        <div className="w-56 flex flex-col gap-3 shrink-0">
          <div className="bg-gradient-to-b from-navy-mid to-navy border border-gold/30 rounded-lg p-4 text-center">
            <p className="text-gold font-bold text-sm mb-1">✦ SkyWay Comfort+</p>
            <p className="text-xs text-slate-400 mb-2">Extra 4" legroom, premium snacks, priority deplaning</p>
            <p className="text-xl font-bold text-gold mb-2">$129</p>
            <button className="bg-gold text-navy font-bold text-xs py-2 px-4 rounded w-full hover:bg-gold-bright">
              UPGRADE NOW
            </button>
          </div>

          <div className="bg-navy-mid border border-slate-600 rounded-lg p-4 text-center">
            <p className="text-sm font-bold text-white mb-1">WiFi Pass</p>
            <p className="text-xs text-slate-400 mb-2">Stay connected at 35,000 feet</p>
            <p className="text-lg font-bold text-white">$19.99</p>
            <p className="text-[10px] text-slate-500">per flight segment</p>
          </div>

          <div className="bg-navy-mid border border-slate-600 rounded-lg p-4 text-center">
            <p className="text-sm font-bold text-white mb-1">Lounge Access</p>
            <p className="text-xs text-slate-400 mb-2">Relax before your flight at JFK Terminal 4 Lounge</p>
            <p className="text-lg font-bold text-white">$45</p>
            <button className="text-[10px] text-sky-accent underline mt-1">Add to trip</button>
          </div>
        </div>
      </div>
    </div>
  )
}
