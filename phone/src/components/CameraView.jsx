import HighlightOverlay from './HighlightOverlay'

export default function CameraView({ videoRef, canvasRef, cameraReady, cameraError, highlight }) {
  if (cameraError) {
    return (
      <div className="h-full bg-bark flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-white/8 rounded-3xl flex items-center justify-center mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F5E6D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </div>
        <p className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
          Camera access needed
        </p>
        <p className="text-sand/60 text-sm leading-relaxed max-w-xs">
          GuideMe needs your camera to see the kiosk screen and help you. Please allow camera access and refresh the page.
        </p>
      </div>
    )
  }

  return (
    <div className="h-full bg-bark relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Viewfinder overlay */}
      {cameraReady && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Vignette edges */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)' }} />

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-[2.5px] border-l-[2.5px] border-white/70 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-[2.5px] border-r-[2.5px] border-white/70 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-[2.5px] border-l-[2.5px] border-white/70 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-[2.5px] border-r-[2.5px] border-white/70 rounded-br-lg" />

          {/* Scan line */}
          <div
            className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-teal/60 to-transparent rounded-full"
            style={{ animation: 'scan-sweep 3s ease-in-out infinite' }}
          />

          {/* Status pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-go rounded-full animate-pulse" />
            <span className="text-white/90 text-[10px] font-semibold tracking-wider uppercase">Live</span>
          </div>
        </div>
      )}

      {/* AR highlight overlay */}
      {cameraReady && highlight && <HighlightOverlay highlight={highlight} />}

      {/* Loading overlay */}
      {!cameraReady && !cameraError && (
        <div className="absolute inset-0 bg-bark flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-[2.5px] border-sand/15 border-t-teal rounded-full animate-spin" />
          <p className="text-sand/50 text-sm font-medium">Opening camera...</p>
        </div>
      )}
    </div>
  )
}
