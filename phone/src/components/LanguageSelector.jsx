import { useState, useRef, useEffect } from 'react'
import { LANGUAGES } from '../constants'

export default function LanguageSelector({ language, onLanguageChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.id === language)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('touchstart', handleClick)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('touchstart', handleClick)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 rounded-full pl-2.5 pr-2.5 py-1.5 text-white/80 active:bg-white/20 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-xs font-bold">{current?.code}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl shadow-bark/15 border border-sand/50 overflow-hidden w-56 z-50 animate-slide-up" style={{ animationDuration: '0.2s' }}>
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.id}
              onClick={() => {
                onLanguageChange(lang.id)
                setOpen(false)
              }}
              className={`w-full text-left px-5 py-3 flex items-center justify-between text-sm transition-colors active:bg-teal/5 ${
                i > 0 ? 'border-t border-sand/30' : ''
              } ${
                lang.id === language ? 'bg-teal-soft/30 text-teal-deep font-bold' : 'text-bark hover:bg-cream/80 font-medium'
              }`}
            >
              <span>
                {lang.label}
                <span className="text-bark-muted/60 ml-1.5 text-xs">({lang.native})</span>
              </span>
              {lang.id === language && (
                <div className="w-5 h-5 bg-gradient-to-br from-teal to-teal-deep rounded-full flex items-center justify-center shadow-sm">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
