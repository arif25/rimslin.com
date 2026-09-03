"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  Language,
  translations,
  TranslationSchema,
} from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  availableLanguages: { code: Language; name: string; nativeName: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "rimslin_preferred_lang";

const AVAILABLE_LANGUAGES: {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}[] = [
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🌐" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default language is strictly 'bn' (Bengali)
  const [language, setLanguageState] = useState<Language>("bn");

  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";
  const isRTL = language === "ar";

  // Sync with localStorage on client mount & handle root direction
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (
        savedLang &&
        (savedLang === "bn" || savedLang === "hi" || savedLang === "en" || savedLang === "ar")
      ) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      } else {
        setLanguageState("bn");
        localStorage.setItem(STORAGE_KEY, "bn");
        document.documentElement.lang = "bn";
        document.documentElement.dir = "ltr";
      }
    } catch {
      // LocalStorage fallback in case of restricted environments
    }
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState((prevLang) => {
      if (newLang === prevLang) return prevLang;
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        if (typeof document !== "undefined") {
          document.documentElement.lang = newLang;
          document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        }
      } catch {
        // Ignore localStorage errors
      }
      return newLang;
    });
  }, []);

  const currentTranslation = useMemo(() => {
    return translations[language] || translations.bn;
  }, [language]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t: currentTranslation,
      dir,
      isRTL,
      availableLanguages: AVAILABLE_LANGUAGES,
    }),
    [language, setLanguage, currentTranslation, dir, isRTL]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <div dir={dir} className={`w-full max-w-full overflow-x-hidden relative ${isRTL ? "font-arabic" : ""}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
