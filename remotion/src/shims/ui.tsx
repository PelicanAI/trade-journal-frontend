// Simplified UI components for Remotion (matching shadcn/ui styling)
import React from "react";

const COLORS = {
  background: "#0a0a0f",
  foreground: "#f1f5f9",
  card: "#18181f",
  cardForeground: "#f1f5f9",
  primary: "#a855f7",
  primaryForeground: "#fafafa",
  secondary: "#27272a",
  secondaryForeground: "#fafafa",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  border: "rgba(148, 163, 184, 0.15)",
  ring: "rgba(168, 85, 247, 0.3)",
};

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "icon";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  asChild?: boolean;
}> = ({ children, variant = "default", size = "default", className, style, onClick }) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    fontWeight: 500,
    transition: "all 0.2s",
    cursor: "pointer",
    border: "none",
    fontFamily: "'Inter', sans-serif",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: { background: COLORS.primary, color: COLORS.primaryForeground },
    ghost: { background: "transparent", color: COLORS.foreground },
    outline: { background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.foreground },
    secondary: { background: COLORS.secondary, color: COLORS.secondaryForeground },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    default: { padding: "8px 16px", fontSize: 14, height: 40 },
    sm: { padding: "4px 12px", fontSize: 13, height: 32 },
    icon: { padding: 8, width: 32, height: 32 },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant], ...sizeStyles[size], ...style }}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<{
  placeholder?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, value, className, style, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "8px 12px",
      borderRadius: 6,
      border: `1px solid ${COLORS.border}`,
      background: COLORS.muted,
      color: COLORS.foreground,
      fontSize: 14,
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      ...style,
    }}
    className={className}
  />
);

export const ScrollArea: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div style={{ overflow: "auto", flex: 1 }} className={className}>
    {children}
  </div>
);

export const Avatar: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: COLORS.primary + "20",
    }}
    className={className}
  >
    {children}
  </div>
);

export const AvatarImage: React.FC<{ src: string }> = ({ src }) => (
  <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);

export const AvatarFallback: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span style={{ fontSize: 12, color: COLORS.primary }} className={className}>
    {children}
  </span>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: string; className?: string }> = ({ children, className }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 500,
      background: COLORS.secondary,
      color: COLORS.secondaryForeground,
    }}
    className={className}
  >
    {children}
  </span>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    style={{
      background: COLORS.card,
      borderRadius: 8,
      border: `1px solid ${COLORS.border}`,
    }}
    className={className}
  >
    {children}
  </div>
);

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => <>{children}</>;
export const TooltipContent: React.FC<{ children: React.ReactNode }> = () => null;
