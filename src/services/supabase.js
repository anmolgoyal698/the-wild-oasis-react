import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tohrqjjzeeyyqcyhvoez.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaHJxamp6ZWV5eXFjeWh2b2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NTI3ODQsImV4cCI6MjA0MTAyODc4NH0.DMff6v0y3l2MCuolWYdSGZPRcvsFCoG-13oGEd_dDRw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
