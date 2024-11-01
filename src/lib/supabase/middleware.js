import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = await createServerClient(
    "https://huiamspnzkmehxtfzkrs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aWFtc3BuemttZWh4dGZ6a3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NjgzMTgsImV4cCI6MjA0NTM0NDMxOH0.2QU_aExTTNi4O8nJmIyyNv3LN5fUNVNIr2-_2rf7xcU",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user?.email === "admin@rtx.com" &&
    !request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/checkout")
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    user?.email !== "admin@rtx.com" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (!user && request.nextUrl.pathname === "/cart") ||
    (!user && request.nextUrl.pathname === "/profile")
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // if user authenticated, no need to see login/signup
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
