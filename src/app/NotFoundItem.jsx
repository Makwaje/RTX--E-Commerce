import { Search } from "lucide-react";
import Link from "next/link";

function NotFoundItem() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="rounded-full bg-zinc-100 p-3 mb-4">
        <Search className="h-6 w-6 text-gray-400" />
      </div>
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
        No results found
      </h2>
      <p className="mt-2 text-center text-gray-600">
        We couldn&apos;t find any products matching
      </p>
    </div>
  );
}

export default NotFoundItem;
