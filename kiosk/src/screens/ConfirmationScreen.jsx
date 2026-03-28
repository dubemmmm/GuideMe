export default function ConfirmationScreen({ selectedSeat, onRestart }) {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="h-full flex flex-col bg-navy items-center justify-center">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">✓</div>
        <h1 className="text-3xl font-bold text-green-400 mb-1">Check-In Complete!</h1>
        <p className="text-sm text-slate-400">Your boarding pass has been printed. Please collect it below.</p>
      </div>

      {/* Boarding pass card */}
      <div className="bg-white text-navy rounded-lg shadow-2xl w-[500px] overflow-hidden">
        {/* Header */}
        <div className="bg-sky-accent px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <path d="M4 18 L16 8 L18 12 L8 18 L18 24 L16 28 Z" fill="white" />
              <path d="M14 18 L26 8 L28 12 L18 18 L28 24 L26 28 Z" fill="white" opacity="0.7" />
            </svg>
            <span className="text-white font-bold text-lg">SkyWay Airlines</span>
          </div>
          <span className="text-white/80 text-sm font-bold">BOARDING PASS</span>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {/* Passenger */}
          <div className="mb-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Passenger Name</p>
            <p className="text-xl font-bold">DOE / JOHN</p>
          </div>

          {/* Route */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-dashed border-slate-300">
            <div>
              <p className="text-3xl font-bold">ATL</p>
              <p className="text-[10px] text-slate-500">Atlanta</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-px flex-1 bg-slate-300"></div>
              <span className="px-2 text-slate-400">✈</span>
              <div className="h-px flex-1 bg-slate-300"></div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">DFW</p>
              <p className="text-[10px] text-slate-500">Dallas, Texas</p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Flight</p>
              <p className="text-lg font-bold">SW-1247</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Date</p>
              <p className="text-sm font-bold">{today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Gate</p>
              <p className="text-lg font-bold">B27</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Seat</p>
              <p className="text-lg font-bold">{selectedSeat || '24B'}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-dashed border-slate-300">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Boarding Time</p>
              <p className="text-sm font-bold">2:05 PM</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Departure</p>
              <p className="text-sm font-bold">2:45 PM</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Class</p>
              <p className="text-sm font-bold">Economy (Y)</p>
            </div>
          </div>

          {/* Barcode */}
          <div className="flex flex-col items-center">
            <div className="flex gap-[1px] h-12 mb-1">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-navy"
                  style={{
                    width: [1, 2, 3][Math.floor(Math.random() * 3)] + 'px',
                    marginRight: Math.random() > 0.5 ? '1px' : '0px',
                  }}
                ></div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-mono">SKY-7492X-SW1247-ATL-LOS-24B</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-400 mt-6">Thank you for flying SkyWay Airlines</p>
      <p className="text-xs text-slate-500 mt-1">{dateStr}</p>

      <button
        onClick={onRestart}
        className="mt-6 bg-navy-mid hover:bg-navy-light border border-slate-600 text-slate-300 text-sm py-3 px-8 rounded"
      >
        Start New Check-In
      </button>
    </div>
  )
}
