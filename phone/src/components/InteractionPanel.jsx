import LoadingState from './LoadingState'
import OptionCards from './OptionCards'
import InstructionView from './InstructionView'

export default function InteractionPanel({
  panelState,
  screenDescription,
  options,
  instruction,
  visualHint,
  isSpeaking,
  onToggleSpeech,
  onSelectOption,
  onDone,
  onScanAgain,
  onRetry,
  onManualScan,
  cameraReady,
  debugError,
}) {
  return (
    <div
      className="bg-cream flex flex-col overflow-hidden rounded-t-3xl -mt-4 relative z-10 flex-1"
      style={{
        boxShadow: '0 -8px 30px rgba(45, 27, 18, 0.1)',
      }}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-10 h-1.5 bg-sand/80 rounded-full" />
      </div>

      {panelState === 'initial' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative mb-5">
            <div className="w-16 h-16 bg-teal/8 rounded-2xl flex items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <p className="text-bark font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
            Point at the screen
          </p>
          <p className="text-bark-muted text-sm mt-1 mb-6 max-w-[240px]">Hold your phone steady, then tap the button below</p>

          <button
            onClick={onManualScan}
            disabled={!cameraReady}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.96] ${
              cameraReady
                ? 'bg-gradient-to-r from-teal to-teal-deep hover:brightness-110 text-white shadow-lg shadow-teal/25'
                : 'bg-sand/70 text-bark-muted'
            }`}
            style={{ fontFamily: 'var(--font-family-display)', minHeight: '56px' }}
          >
            {cameraReady ? 'Scan Now' : 'Starting camera...'}
          </button>
        </div>
      )}

      {panelState === 'analyzing' && <LoadingState />}

      {panelState === 'options' && (
        <OptionCards
          screenDescription={screenDescription}
          options={options}
          onSelect={onSelectOption}
        />
      )}

      {panelState === 'instruction' && (
        <InstructionView
          instruction={instruction}
          visualHint={visualHint}
          isSpeaking={isSpeaking}
          onToggleSpeech={onToggleSpeech}
          onDone={onDone}
          onScanAgain={onScanAgain}
        />
      )}

      {panelState === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="w-16 h-16 bg-coral/8 rounded-2xl flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-bark font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
            Something went wrong
          </p>
          <p className="text-bark-muted text-sm mb-5">No worries — let's try again.</p>
          {debugError && (
            <p className="text-coral text-xs mb-4 bg-coral/5 border border-coral/15 rounded-xl px-3 py-2 max-w-full break-all">{debugError}</p>
          )}
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-teal to-teal-deep hover:brightness-110 active:scale-[0.96] text-white font-bold text-base py-3.5 px-10 rounded-2xl transition-all shadow-lg shadow-teal/25"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
