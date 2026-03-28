import { useState, useEffect } from 'react'

export default function KioskFrame({ children }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="h-screen w-screen flex flex-col bg-navy">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-2 bg-navy-mid border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M4 18 L16 8 L18 12 L8 18 L18 24 L16 28 Z" fill="#3b82f6" />
            <path d="M14 18 L26 8 L28 12 L18 18 L28 24 L26 28 Z" fill="#60a5fa" />
            <circle cx="30" cy="18" r="3" fill="#f0c030" />
          </svg>
          <div>
            <span className="text-lg font-bold tracking-wide text-white">SkyWay Airlines</span>
            <span className="text-slate-400 text-sm ml-3">— Self Service Check-In</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <span>English (US)</span>
          <span className="text-white font-mono text-base">{formatTime(time)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-1.5 bg-navy-mid border-t border-slate-700 text-xs text-slate-500 shrink-0">
        <span>Terminal B — Gates 20-35</span>
        <span>For assistance, press the help button or contact a SkyWay agent</span>
        <span>© 2026 SkyWay Airlines, Inc.</span>
      </div>
    </div>
  )
}
