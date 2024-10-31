"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <div className="flex items-center max-w-lg ">
      <Input
        placeholder="Search for parts..."
        className="rounded-r-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        className="rounded-l-none"
        onClick={() => router.push(`/search/${searchQuery}`)}
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
