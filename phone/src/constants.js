export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const LANGUAGES = [
  { id: 'english', label: 'English', native: 'English', code: 'EN', voice: 'en-US' },
  { id: 'spanish', label: 'Spanish', native: 'Español', code: 'ES', voice: 'es-ES' },
  { id: 'french', label: 'French', native: 'Français', code: 'FR', voice: 'fr-FR' },
  { id: 'yoruba', label: 'Yoruba', native: 'Yorùbá', code: 'YO', voice: 'en-US' },
  { id: 'mandarin', label: 'Mandarin', native: '中文', code: 'ZH', voice: 'zh-CN' },
]
