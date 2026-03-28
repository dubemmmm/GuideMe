import { useState } from 'react'
import KioskFrame from './components/KioskFrame'
import WelcomeScreen from './screens/WelcomeScreen'
import BookingLookup from './screens/BookingLookup'
import FlightSelection from './screens/FlightSelection'
import SeatSelection from './screens/SeatSelection'
import BaggageScreen from './screens/BaggageScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [bagCount, setBagCount] = useState(0)
  const [dangerousGoodsChecked, setDangerousGoodsChecked] = useState(false)
  const [boardingPassMethod, setBoardingPassMethod] = useState(null)

  const goTo = (screen) => setCurrentScreen(screen)

  const restart = () => {
    setCurrentScreen(1)
    setSelectedSeat(null)
    setBagCount(0)
    setDangerousGoodsChecked(false)
    setBoardingPassMethod(null)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <WelcomeScreen onNext={() => goTo(2)} />
      case 2:
        return <BookingLookup onNext={() => goTo(3)} />
      case 3:
        return <FlightSelection onNext={() => goTo(4)} />
      case 4:
        return (
          <SeatSelection
            selectedSeat={selectedSeat}
            onSelectSeat={setSelectedSeat}
            onNext={() => goTo(5)}
          />
        )
      case 5:
        return (
          <BaggageScreen
            bagCount={bagCount}
            onBagCount={setBagCount}
            dangerousGoodsChecked={dangerousGoodsChecked}
            onDangerousGoods={setDangerousGoodsChecked}
            onNext={(method) => {
              setBoardingPassMethod(method)
              goTo(6)
            }}
          />
        )
      case 6:
        return (
          <ConfirmationScreen
            selectedSeat={selectedSeat}
            onRestart={restart}
          />
        )
      default:
        return <WelcomeScreen onNext={() => goTo(2)} />
    }
  }

  return <KioskFrame>{renderScreen()}</KioskFrame>
}
