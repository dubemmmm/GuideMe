import { LANGUAGES } from '../constants'

export default function HomeScreen({ language, onLanguageChange, onNeedHelp }) {
  return (
    <div className="fixed inset-0 bg-cream noise-bg flex flex-col overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal/6 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute top-1/3 -left-20 w-56 h-56 bg-coral/5 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
      <div className="absolute -bottom-16 right-8 w-48 h-48 bg-sage/12 rounded-full blur-3xl" style={{ animation: 'float 7s ease-in-out infinite 1s' }} />
      <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-teal/4 rounded-full blur-2xl" style={{ animation: 'float 9s ease-in-out infinite 3s' }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-deep rounded-xl flex items-center justify-center shadow-md shadow-teal/25">
            <span className="text-white font-extrabold text-lg" style={{ fontFamily: 'var(--font-family-display)' }}>G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-bark font-bold text-lg tracking-tight leading-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
              GuideMe
            </span>
            <span className="text-bark-muted text-[10px] font-medium tracking-wider uppercase">Your kiosk assistant</span>
          </div>
        </div>

        {/* Language pill */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none bg-white/80 backdrop-blur-sm border border-sand/50 rounded-full pl-8 pr-4 py-2 text-sm font-semibold text-bark-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal/30 shadow-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.native}
              </option>
            ))}
          </select>
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-bark-muted pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-4">
        {/* Illustration */}
        <div className="mb-9 animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="relative w-36 h-36">
            {/* Soft glow */}
            <div className="absolute inset-0 bg-teal/8 rounded-3xl blur-2xl scale-125" />
            {/* Phone shape */}
            <div className="absolute inset-2 bg-white rounded-[20px] shadow-xl shadow-bark/8 border border-sand/30 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-teal-soft/30 via-white to-sage-light/20 flex flex-col items-center justify-center gap-2 p-4">
                <div className="w-14 h-9 bg-gradient-to-r from-teal/12 to-teal/22 rounded-lg" />
                <div className="w-10 h-1.5 bg-teal/18 rounded-full" />
                <div className="w-7 h-1.5 bg-bark-muted/10 rounded-full" />
                <div className="flex gap-1.5 mt-0.5">
                  <div className="w-7 h-5 bg-coral/10 rounded-md" />
                  <div className="w-7 h-5 bg-teal/10 rounded-md" />
                  <div className="w-7 h-5 bg-sage/15 rounded-md" />
                </div>
              </div>
            </div>
            {/* Floating magnifier */}
            <div className="absolute -right-4 top-3 w-12 h-12 bg-gradient-to-br from-coral to-coral-deep rounded-2xl shadow-lg shadow-coral/30 flex items-center justify-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            {/* Checkmark badge */}
            <div className="absolute -left-3 bottom-2 w-10 h-10 bg-gradient-to-br from-green-go to-green-go-deep rounded-2xl shadow-lg shadow-green-go/25 flex items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <h1 className="text-[34px] font-extrabold text-bark leading-[1.1] tracking-tight mb-3" style={{ fontFamily: 'var(--font-family-display)' }}>
            Stuck at a kiosk?
          </h1>
          <p className="text-bark-muted text-[15px] leading-relaxed max-w-[280px] mx-auto">
            Point your camera at any confusing screen and we'll guide you through it step by step.
          </p>
        </div>

        {/* Need Help button */}
        <div className="relative animate-slide-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-2xl bg-coral/25" style={{ animation: 'pulse-ring 2.5s ease-out infinite' }} />
          <div className="absolute inset-0 rounded-2xl bg-coral/15" style={{ animation: 'pulse-ring 2.5s ease-out infinite 0.8s' }} />

          <button
            onClick={onNeedHelp}
            className="relative bg-gradient-to-r from-coral to-coral-deep hover:brightness-110 active:scale-[0.96] text-white font-bold text-xl px-14 py-5 rounded-2xl shadow-xl shadow-coral/30 transition-all"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            I Need Help
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="relative z-10 px-5 pb-8 animate-slide-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-sand/40 shadow-sm px-4 py-5">
          <p className="text-[10px] font-bold text-bark-muted/60 uppercase tracking-[0.2em] mb-4 text-center" style={{ fontFamily: 'var(--font-family-display)' }}>
            How it works
          </p>
          <div className="flex gap-3">
            {[
              { color: 'teal', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              ), label: 'Point at screen' },
              { color: 'coral', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              ), label: 'Pick your goal' },
              { color: 'green-go', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ), label: 'Follow steps' },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center gap-2.5">
                <div className="w-12 h-12 bg-cream-dark/70 rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-[11px] font-bold text-bark-light leading-tight">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom safe area spacer */}
      <div className="h-4 shrink-0" />
    </div>
  )
}
