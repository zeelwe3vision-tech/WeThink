// Chetan - 22/06/2026 - start

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

module.exports = supabase;

// Chetan - 22/06/2026 - end
