import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://huiamspnzkmehxtfzkrs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aWFtc3BuemttZWh4dGZ6a3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NjgzMTgsImV4cCI6MjA0NTM0NDMxOH0.2QU_aExTTNi4O8nJmIyyNv3LN5fUNVNIr2-_2rf7xcU"
  );
}
