import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LOCALE } from "utils/constants";
import en from "locales/en.json";
import zhCN from "locales/zh-CN.json";

export type Locale = "en" | "zh-CN";

const LOCALE_STORAGE_KEY = "language";

const DICTIONARIES: Record<Locale, Record<string, string>> = {
  en,
  "zh-CN": zhCN,
};

// Module-level locale variable — allows non-React utility functions
// (Intl.DateTimeFormat formatters, etc.) to access the current locale
// without threading it through every function call signature.
const getStoredLocale = (): Locale => {
  try {
    const stored = globalThis.localStorage?.getItem(LOCALE_STORAGE_KEY);

    return stored === "en" || stored === "zh-CN" ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
};

let currentLocale: Locale = getStoredLocale();

export const getLocale = (): Locale => currentLocale;

const setLocaleGlobal = (locale: Locale): void => {
  currentLocale = locale;
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
};

// Initialize html lang on load
if (typeof document !== "undefined") {
  document.documentElement.lang = currentLocale;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue>(
  Object.create(null) as LanguageContextValue
);

const interpolate = (
  template: string,
  params?: Record<string, string | number>
): string => {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{{${key}}}`
  );
};

const useLanguageState = (): LanguageContextValue => {
  const [locale, setLocale] = useState<Locale>(currentLocale);

  const changeLocale = useCallback((nextLocale: Locale): void => {
    setLocale(nextLocale);
    setLocaleGlobal(nextLocale);
    globalThis.localStorage?.setItem(LOCALE_STORAGE_KEY, nextLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const dict = DICTIONARIES[locale];
      const fallbackDict = DICTIONARIES[DEFAULT_LOCALE];
      const template = dict[key] ?? fallbackDict[key] ?? key;
      return interpolate(template, params);
    },
    [locale]
  );

  useEffect(() => {
    setLocaleGlobal(locale);
  }, [locale]);

  return useMemo(
    () => ({ locale, setLocale: changeLocale, t }),
    [locale, changeLocale, t]
  );
};

export const useLanguage = (): LanguageContextValue =>
  useContext(LanguageContext);

type LanguageProviderProps = {
  children?: React.ReactNode;
};

const LanguageProviderInner = ({
  children,
}: LanguageProviderProps): React.JSX.Element => (
  <LanguageContext value={useLanguageState()}>{children}</LanguageContext>
);

export const LanguageProvider = memo(LanguageProviderInner);
