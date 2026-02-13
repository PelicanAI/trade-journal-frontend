-- Migration 1: Add paper trading flag to trades table
-- Purpose: Support paper trading vs real trades in the journal
-- Safe: Uses IF NOT EXISTS, defaults to false (existing trades are real trades)

ALTER TABLE trades
ADD COLUMN IF NOT EXISTS is_paper BOOLEAN DEFAULT false;

-- Grandfather all existing trades as real trades (is_paper = false is the default)
-- No data update needed since DEFAULT false handles it

-- Verification query (run after migration):
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'trades' AND column_name = 'is_paper';
