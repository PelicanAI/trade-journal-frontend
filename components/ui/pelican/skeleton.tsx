import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  /** Predefined shapes */
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'chart';
}

export function Skeleton({ className, variant }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-3/4',
    title: 'h-7 w-1/3',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full',
    chart: 'h-48 w-full',
  };

  return (
    <div
      className={cn(
        'skeleton',
        variant && variantClasses[variant],
        className,
      )}
    />
  );
}

/** Pre-built skeleton for a data table row */
export function SkeletonRow({ columns = 6 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className={cn('h-4', i === 0 ? 'w-20' : 'w-16')} />
      ))}
    </div>
  );
}

/** Pre-built skeleton for a card with title + content */
export function SkeletonCard() {
  return (
    <div className="pelican-card space-y-3">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}
