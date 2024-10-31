import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { search } from "@/app/actions/products";
import SearchBar from "@/components/SearchBar";
import NotFoundItem from "@/app/NotFoundItem";

export default async function SearchResultsPage({ params }) {
  const { query } = await params;
  const data = await search(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium mb-6">
        Search Results of:{" "}
        <span className="font-bold">{decodeURIComponent(query)}</span>
      </h1>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>
      <div className="space-y-6">
        {data.length === 0 && <NotFoundItem />}
        {data.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col sm:flex-row overflow-hidden"
          >
            <div className="w-full sm:w-48 h-48">
              <Image
                src={product.photos.at(0)}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-contain"
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
