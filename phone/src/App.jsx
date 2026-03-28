import { useState, useCallback, useEffect, useRef } from 'react'
import HomeScreen from './components/HomeScreen'
import Header from './components/Header'
import CameraView from './components/CameraView'
import InteractionPanel from './components/InteractionPanel'
import { useCamera } from './hooks/useCamera'
import { useSpeech } from './hooks/useSpeech'
import { analyzeFrame, resetFlow } from './api/analyze'
import { LANGUAGES } from './constants'

export default function App() {
  const { videoRef, canvasRef, cameraReady, cameraError, startCamera, stopCamera, captureFrame } = useCamera()
  const { isSpeaking, toggle: toggleSpeech, stop: stopSpeech } = useSpeech()

  const [screen, setScreen] = useState('home')
  const [panelState, setPanelState] = useState('initial')
  const [language, setLanguage] = useState('english')
  const [currentOptions, setCurrentOptions] = useState([])
  const [currentInstruction, setCurrentInstruction] = useState('')
  const [currentVisualHint, setCurrentVisualHint] = useState('')
  const [currentScreenDescription, setCurrentScreenDescription] = useState('')
  const [completedContext, setCompletedContext] = useState(null)
  const [currentIntent, setCurrentIntent] = useState(null)
  const [currentFrame, setCurrentFrame] = useState(null)
  const [currentHighlight, setCurrentHighlight] = useState(null)
  const [debugError, setDebugError] = useState(null)

  const autoCapturedRef = useRef(false)
  const languageRef = useRef(language)
  languageRef.current = language

  // Auto-capture 2 seconds after camera becomes ready
  useEffect(() => {
    if (cameraReady && !autoCapturedRef.current) {
      autoCapturedRef.current = true
      const timer = setTimeout(() => {
        handleScan()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [cameraReady])

  async function handleScan(intent = null, context = null, existingFrame = null) {
    stopSpeech()

    const frame = existingFrame || captureFrame()
    if (!frame) {
      console.error('[GuideMe] No frame captured')
      return
    }

    setCurrentFrame(frame)
    setPanelState('analyzing')

    try {
      const data = await analyzeFrame({
        image: frame,
        language: languageRef.current,
        intent,
        context,
      })

      if (navigator.vibrate) navigator.vibrate(50)

      if (data.mode === 'options') {
        setCurrentScreenDescription(data.screen_description || '')
        setCurrentOptions(data.options || [])
        setCurrentIntent(null)
        setCurrentHighlight(null)

        setPanelState('options')
      } else if (data.mode === 'instruction') {
        setCurrentScreenDescription(data.screen_description || '')
        setCurrentInstruction(data.instruction || '')
        setCurrentVisualHint(data.visual_hint || '')
        setCompletedContext(data.completed_context || null)
        setCurrentHighlight(data.highlight || null)

        setCurrentIntent(intent)
        setPanelState('instruction')
      } else {
        console.error('[GuideMe] Unknown response mode:', data)
        setPanelState('error')
      }
    } catch (err) {
      console.error('[GuideMe] API error:', err)
      setDebugError(String(err))
      setPanelState('error')
    }
  }

  const handleNeedHelp = useCallback(() => {
    setScreen('camera')
    setPanelState('initial')
    autoCapturedRef.current = false
    startCamera()
  }, [startCamera])

  const handleGoHome = useCallback(() => {
    stopSpeech()
    stopCamera()
    resetFlow()
    setScreen('home')
    setPanelState('initial')
    setCurrentOptions([])
    setCurrentInstruction('')
    setCurrentVisualHint('')
    setCurrentScreenDescription('')
    setCompletedContext(null)
    setCurrentIntent(null)
    setCurrentFrame(null)
    setCurrentHighlight(null)
    autoCapturedRef.current = false
  }, [stopCamera, stopSpeech])

  function handleSelectOption(option) {
    handleScan(option, completedContext, currentFrame)
  }

  function handleDone() {
    // Pass a dummy intent so analyzeFrame knows to advance (not reset to options)
    handleScan('__advance__', completedContext)
  }

  function handleScanAgain() {
    handleScan('__advance__', completedContext)
  }

  function handleRetry() {
    handleScan()
  }

  function handleManualScan() {
    handleScan()
  }

  const handleLanguageChange = useCallback((newLang) => {
    setLanguage(newLang)
    languageRef.current = newLang

    if (panelState === 'instruction' && currentFrame && currentIntent) {
      setPanelState('analyzing')
      stopSpeech()

      analyzeFrame({
        image: currentFrame,
        language: newLang,
        intent: currentIntent,
        context: completedContext,
      }).then((data) => {
        if (navigator.vibrate) navigator.vibrate(50)
        if (data.mode === 'instruction') {
          setCurrentScreenDescription(data.screen_description || '')
          setCurrentInstruction(data.instruction || '')
          setCurrentVisualHint(data.visual_hint || '')
          setCompletedContext(data.completed_context || null)
          setCurrentHighlight(data.highlight || null)

          setPanelState('instruction')
        }
      }).catch(() => {
        setPanelState('error')
      })
    }
  }, [panelState, currentFrame, currentIntent, completedContext, stopSpeech])

  const handleToggleSpeech = useCallback(() => {
    const lang = LANGUAGES.find((l) => l.id === language)
    toggleSpeech(currentInstruction, lang?.voice || 'en-US')
  }, [toggleSpeech, currentInstruction, language])

  if (screen === 'home') {
    return (
      <HomeScreen
        language={language}
        onLanguageChange={handleLanguageChange}
        onNeedHelp={handleNeedHelp}
      />
    )
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-bark" style={{ height: '100dvh' }}>
      <Header language={language} onLanguageChange={handleLanguageChange} onBack={handleGoHome} />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Camera — 40% so the panel always has room */}
        <div className="relative shrink-0" style={{ height: '40%' }}>
          <CameraView
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraReady={cameraReady}
            cameraError={cameraError}
            highlight={panelState === 'instruction' ? currentHighlight : null}
          />
        </div>

        {/* Panel — remaining 60% */}
        <InteractionPanel
          panelState={panelState}
          screenDescription={currentScreenDescription}
          options={currentOptions}
          instruction={currentInstruction}
          visualHint={currentVisualHint}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
          onSelectOption={handleSelectOption}
          onDone={handleDone}
          onScanAgain={handleScanAgain}
          onRetry={handleRetry}
          onManualScan={handleManualScan}
          cameraReady={cameraReady}
          debugError={debugError}
        />
      </div>
    </div>
  )
}
