CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL UNIQUE,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0)
);

INSERT INTO results (category, count) VALUES
  ('dream', 0),
  ('soul', 0),
  ('adventure', 0)
ON CONFLICT (category) DO NOTHING;

ALTER TABLE results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "results_select_public"
  ON results
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- No INSERT/UPDATE/DELETE policies: direct writes are blocked for anon users.
-- Counts are incremented only via submit-result Edge Function (service role).

CREATE OR REPLACE FUNCTION increment_result_count(p_category text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_category NOT IN ('dream', 'soul', 'adventure') THEN
    RAISE EXCEPTION 'Invalid category: %', p_category;
  END IF;

  UPDATE results
  SET count = count + 1
  WHERE category = p_category;
END;
$$;

REVOKE ALL ON FUNCTION increment_result_count(text) FROM PUBLIC;
-- Not granted to anon/authenticated; Edge Function calls this with the service role key.
