'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Right-aligned actions (buttons, toggles, etc.) */
  actions?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn('flex items-start justify-between gap-4 mb-8', className)}
    >
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </motion.div>
  );
}
