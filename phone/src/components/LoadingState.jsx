export default function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 gap-2 animate-fade-in">
      {/* Scanning icon with ring animation */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-teal/8 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        {/* Spinning ring */}
        <div
          className="absolute inset-[-6px] border-[2.5px] border-transparent border-t-teal rounded-full"
          style={{ animation: 'spin 1.2s linear infinite' }}
        />
      </div>

      <p className="text-bark font-bold text-lg" style={{ fontFamily: 'var(--font-family-display)' }}>
        Analyzing screen...
      </p>
      <p className="text-bark-muted text-sm">Hold your phone steady</p>

      {/* Shimmer bar */}
      <div className="w-48 h-1.5 bg-sand/50 rounded-full overflow-hidden mt-3">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-teal/50 to-transparent rounded-full"
          style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
        />
      </div>
    </div>
  )
}
