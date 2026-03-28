import { useState } from 'react'

export default function BaggageScreen({ bagCount, onBagCount, dangerousGoodsChecked, onDangerousGoods, onNext }) {
  const [carryOnOpen, setCarryOnOpen] = useState(false)
  const [assistOpen, setAssistOpen] = useState(false)
  const [wheelchair, setWheelchair] = useState(false)

  const canProceed = dangerousGoodsChecked

  const handleBoardingPass = (method) => {
    if (!canProceed) return
    onNext(method)
  }

  return (
    <div className="h-full flex flex-col bg-navy">
      {/* Progress */}
      <div className="shrink-0 px-6 py-2 bg-navy-mid border-b border-slate-700">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {['Identification', 'Flight Selection', 'Seat Selection', 'Baggage', 'Confirmation'].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                i <= 3 ? 'bg-sky-accent text-white' : 'bg-slate-700 text-slate-500'
              }`}>
                {i < 3 ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] ${i <= 3 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
              {i < 4 && <span className="text-slate-600 mx-0.5 text-[9px]">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-4 px-6 py-3 min-h-0 overflow-hidden">
        {/* Left: Bag count + pricing */}
        <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
          <h2 className="text-lg font-bold text-white shrink-0">Baggage Declaration</h2>

          {/* Bag counter */}
          <div className="bg-navy-light border border-slate-600 rounded-lg p-4 shrink-0">
            <p className="text-sm text-slate-300 mb-3">How many checked bags are you bringing?</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onBagCount(Math.max(0, bagCount - 1))}
                className="w-10 h-10 bg-navy border border-slate-500 rounded text-xl text-white hover:bg-navy-mid"
              >−</button>
              <span className="text-3xl font-bold text-white w-10 text-center">{bagCount}</span>
              <button
                onClick={() => onBagCount(Math.min(5, bagCount + 1))}
                className="w-10 h-10 bg-navy border border-slate-500 rounded text-xl text-white hover:bg-navy-mid"
              >+</button>
              <span className="text-sm text-slate-400 ml-2">
                {bagCount === 0 ? 'No checked bags' : bagCount === 1 ? '1 checked bag — $35.00' : `${bagCount} checked bags — $${bagCount === 2 ? '80' : 35 + 45 + (bagCount - 2) * 150}.00`}
              </span>
            </div>
          </div>

          {/* Pricing table */}
          <div className="bg-navy-light border border-slate-600 rounded-lg p-3 text-xs shrink-0">
            <p className="text-sm font-bold text-slate-300 mb-2">Checked Baggage Fees*</p>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700">
                  <th className="pb-1 font-normal">Bag</th>
                  <th className="pb-1 font-normal">Fee</th>
                  <th className="pb-1 font-normal">Weight Limit</th>
                  <th className="pb-1 font-normal">Size Limit</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700/50">
                  <td className="py-1">1st bag</td>
                  <td>$35.00**</td>
                  <td>50 lbs (23 kg)</td>
                  <td>62 linear in.</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-1">2nd bag</td>
                  <td>$45.00</td>
                  <td>50 lbs (23 kg)</td>
                  <td>62 linear in.</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-1">3rd+ bag</td>
                  <td>$150.00 each</td>
                  <td>50 lbs (23 kg)</td>
                  <td>62 linear in.</td>
                </tr>
                <tr>
                  <td className="py-1 text-red-400" colSpan="4">Overweight (51-70 lbs / 24-32 kg): +$100.00 per bag</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-[10px] text-slate-600 leading-tight">
              <p>* Fees are per person, per direction. Prices in USD. Fees subject to change.</p>
              <p>** First bag free for SkyWay Rewards Gold, Platinum, and Diamond members. See skyway.com/rewards for details.</p>
              <p>*** Size limit: 62 linear inches = length + width + height (157 cm total). Oversized bags subject to additional $200 fee.</p>
            </div>
          </div>

          {/* Carry-on expandable */}
          <button
            onClick={() => setCarryOnOpen(!carryOnOpen)}
            className="bg-navy-light border border-slate-600 rounded-lg p-3 text-left shrink-0"
          >
            <span className="text-xs text-slate-400">{carryOnOpen ? '▼' : '▶'} Carry-on baggage info (tap to {carryOnOpen ? 'hide' : 'expand'})</span>
          </button>
          {carryOnOpen && (
            <div className="bg-navy-light border border-slate-600 rounded-lg p-3 text-xs text-slate-400 shrink-0">
              <p className="font-bold text-slate-300 mb-1">Carry-On Allowance</p>
              <p>1 carry-on bag: max 22 x 14 x 9 in. (56 x 36 x 23 cm), max 15 lbs (7 kg)</p>
              <p>1 personal item: max 17 x 13 x 8 in. (43 x 33 x 20 cm)</p>
              <p className="mt-1 text-[10px] text-slate-600">Note: Basic Economy fare does not include overhead bin access on domestic segments. International segments allow 1 carry-on. SkyWay Rewards members exempted.</p>
            </div>
          )}

          {/* Special assistance — buried collapsible, wheelchair is in here */}
          <button
            onClick={() => setAssistOpen(!assistOpen)}
            className="bg-navy-light border border-slate-600 rounded-lg p-3 text-left shrink-0"
          >
            <span className="text-xs text-slate-500">{assistOpen ? '▼' : '▶'} Special assistance &amp; accessibility (tap to {assistOpen ? 'hide' : 'expand'})</span>
          </button>
          {assistOpen && (
            <div className="bg-navy-light border border-slate-600 rounded-lg p-3 text-xs text-slate-400 shrink-0 space-y-2">
              <p className="font-bold text-slate-300 mb-1">Special Assistance Options</p>
              <p className="text-[10px] text-slate-500 mb-2">Select any assistance you need. A SkyWay agent will be notified.</p>

              <label className="flex items-center gap-2 p-2 rounded bg-navy border border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wheelchair}
                  onChange={(e) => setWheelchair(e.target.checked)}
                  className="w-4 h-4 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-slate-300">Wheelchair assistance at the gate</p>
                  <p className="text-[9px] text-slate-500">An agent will meet you at the gate with a wheelchair</p>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-navy border border-slate-700 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-300">Visual or hearing impaired assistance</p>
                  <p className="text-[9px] text-slate-500">Priority boarding and in-flight assistance</p>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-navy border border-slate-700 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-300">Traveling with medical equipment</p>
                  <p className="text-[9px] text-slate-500">CPAP, portable oxygen concentrator, etc.</p>
                </div>
              </label>

              <p className="text-[9px] text-slate-600 mt-1">For other requests, call Special Assistance at 1-800-SKYWAY ext. 4</p>
            </div>
          )}
        </div>

        {/* Right: Dangerous goods + boarding pass */}
        <div className="w-72 flex flex-col gap-3 shrink-0 min-h-0">
          {/* Dangerous goods */}
          <div className="bg-navy-light border border-red-900/50 rounded-lg p-3 flex-1 overflow-auto" style={{ scrollbarWidth: 'thin' }}>
            <p className="text-sm font-bold text-red-400 mb-2">⚠ Dangerous Goods Declaration</p>
            <div className="text-[10px] text-slate-400 leading-relaxed mb-3">
              <p className="mb-1">Federal law prohibits the carriage of hazardous materials aboard aircraft in your luggage or on your person. A violation can result in five years' imprisonment and penalties of $250,000 or more (49 U.S.C. 5124).</p>
              <p className="font-bold text-slate-300 mb-1">Prohibited items include but are not limited to:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Explosives, fireworks, flares</li>
                <li>Compressed gases (propane, butane, oxygen)</li>
                <li>Flammable liquids (gasoline, lighter fluid, paint)</li>
                <li>Flammable solids (matches, lighters)</li>
                <li>Oxidizers and organic peroxides</li>
                <li>Toxic substances and infectious materials</li>
                <li>Radioactive materials</li>
                <li>Corrosives (acids, batteries, mercury)</li>
                <li>Magnetic materials</li>
                <li>Self-defense sprays (mace, pepper spray)</li>
                <li>Lithium batteries exceeding 160Wh</li>
                <li>E-cigarettes in checked baggage</li>
              </ul>
              <p className="mt-2 text-[9px]">For a complete list, visit TSA.gov or contact your airline. Certain items may be carried with airline approval.</p>
            </div>

            <label className="flex items-start gap-2 cursor-pointer p-2 rounded border border-slate-600 bg-navy">
              <input
                type="checkbox"
                checked={dangerousGoodsChecked}
                onChange={(e) => onDangerousGoods(e.target.checked)}
                className="w-5 h-5 mt-0.5 shrink-0"
              />
              <span className="text-xs text-slate-300 leading-tight">
                I confirm that my luggage does not contain any prohibited items as described above and complies with all applicable regulations.
              </span>
            </label>
          </div>

          {/* Boarding pass delivery */}
          <div className="bg-navy-light border border-slate-600 rounded-lg p-3 shrink-0">
            <p className="text-sm font-bold text-white mb-2">How would you like your boarding pass?</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleBoardingPass('print')}
                className={`py-3 px-4 rounded font-bold text-sm ${canProceed ? 'bg-sky-accent hover:bg-blue-600 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
              >
                🖨 Print Boarding Pass
              </button>
              <button
                onClick={() => handleBoardingPass('mobile')}
                className={`py-3 px-4 rounded font-bold text-sm ${canProceed ? 'bg-sky-accent hover:bg-blue-600 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
              >
                📱 Send to Mobile
              </button>
              <button
                onClick={() => handleBoardingPass('email')}
                className={`py-2 px-4 rounded text-xs ${canProceed ? 'border border-slate-500 text-slate-300 hover:bg-navy-mid' : 'border border-slate-700 text-slate-600 cursor-not-allowed'}`}
              >
                ✉ Email Boarding Pass
              </button>
            </div>
            {!canProceed && (
              <p className="text-[10px] text-red-400 mt-2">* You must accept the Dangerous Goods Declaration to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
