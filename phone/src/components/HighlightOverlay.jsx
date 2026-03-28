export default function HighlightOverlay({ highlight }) {
  if (!highlight) return null

  // Use larger, more forgiving zones to handle camera distance/angle variation
  const { x, y, w, h } = highlight

  // Expand the highlight zone by a generous margin so it's forgiving of camera misalignment
  const pad = 4
  const fx = Math.max(0, x - pad)
  const fy = Math.max(0, y - pad)
  const fw = Math.min(100 - fx, w + pad * 2)
  const fh = Math.min(100 - fy, h + pad * 2)

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="highlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={`${fx}%`}
              y={`${fy}%`}
              width={`${fw}%`}
              height={`${fh}%`}
              rx="12"
              ry="12"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.45)"
          mask="url(#highlight-mask)"
        />
      </svg>

      {/* Pulsing border around the highlight zone */}
      <div
        className="absolute rounded-xl border-[2.5px] border-teal animate-pulse"
        style={{
          left: `${fx}%`,
          top: `${fy}%`,
          width: `${fw}%`,
          height: `${fh}%`,
          boxShadow: '0 0 18px 4px rgba(13,148,136,0.35)',
        }}
      />

      {/* "Look here" floating label */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: `${fx + fw / 2}%`,
          top: `${Math.max(0, fy - 9)}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <span
          className="bg-teal text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap"
          style={{ letterSpacing: '0.04em' }}
        >
          LOOK HERE
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" className="text-teal -mt-[1px]">
          <polygon points="0,0 10,0 5,6" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
