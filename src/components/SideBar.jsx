"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";

function SideBar() {
  const router = usePathname();

  const isActive = (path) => router === path;
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        <Link
          href="/admin"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            isActive("/admin") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <Package className="w-5 h-5 mr-2" />
          Orders
        </Link>

        <Link
          href="/admin/add-product"
          className={`flex items-center px-4 py-2 text-gray-700 ${
            isActive("/admin/add-product") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </nav>
    </aside>
  );
}

export default SideBar;
