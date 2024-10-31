import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Cog, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import SearchBar from "./SearchBar";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          RTX
        </Link>
        <div className="flex items-center space-x-4">
          <SearchBar />
          {user && (
            <>
              <Button variant="outline" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="/profile">
                  <Cog className="h-4 w-4" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
            </>
          )}
          {/* Logout/Login */}
          {!user ? (
            <Button variant="outline" size="icon" asChild>
              <Link href="/auth/login">
                <User className="h-4 w-4" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          ) : (
            <Button variant="destructive" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
