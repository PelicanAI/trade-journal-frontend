/**
 * Shim for auth provider - returns mock auth state for Remotion
 */
import React, { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: { id: "demo-user", email: "demo@pelican.ai" },
  loading: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: { id: "demo-user", email: "demo@pelican.ai" },
        loading: false,
        signOut: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
