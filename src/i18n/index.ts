import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  pt: {
    translation: pt
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Default UI language is Brazilian Portuguese. Only a language the user
    // explicitly chose (persisted in localStorage) overrides it; browser
    // language is not consulted so the app is pt-BR out of the box.
    fallbackLng: 'pt',
    supportedLngs: ['en', 'es', 'pt'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    debug: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

// Keep <html lang> in sync with the active language for SEO and a11y.
if (typeof document !== 'undefined') {
  const sync = (lng: string) => {
    document.documentElement.setAttribute('lang', (lng || 'pt').split('-')[0]);
  };
  sync(i18n.language);
  i18n.on('languageChanged', sync);
}

export default i18n;