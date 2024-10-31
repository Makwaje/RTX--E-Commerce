import { getCategory } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Static product data
const products = [
  {
    id: 1,
    name: "RTX 3080 Graphics Card",
    price: 699.99,
    category: "GPUs",
    brand: "NVIDIA",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "AMD Ryzen 9 5950X",
    price: 749.99,
    category: "CPUs",
    brand: "AMD",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "1TB NVMe SSD",
    price: 129.99,
    category: "Storage",
    brand: "Samsung",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "32GB DDR4 RAM Kit",
    price: 159.99,
    category: "RAM",
    brand: "Corsair",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "850W Gold PSU",
    price: 129.99,
    category: "Power Supplies",
    brand: "EVGA",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "X570 Motherboard",
    price: 249.99,
    category: "Motherboards",
    brand: "ASUS",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "RTX 3070 Graphics Card",
    price: 499.99,
    category: "GPUs",
    brand: "NVIDIA",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Intel Core i9-11900K",
    price: 539.99,
    category: "CPUs",
    brand: "Intel",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "2TB SATA SSD",
    price: 199.99,
    category: "Storage",
    brand: "Crucial",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "64GB DDR4 RAM Kit",
    price: 299.99,
    category: "RAM",
    brand: "G.Skill",
    image: "/placeholder.svg",
  },
  {
    id: 11,
    name: "1000W Platinum PSU",
    price: 219.99,
    category: "Power Supplies",
    brand: "Seasonic",
    image: "/placeholder.svg",
  },
  {
    id: 12,
    name: "B550 Motherboard",
    price: 149.99,
    category: "Motherboards",
    brand: "MSI",
    image: "/placeholder.svg",
  },
  {
    id: 13,
    name: "RTX 3060 Ti Graphics Card",
    price: 399.99,
    category: "GPUs",
    brand: "NVIDIA",
    image: "/placeholder.svg",
  },
  {
    id: 14,
    name: "AMD Ryzen 7 5800X",
    price: 449.99,
    category: "CPUs",
    brand: "AMD",
    image: "/placeholder.svg",
  },
  {
    id: 15,
    name: "4TB HDD",
    price: 89.99,
    category: "Storage",
    brand: "Western Digital",
    image: "/placeholder.svg",
  },
];

export default async function SearchResultsPage({ params }) {
  const { category } = await params;
  const data = await getCategory(decodeURIComponent(category));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium my-4 capitalize">
        category:{" "}
        <span className="font-bold">{decodeURIComponent(category)}</span>
      </h1>
      <div className="space-y-6">
        {data?.map((product) => (
          <Card
            key={product.name}
            className="flex flex-col sm:flex-row overflow-hidden"
          >
            <div className="w-full sm:w-48 h-48">
              <Image
                src={product?.photos?.at(0)} //
                alt={product.name}
                width={300} // desired width
                height={200} // desired height
                layout="fixed" // ensures image is rendered at the specified size
                className="w-full h-full object-contain"
                quality={30}
              />
            </div>
            <div className="flex flex-col justify-between p-6 flex-grow">
              <div>
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-muted-foreground mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.category_id.name}
                </p>
              </div>
              <div className="mt-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
