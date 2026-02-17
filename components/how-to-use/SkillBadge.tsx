interface SkillBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  audience?: 'trader' | 'investor';
}

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function SkillBadge({ level, audience }: SkillBadgeProps) {
  const label = audience ? `${levelLabels[level]} ${audience}` : levelLabels[level];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.35rem 0.75rem',
        background: 'rgba(99, 102, 241, 0.15)',
        color: '#A5B4FC',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.7rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}
    >
      {label}
    </span>
  );
}
