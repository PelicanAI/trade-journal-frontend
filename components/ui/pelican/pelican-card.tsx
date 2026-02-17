'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PelicanCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift effect and pointer cursor */
  interactive?: boolean;
  /** Removes padding — useful when card has its own internal layout */
  noPadding?: boolean;
  /** Subtle accent glow on the top edge */
  accentGlow?: boolean;
}

const PelicanCard = forwardRef<HTMLDivElement, PelicanCardProps>(
  ({ className, interactive = false, noPadding = false, accentGlow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pelican-card',
          interactive && 'pelican-card-interactive',
          noPadding && 'p-0',
          accentGlow && 'relative overflow-hidden',
          className,
        )}
        {...props}
      >
        {accentGlow && (
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
              opacity: 0.4,
            }}
          />
        )}
        {children}
      </div>
    );
  },
);

PelicanCard.displayName = 'PelicanCard';
export { PelicanCard };
