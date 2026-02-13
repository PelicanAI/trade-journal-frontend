-- Migration 2: Create trade_patterns table
-- Purpose: Store AI-discovered trading patterns (behavioral, timing, setup, etc.)
-- Pattern detection runs server-side, users can view/dismiss their own patterns

CREATE TABLE IF NOT EXISTS trade_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pattern_type TEXT NOT NULL CHECK (pattern_type IN ('timing', 'behavioral', 'setup', 'ticker', 'risk', 'emotional')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  supporting_trade_ids UUID[],
  metrics JSONB,
  is_dismissed BOOLEAN DEFAULT false,
  discovered_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on user_id for efficient queries
CREATE INDEX IF NOT EXISTS idx_trade_patterns_user_id ON trade_patterns(user_id);

-- Create index on pattern_type for filtering
CREATE INDEX IF NOT EXISTS idx_trade_patterns_type ON trade_patterns(pattern_type);

-- Create index on is_dismissed for active patterns queries
CREATE INDEX IF NOT EXISTS idx_trade_patterns_dismissed ON trade_patterns(is_dismissed);

-- Enable RLS
ALTER TABLE trade_patterns ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own patterns
DROP POLICY IF EXISTS "Users can view own patterns" ON trade_patterns;
CREATE POLICY "Users can view own patterns"
ON trade_patterns
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can dismiss their own patterns
DROP POLICY IF EXISTS "Users can dismiss own patterns" ON trade_patterns;
CREATE POLICY "Users can dismiss own patterns"
ON trade_patterns
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role handles inserts (pattern detection runs server-side)
-- No INSERT policy for authenticated users

-- Verification query (run after migration):
-- SELECT * FROM information_schema.tables WHERE table_name = 'trade_patterns';
-- SELECT * FROM pg_policies WHERE tablename = 'trade_patterns';
