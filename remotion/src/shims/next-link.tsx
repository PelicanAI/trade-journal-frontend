/**
 * Shim for next/link - replaces with standard anchor tag for Remotion
 */
import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
}

function Link({
  href,
  children,
  className,
  style,
  target,
  rel,
  ...rest
}: LinkProps) {
  return (
    <a href={href} className={className} style={style} target={target} rel={rel}>
      {children}
    </a>
  );
}

export default Link;
