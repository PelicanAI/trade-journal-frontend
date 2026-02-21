/**
 * Shim for translation provider - returns static English translations
 */
import React, { createContext, useContext, ReactNode } from "react";

// Static English translations (subset of what's needed)
const translations = {
  common: {
    appName: "PelicanAI",
    newChat: "New chat",
    search: "Search conversations...",
    account: "Account",
    viewProfile: "View profile",
    settings: "Settings",
    signOut: "Sign out",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    retry: "Retry",
  },
  chat: {
    messagePlaceholder: "Message Pelican...",
    sendMessage: "Send message",
    stopGeneration: "Stop generation",
    attachFile: "Attach file",
    welcomeTitle: "Welcome to PelicanAI",
    welcomeSubtitle: "How can I help you trade today?",
    emptyConversations: "No conversations yet",
    fileUploadFailed: "file(s) failed to upload. You can retry them.",
    noInternet: "No internet connection.",
    thinking: "Thinking...",
    typing: "Typing...",
  },
  market: {
    marketOverview: "Market Overview",
    marketsOpen: "Markets Open",
    marketsClosed: "Markets Closed",
    indices: "INDICES",
    volatility: "VOLATILITY",
    sectorPerformance: "SECTOR PERFORMANCE",
    watchlist: "WATCHLIST",
    technology: "Technology",
    financials: "Financials",
    healthcare: "Healthcare",
    energy: "Energy",
  },
  marketing: {
    nav: {},
    hero: {},
    stats: {},
    what: {},
    features: {},
    traders: {},
    languages: {},
    team: {},
    pricing: {},
    cta: {},
    footer: {},
    faq: {},
  },
};

type Translations = typeof translations;

interface TranslationContextType {
  t: Translations;
  locale: string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType>({
  t: translations,
  locale: "en",
  isLoading: false,
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  return (
    <TranslationContext.Provider
      value={{ t: translations, locale: "en", isLoading: false }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useT(): Translations {
  const context = useContext(TranslationContext);
  return context.t;
}

export function useLocale(): string {
  return "en";
}
