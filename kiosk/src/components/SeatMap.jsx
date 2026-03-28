const COLS = ['A', 'B', 'C', '', 'D', 'E', 'F']

const takenSeats = new Set([
  '1A','1B','1C','1D','1E','1F','2A','2C','2D','2F','3B','3E',
  '4A','4D','4F','5B','5C','5E',
  '6A','6C','7B','7D','7E','8A','8F','9C','9D',
  '10A','10B','10E','10F','11C','11D','12A','12F',
  '13B','13E','14A','14D','14F','15C','15E',
  '16A','16B','16F','17D','17E','18A','18C',
  '19B','19F','20D','20E','21A','21C','21F',
  '22B','22D','23E','23F','24A','24C','24D',
  '25B','25F','26A','26D','26E','27C','27F',
  '28A','28B','28E','29D','29F','30B','30C','30E'
])

const exitRows = new Set([14, 15])
const extraLegroom = new Set([6, 7])
const preferred = new Set([8, 9, 10, 11])

function getSeatType(row, col) {
  const id = `${row}${col}`
  if (takenSeats.has(id)) return 'taken'
  if (row <= 5) return 'business'
  if (exitRows.has(row)) return 'exit'
  if (extraLegroom.has(row)) return 'legroom'
  if (preferred.has(row)) return 'preferred'
  return 'free'
}

const seatColors = {
  taken: 'bg-slate-600 cursor-not-allowed',
  business: 'bg-slate-700 cursor-not-allowed',
  exit: 'bg-red-700 hover:bg-red-600 cursor-pointer',
  legroom: 'bg-blue-600 hover:bg-blue-500 cursor-pointer',
  preferred: 'bg-yellow-600 hover:bg-yellow-500 cursor-pointer',
  free: 'bg-green-600 hover:bg-green-500 cursor-pointer',
  selected: 'bg-white ring-2 ring-white',
}

export default function SeatMap({ selectedSeat, onSelectSeat }) {
  const rows = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="flex flex-col items-center">
      {/* Column headers */}
      <div className="flex gap-[2px] mb-1">
        <div className="w-7 text-center text-[10px] text-slate-500"></div>
        {COLS.map((c, i) =>
          c ? (
            <div key={i} className="w-5 text-center text-[10px] text-slate-400 font-bold">{c}</div>
          ) : (
            <div key={i} className="w-3"></div>
          )
        )}
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-[2px] max-h-[340px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {rows.map((row) => (
          <div key={row} className="flex gap-[2px] items-center">
            <div className="w-7 text-right text-[10px] text-slate-500 pr-1">{row}</div>
            {COLS.map((col, ci) => {
              if (!col) return <div key={ci} className="w-3" />
              const type = getSeatType(row, col)
              const id = `${row}${col}`
              const isSelected = selectedSeat === id
              const canSelect = type !== 'taken' && type !== 'business'

              return (
                <div
                  key={ci}
                  className={`w-5 h-4 rounded-sm text-[7px] flex items-center justify-center font-bold ${
                    isSelected ? seatColors.selected + ' text-navy' : seatColors[type] + ' text-white/70'
                  }`}
                  onClick={() => canSelect && onSelectSeat(id)}
                >
                  {isSelected ? '✓' : ''}
                </div>
              )
            })}
            {row <= 5 && (
              <span className="text-[8px] text-gold ml-1">BIZ</span>
            )}
            {exitRows.has(row) && (
              <span className="text-[8px] text-red-400 ml-1">EXIT</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
