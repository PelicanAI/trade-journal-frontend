-- Extend existing waitlist table (33 rows) with columns needed for shutdown form.
-- All new columns are nullable so existing rows remain valid.

ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS referral_code text,
  ADD COLUMN IF NOT EXISTS notified_at timestamptz;

-- Existing "Public can insert to waitlist" INSERT policy is preserved. Do not modify.
-- Add admin SELECT policy for future admin UI.

DROP POLICY IF EXISTS waitlist_admin_select ON public.waitlist;
CREATE POLICY waitlist_admin_select ON public.waitlist
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_credits
      WHERE user_credits.user_id = auth.uid()
        AND user_credits.is_admin = true
    )
  );
