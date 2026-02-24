import { createClient } from "@supabase/supabase-js";

// Admin client using service role key — bypasses RLS
// Only use on the server side (API routes, server components)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
