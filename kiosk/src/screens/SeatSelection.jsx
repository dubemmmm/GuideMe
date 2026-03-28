import { useState } from 'react'
import SeatMap from '../components/SeatMap'

export default function SeatSelection({ selectedSeat, onSelectSeat, onNext }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSelect = (seat) => {
    onSelectSeat(seat)
    setShowConfirm(true)
  }

  return (
    <div className="h-full flex flex-col bg-navy">
      {/* Progress */}
      <div className="shrink-0 px-6 py-2 bg-navy-mid border-b border-slate-700">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {['Identification', 'Flight Selection', 'Seat Selection', 'Baggage', 'Confirmation'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                i <= 2 ? 'bg-sky-accent text-white' : 'bg-slate-700 text-slate-500'
              }`}>
                {i < 2 ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] ${i <= 2 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
              {i < 4 && <span className="text-slate-600 mx-0.5 text-[9px]">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Small instruction text */}
      <div className="shrink-0 px-6 pt-2">
        <p className="text-xs text-slate-400 text-center">Select your seat or tap Continue for your assigned seat (24B — Middle)</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 px-6 py-2 min-h-0">
        {/* Seat map */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-navy-light border border-slate-600 rounded-lg p-4 flex-1 w-full flex flex-col items-center overflow-hidden">
            {/* Plane nose */}
            <div className="w-48 h-6 bg-navy-mid rounded-t-full border border-b-0 border-slate-600 flex items-center justify-center mb-1">
              <span className="text-[9px] text-slate-500">FRONT OF AIRCRAFT</span>
            </div>

            <SeatMap selectedSeat={selectedSeat} onSelectSeat={handleSelect} />

            {/* Plane tail */}
            <div className="w-48 h-4 bg-navy-mid rounded-b-lg border border-t-0 border-slate-600 mt-1"></div>
          </div>

          {/* Legend — small and awkward */}
          <div className="flex gap-3 mt-2 text-[9px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-green-600 rounded-sm inline-block"></span>Available (Free)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-blue-600 rounded-sm inline-block"></span>Extra Legroom ($45)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-yellow-600 rounded-sm inline-block"></span>Preferred ($25)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-700 rounded-sm inline-block"></span>Exit Row ($55)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-slate-600 rounded-sm inline-block"></span>Taken</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-slate-700 rounded-sm inline-block"></span>Business</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-52 flex flex-col gap-3 shrink-0">
          {/* Selected seat info */}
          <div className="bg-navy-light border border-slate-600 rounded-lg p-3">
            <p className="text-xs text-slate-400">Your Seat</p>
            <p className="text-2xl font-bold text-white">{selectedSeat || '24B'}</p>
            <p className="text-[10px] text-slate-500">{selectedSeat ? 'Selected' : 'Assigned — Middle seat'}</p>
          </div>

          {/* Upsell */}
          <div className="bg-gradient-to-b from-navy-mid to-navy border border-sky-accent/30 rounded-lg p-4 text-center">
            <p className="text-sky-accent font-bold text-sm mb-1">Want more space?</p>
            <p className="text-xs text-slate-400 mb-2">Upgrade to SkyWay Comfort+ for extra legroom and recline</p>
            <p className="text-xl font-bold text-white mb-2">Only $89!</p>
            <button className="bg-sky-accent text-white font-bold text-xs py-2 px-4 rounded w-full hover:bg-blue-600">
              UPGRADE SEAT
            </button>
          </div>

          {/* Another upsell */}
          <div className="bg-navy-mid border border-slate-600 rounded-lg p-3 text-center">
            <p className="text-xs font-bold text-slate-300">Seat + Bag Bundle</p>
            <p className="text-[10px] text-slate-400 mt-1">Preferred seat + 1 checked bag</p>
            <p className="text-sm font-bold text-gold mt-1">$59 (Save $11!)</p>
          </div>

          {/* Confirm / Continue */}
          {showConfirm && (
            <button
              onClick={onNext}
              className="bg-sky-accent hover:bg-blue-600 text-white font-bold text-sm py-3 px-4 rounded"
            >
              Confirm Seat {selectedSeat}
            </button>
          )}
        </div>
      </div>

      {/* Bottom text link — very easy to miss */}
      <div className="shrink-0 py-2 text-center border-t border-slate-700">
        <button onClick={onNext} className="text-[10px] text-slate-600 underline hover:text-slate-400">
          Continue with assigned seat (24B)
        </button>
      </div>
    </div>
  )
}
