import LanguageSelector from './LanguageSelector'

export default function Header({ language, onLanguageChange, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-bark to-bark/95 shrink-0 z-20">
      <div className="flex items-center gap-2.5">
        {onBack && (
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white active:text-white active:bg-white/10 rounded-xl -ml-1 mr-0.5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        )}
        <div className="w-8 h-8 bg-gradient-to-br from-teal to-teal-deep rounded-lg flex items-center justify-center shadow-sm shadow-teal/30">
          <span className="text-white font-extrabold text-sm" style={{ fontFamily: 'var(--font-family-display)' }}>G</span>
        </div>
        <span className="text-white font-bold text-base tracking-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
          GuideMe
        </span>
      </div>
      <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
    </div>
  )
}
