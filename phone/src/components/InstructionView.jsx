export default function InstructionView({
  instruction,
  visualHint,
  isSpeaking,
  onToggleSpeech,
  onDone,
  onScanAgain,
}) {
  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto">
      {/* Instruction card */}
      <div className="flex-1 animate-slide-up" style={{ opacity: 0, animationDelay: '0.05s' }}>
        <div className="bg-white rounded-2xl border border-sand/60 shadow-sm overflow-hidden mb-3">
          {/* Teal accent bar */}
          <div className="h-1 bg-gradient-to-r from-teal to-teal-deep" />

          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 bg-gradient-to-br from-teal to-teal-deep rounded-xl flex items-center justify-center mt-0.5 shadow-sm shadow-teal/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <p className="text-bark font-semibold text-[17px] leading-relaxed flex-1" style={{ fontFamily: 'var(--font-family-body)' }}>
                {instruction}
              </p>
            </div>
          </div>
        </div>

        {/* Visual hint — prominent location callout */}
        {visualHint && (
          <div className="bg-gradient-to-r from-teal/10 to-teal-soft/30 rounded-2xl border border-teal/20 px-4 py-3.5 mb-3 animate-slide-up" style={{ opacity: 0, animationDelay: '0.12s' }}>
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-10 h-10 bg-teal/15 rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-teal-deep text-[10px] font-bold uppercase tracking-wider mb-0.5">Where to look</p>
                <p className="text-bark font-bold text-[15px] leading-snug">{visualHint}</p>
              </div>
            </div>
          </div>
        )}

        {/* Listen button */}
        <button
          onClick={onToggleSpeech}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
            isSpeaking
              ? 'bg-coral/10 text-coral border border-coral/20'
              : 'bg-white/80 text-teal-deep border border-sand/50 hover:bg-teal/5 hover:border-teal/20'
          }`}
        >
          {isSpeaking ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Stop reading
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              Read aloud
            </>
          )}
        </button>
      </div>

      {/* Action buttons */}
      <div className="shrink-0 space-y-2.5 pt-3 animate-slide-up" style={{ opacity: 0, animationDelay: '0.15s' }}>
        <button
          onClick={onDone}
          className="w-full bg-gradient-to-r from-green-go to-green-go-deep hover:brightness-110 active:scale-[0.97] text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-lg shadow-green-go/25"
          style={{ fontFamily: 'var(--font-family-display)', minHeight: '60px' }}
        >
          Done, what's next? &rarr;
        </button>
        <button
          onClick={onScanAgain}
          className="w-full text-bark-muted text-sm font-semibold py-2.5 hover:text-bark active:text-bark transition-colors"
        >
          Re-scan screen
        </button>
      </div>
    </div>
  )
}
