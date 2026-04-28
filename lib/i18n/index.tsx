'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { translations as en } from './en';

export type Language = 'en' | 'fr' | 'rw';

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  isMounted: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'simba-language';

const dictionaries: Record<Language, typeof en> = {
  en: require('./en').translations,
  fr: require('./fr').translations,
  rw: require('./rw').translations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr' || stored === 'rw') {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: dictionaries[language], isMounted: mounted }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    return { language: 'en' as Language, setLanguage: () => {}, t: dictionaries.en, isMounted: false };
  }
  return context;
}