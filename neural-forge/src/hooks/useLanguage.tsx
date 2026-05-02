import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'zh' | 'en'

interface LangContextType {
  lang: Lang
  toggleLang: () => void
  t: (zh: string, en: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'zh',
  toggleLang: () => {},
  t: (zh: string) => zh,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const toggleLang = () => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en)
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LangContext)
}
