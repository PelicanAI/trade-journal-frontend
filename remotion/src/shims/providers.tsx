// Mock providers for Remotion environment
import React, { createContext, useContext } from "react";

// Mock translations (from your translation files)
const mockTranslations = {
  common: {
    newChat: "New chat",
    search: "Search...",
    account: "Account",
    viewProfile: "View profile",
    cancel: "Cancel",
    delete: "Delete",
  },
  chat: {
    messagePlaceholder: "Ask Pelican anything...",
    emptyConversations: "No conversations yet",
    attachFile: "Attach file",
  },
  marketing: {
    nav: {
      features: "Features",
      team: "Team",
      pricing: "Pricing",
      faq: "FAQ",
      launchApp: "Launch App",
    },
  },
};

// Translation provider mock
const TranslationContext = createContext(mockTranslations);

export const useT = () => useContext(TranslationContext);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TranslationContext.Provider value={mockTranslations}>
    {children}
  </TranslationContext.Provider>
);

// Auth provider mock
const AuthContext = createContext({
  user: { id: "demo-user", email: "demo@pelicantrading.ai" },
  loading: false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={{ user: { id: "demo-user", email: "demo@pelicantrading.ai" }, loading: false, signOut: () => {} }}>
    {children}
  </AuthContext.Provider>
);

// Theme mock
export const useTheme = () => ({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
});
