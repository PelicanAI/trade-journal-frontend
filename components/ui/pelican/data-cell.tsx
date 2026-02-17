import { cn } from '@/lib/utils';

interface DataCellProps {
  /** The numeric value to display */
  value: string | number;
  /** Adds color based on positive/negative */
  sentiment?: 'positive' | 'negative' | 'neutral';
  /** Prefix like $ or + */
  prefix?: string;
  /** Suffix like % */
  suffix?: string;
  /** Additional classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'base' | 'lg';
}

export function DataCell({
  value,
  sentiment,
  prefix = '',
  suffix = '',
  className,
  size = 'base',
}: DataCellProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg font-medium',
  };

  return (
    <span
      className={cn(
        'data-value',
        sizeClasses[size],
        sentiment === 'positive' && 'data-positive',
        sentiment === 'negative' && 'data-negative',
        sentiment === 'neutral' && 'data-neutral',
        className,
      )}
    >
      {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </span>
  );
}
