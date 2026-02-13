# Phase 1: Database Migration Instructions

## Overview
These migrations add V2 features to the existing Pelican Trading production database:
- Paper trading support
- Trade pattern detection (AI insights)
- User streaks (gamification)
- Market data caching (Finnhub, Polygon)
- Streak update RPC function

## ⚠️ PRODUCTION SAFETY
All migrations use `IF NOT EXISTS` and are **additive only** - no data deletion or modification.
Safe to run against production Supabase.

## Migration Order (MUST be sequential)

### 1. Add Paper Trading Flag
**File:** `20260212_001_add_paper_trading_flag.sql`

**What it does:**
- Adds `is_paper` BOOLEAN column to `trades` table
- Defaults to `false` (all existing trades are real trades)

**Run in Supabase SQL Editor:**
```sql
ALTER TABLE trades
ADD COLUMN IF NOT EXISTS is_paper BOOLEAN DEFAULT false;
```

**Verify:**
```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'trades' AND column_name = 'is_paper';
```

**Expected output:**
| column_name | data_type | column_default |
|-------------|-----------|----------------|
| is_paper    | boolean   | false          |

---

### 2. Create Trade Patterns Table
**File:** `20260212_002_create_trade_patterns_table.sql`

**What it does:**
- Creates `trade_patterns` table for AI-discovered trading patterns
- Adds RLS policies (users read/update own patterns only)
- Creates indexes for performance

**Run:** Copy entire SQL file into Supabase SQL Editor and execute.

**Verify:**
```sql
-- Check table exists
SELECT * FROM information_schema.tables WHERE table_name = 'trade_patterns';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'trade_patterns';

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename = 'trade_patterns';
```

**Expected output:**
- Table exists: ✅
- 2 RLS policies: `Users can view own patterns`, `Users can dismiss own patterns`
- 3 indexes: `idx_trade_patterns_user_id`, `idx_trade_patterns_type`, `idx_trade_patterns_dismissed`

---

### 3. Create User Streaks Table
**File:** `20260212_003_create_user_streaks_table.sql`

**What it does:**
- Creates `user_streaks` table for tracking journal/plan streaks
- Adds RLS policies (users read/update/insert own streaks)
- Creates indexes for performance

**Run:** Copy entire SQL file into Supabase SQL Editor and execute.

**Verify:**
```sql
-- Check table exists
SELECT * FROM information_schema.tables WHERE table_name = 'user_streaks';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'user_streaks';

-- Check unique constraint
SELECT conname FROM pg_constraint
WHERE conrelid = 'user_streaks'::regclass AND contype = 'u';
```

**Expected output:**
- Table exists: ✅
- 3 RLS policies: view, update, insert
- Unique constraint on `(user_id, streak_type)`

---

### 4. Create Cached Market Data Table
**File:** `20260212_004_create_cached_market_data_table.sql`

**What it does:**
- Creates `cached_market_data` table for caching external API responses
- Adds RLS policy (authenticated users can read)
- Creates indexes for type, expiry, user lookups

**Run:** Copy entire SQL file into Supabase SQL Editor and execute.

**Verify:**
```sql
-- Check table exists
SELECT * FROM information_schema.tables WHERE table_name = 'cached_market_data';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'cached_market_data';

-- Check indexes
SELECT indexname FROM pg_indexes WHERE tablename = 'cached_market_data';
```

**Expected output:**
- Table exists: ✅
- 1 RLS policy: `Authenticated users can read cached data`
- 4 indexes for efficient queries

---

### 5. Create Update Streak RPC Function
**File:** `20260212_005_create_update_streak_rpc.sql`

**What it does:**
- Creates `update_streak(p_streak_type TEXT)` RPC function
- Handles streak logic (consecutive days, 4 PM ET reset)
- Returns JSON: `{ current_streak, best_streak, is_new }`

**Run:** Copy entire SQL file into Supabase SQL Editor and execute.

**Verify:**
```sql
-- Check function exists
SELECT proname, proargnames, prosrc
FROM pg_proc
WHERE proname = 'update_streak';

-- Test function (as authenticated user)
SELECT update_streak('journal');
```

**Expected output:**
- Function exists: ✅
- Test returns: `{"current_streak": 1, "best_streak": 1, "is_new": true}`

---

## Post-Migration Verification

### Full Schema Check
```sql
-- Verify all new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('trade_patterns', 'user_streaks', 'cached_market_data')
ORDER BY table_name;
```

**Expected output:**
```
cached_market_data
trade_patterns
user_streaks
```

### Verify trades.is_paper Column
```sql
SELECT COUNT(*) as total_trades,
       SUM(CASE WHEN is_paper THEN 1 ELSE 0 END) as paper_trades,
       SUM(CASE WHEN NOT is_paper THEN 1 ELSE 0 END) as real_trades
FROM trades;
```

All existing trades should be `real_trades` (paper_trades = 0).

---

## Rollback (If Needed)

**⚠️ Only run if something goes wrong:**

```sql
-- Rollback in REVERSE order

-- 5. Drop RPC function
DROP FUNCTION IF EXISTS update_streak(TEXT);

-- 4. Drop cached_market_data table
DROP TABLE IF EXISTS cached_market_data;

-- 3. Drop user_streaks table
DROP TABLE IF EXISTS user_streaks;

-- 2. Drop trade_patterns table
DROP TABLE IF EXISTS trade_patterns;

-- 1. Drop is_paper column
ALTER TABLE trades DROP COLUMN IF EXISTS is_paper;
```

---

## Migration Checklist

- [ ] Migration 1: `is_paper` column added ✅
- [ ] Migration 2: `trade_patterns` table created ✅
- [ ] Migration 3: `user_streaks` table created ✅
- [ ] Migration 4: `cached_market_data` table created ✅
- [ ] Migration 5: `update_streak` RPC created ✅
- [ ] Post-migration verification passed ✅
- [ ] All RLS policies verified ✅
- [ ] All indexes created ✅

---

## Next Steps After Migration

Once all migrations pass verification:
1. ✅ Mark Phase 1 complete
2. ➡️ Proceed to **Phase 2: Shared Infrastructure**
   - Pelican Chat Panel component
   - Top navigation bar
   - Feature layout wrapper

---

## Support

If any migration fails:
1. Check Supabase logs for error details
2. Verify auth user has proper permissions
3. Run verification queries to identify missing pieces
4. Do NOT proceed to next migration until current one passes

**Supabase Project ID:** `ewcqmsfaostcwmgybbub`
**Region:** us-east-2
