import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    "https://huiamspnzkmehxtfzkrs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aWFtc3BuemttZWh4dGZ6a3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NjgzMTgsImV4cCI6MjA0NTM0NDMxOH0.2QU_aExTTNi4O8nJmIyyNv3LN5fUNVNIr2-_2rf7xcU",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
