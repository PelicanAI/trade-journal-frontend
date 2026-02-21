// Shims for Next.js components to work in Remotion
import React from "react";
import { Img, staticFile } from "remotion";

// Shim for next/image
export const Image: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, alt, width, height, className, style }) => {
  // Handle public folder paths
  const resolvedSrc = src.startsWith("/") ? staticFile(src.slice(1)) : src;

  return (
    <Img
      src={resolvedSrc}
      alt={alt}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        objectFit: "contain",
        ...style,
      }}
      className={className}
    />
  );
};

// Shim for next/link
export const Link: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ href, children, className, style }) => {
  return (
    <span className={className} style={{ cursor: "pointer", ...style }}>
      {children}
    </span>
  );
};

// Shim for next/navigation
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
});

export const usePathname = () => "/chat";
export const useSearchParams = () => new URLSearchParams();
