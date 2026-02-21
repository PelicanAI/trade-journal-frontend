/**
 * Shim for LanguageSelector - static EN button for Remotion
 */
import React from "react";

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  return (
    <div
      className={className}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        background: "#1e1e2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 500,
        color: "#64748b",
        border: "1px solid rgba(168, 85, 247, 0.15)",
        cursor: "pointer",
      }}
    >
      EN
    </div>
  );
}

export default LanguageSelector;
