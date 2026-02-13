-- Migration 3: Create user_streaks table
-- Purpose: Track journal and plan streaks for gamification
-- Streak types: 'journal' (visiting Journal page), 'plan' (writing daily plan)
-- Streak day resets at 4:00 PM ET (market close)

CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_type TEXT NOT NULL CHECK (streak_type IN ('journal', 'plan')),
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, streak_type)
);

-- Create index on user_id for efficient queries
CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);

-- Create composite index for lookups
CREATE INDEX IF NOT EXISTS idx_user_streaks_user_type ON user_streaks(user_id, streak_type);

-- Enable RLS
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own streaks
DROP POLICY IF EXISTS "Users can view own streaks" ON user_streaks;
CREATE POLICY "Users can view own streaks"
ON user_streaks
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can update their own streaks
DROP POLICY IF EXISTS "Users can update own streaks" ON user_streaks;
CREATE POLICY "Users can update own streaks"
ON user_streaks
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can insert their own streaks
DROP POLICY IF EXISTS "Users can insert own streaks" ON user_streaks;
CREATE POLICY "Users can insert own streaks"
ON user_streaks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Verification query (run after migration):
-- SELECT * FROM information_schema.tables WHERE table_name = 'user_streaks';
-- SELECT * FROM pg_policies WHERE tablename = 'user_streaks';
