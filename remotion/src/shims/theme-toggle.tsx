/**
 * Shim for ThemeToggle components - static dark mode icon for Remotion
 */
import React from "react";

interface ThemeToggleProps {
  className?: string;
}

// Static sun icon for dark mode display
export function ThemeToggle({ className }: ThemeToggleProps) {
  return (
    <div
      className={className}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </div>
  );
}

export default ThemeToggle;
