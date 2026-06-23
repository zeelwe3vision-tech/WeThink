// Chetan - 22/06/2026 - start

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

module.exports = supabase;

// Chetan - 22/06/2026 - end
