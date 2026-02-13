-- Migration 4: Create cached_market_data table
-- Purpose: Cache external API data (Finnhub, Polygon) to reduce API calls
-- Data types: earnings_calendar, economic_calendar, sp500_prices, top_movers, user_brief
-- Service role handles inserts/updates, authenticated users can read

CREATE TABLE IF NOT EXISTS cached_market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_type TEXT NOT NULL CHECK (data_type IN ('earnings_calendar', 'economic_calendar', 'sp500_prices', 'top_movers', 'user_brief')),
  data JSONB NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  -- Optional: user_id for user-specific cached data (like generated briefs)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Optional: cache key for additional filtering
  cache_key TEXT
);

-- Create index on data_type for efficient queries
CREATE INDEX IF NOT EXISTS idx_cached_market_data_type ON cached_market_data(data_type);

-- Create index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_cached_market_data_expires ON cached_market_data(expires_at);

-- Create index on user_id for user-specific caches
CREATE INDEX IF NOT EXISTS idx_cached_market_data_user ON cached_market_data(user_id);

-- Create composite index for type + expiry lookups
CREATE INDEX IF NOT EXISTS idx_cached_market_data_type_expires ON cached_market_data(data_type, expires_at);

-- Enable RLS
ALTER TABLE cached_market_data ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Authenticated users can read cached data
DROP POLICY IF EXISTS "Authenticated users can read cached data" ON cached_market_data;
CREATE POLICY "Authenticated users can read cached data"
ON cached_market_data
FOR SELECT
TO authenticated
USING (true);

-- Service role handles inserts/updates (cache refresh runs server-side)
-- No INSERT/UPDATE/DELETE policies for authenticated users

-- Verification query (run after migration):
-- SELECT * FROM information_schema.tables WHERE table_name = 'cached_market_data';
-- SELECT * FROM pg_policies WHERE tablename = 'cached_market_data';
