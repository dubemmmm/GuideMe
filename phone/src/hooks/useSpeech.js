import { useState, useCallback, useRef, useEffect } from 'react'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text, voiceLang = 'en-US') => {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = voiceLang
    utterance.rate = 0.85
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const toggle = useCallback((text, voiceLang) => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text, voiceLang)
    }
  }, [isSpeaking, speak, stop])

  return { isSpeaking, speak, stop, toggle }
}
