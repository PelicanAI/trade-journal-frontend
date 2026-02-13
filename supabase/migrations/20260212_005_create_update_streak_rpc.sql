-- Migration 5: Create RPC function for streak updates
-- Purpose: Update user streaks with proper streak day logic (4:00 PM ET reset)
-- Called when user visits Brief or Journal page
-- Returns: { current_streak, best_streak, is_new }

CREATE OR REPLACE FUNCTION update_streak(p_streak_type TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_today DATE;
  v_result JSON;
  v_current_streak INT;
  v_best_streak INT;
  v_last_date DATE;
BEGIN
  -- Validate input
  IF p_streak_type NOT IN ('journal', 'plan') THEN
    RAISE EXCEPTION 'Invalid streak_type. Must be journal or plan.';
  END IF;

  -- Auth check
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Streak day resets at 4:00 PM ET (21:00 UTC during EST, 20:00 UTC during EDT)
  -- Simplified: use 21:00 UTC as cutoff
  -- If current time is past 4 PM ET today, streak day is tomorrow
  IF CURRENT_TIMESTAMP AT TIME ZONE 'America/New_York' >= (CURRENT_DATE || ' 16:00:00')::TIMESTAMP THEN
    v_today := (CURRENT_DATE AT TIME ZONE 'America/New_York' + INTERVAL '1 day')::DATE;
  ELSE
    v_today := CURRENT_DATE AT TIME ZONE 'America/New_York';
  END IF;

  -- Get existing streak record
  SELECT current_streak, best_streak, last_activity_date
  INTO v_current_streak, v_best_streak, v_last_date
  FROM user_streaks
  WHERE user_id = v_user_id AND streak_type = p_streak_type;

  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO user_streaks (user_id, streak_type, current_streak, best_streak, last_activity_date)
    VALUES (v_user_id, p_streak_type, 1, 1, v_today);

    RETURN json_build_object(
      'current_streak', 1,
      'best_streak', 1,
      'is_new', true
    );
  END IF;

  -- If already counted today, return current values
  IF v_last_date = v_today THEN
    RETURN json_build_object(
      'current_streak', v_current_streak,
      'best_streak', v_best_streak,
      'is_new', false
    );
  END IF;

  -- If yesterday (consecutive day), increment streak
  IF v_last_date = v_today - 1 THEN
    v_current_streak := v_current_streak + 1;

    -- Update best streak if current exceeds it
    IF v_current_streak > v_best_streak THEN
      v_best_streak := v_current_streak;
    END IF;
  ELSE
    -- Streak broken, reset to 1
    v_current_streak := 1;
  END IF;

  -- Update the record
  UPDATE user_streaks
  SET
    current_streak = v_current_streak,
    best_streak = v_best_streak,
    last_activity_date = v_today,
    updated_at = now()
  WHERE user_id = v_user_id AND streak_type = p_streak_type;

  -- Return updated values
  RETURN json_build_object(
    'current_streak', v_current_streak,
    'best_streak', v_best_streak,
    'is_new', true
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_streak(TEXT) TO authenticated;

-- Verification query (run after migration):
-- SELECT proname, proargnames, prosrc FROM pg_proc WHERE proname = 'update_streak';
--
-- Test query (run as authenticated user):
-- SELECT update_streak('journal');
