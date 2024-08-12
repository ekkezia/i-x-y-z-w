import { createClient } from "@supabase/supabase-js";

export const supabaseUrl =
  process.env.SUPABASE_URL || "https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/i-x-y-z-w";
export const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZ2JjdW9sd2hrcW9vd3huYWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MzE5NDAsImV4cCI6MjAwOTQwNzk0MH0.bjHVqxQ8NTH1S0LeuHEpRaeliEcFEEqSoU0bJR1tYJs";

export default createClient(supabaseUrl, supabaseAnonKey);
