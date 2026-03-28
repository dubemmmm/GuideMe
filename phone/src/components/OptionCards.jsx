export default function OptionCards({ screenDescription, options, onSelect }) {
  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto">
      {screenDescription && (
        <div className="flex items-start gap-2.5 mb-4 animate-fade-in">
          <div className="w-6 h-6 bg-teal/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <p className="text-bark-muted text-[13px] leading-relaxed">{screenDescription}</p>
        </div>
      )}

      <p className="text-bark font-bold text-lg mb-3.5" style={{ fontFamily: 'var(--font-family-display)' }}>
        What would you like to do?
      </p>

      <div className="flex flex-col gap-2.5">
        {options.map((option, i) => {
          const isLast = i === options.length - 1
          return (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className={`animate-slide-up w-full text-left px-4 py-3.5 rounded-2xl transition-all active:scale-[0.97] ${
                isLast
                  ? 'border-2 border-dashed border-bark-muted/25 text-bark-muted bg-transparent hover:bg-sand/20'
                  : 'bg-white text-bark border border-sand/70 shadow-sm shadow-bark/4 hover:shadow-md hover:border-teal/30 hover:-translate-y-px'
              }`}
              style={{
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
              }}
            >
              {!isLast && (
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-teal/12 to-teal/20 text-teal rounded-xl flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-semibold leading-snug">{option}</span>
                </span>
              )}
              {isLast && (
                <span className="flex items-center gap-3 pl-0.5">
                  <span className="text-lg">🤷</span>
                  <span className="text-[15px] font-medium">{option}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
