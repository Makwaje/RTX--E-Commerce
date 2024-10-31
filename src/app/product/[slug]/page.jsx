import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import getProduct from "@/app/actions/products";
import { addToCart } from "@/app/actions/cart";
import AddToCartButton from "@/components/AddToCart-Button";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = {
    name: "RTX 3080 Graphics Card",
    price: 699.99,
    rating: 4.8,
    reviews: 1024,
    inStock: true,
    description:
      "Experience unparalleled gaming performance with the NVIDIA GeForce RTX 3080. Powered by Ampere—NVIDIA's 2nd gen RTX architecture—it delivers incredible rasterization performance, ray tracing, and AI-powered DLSS.",
    features: [
      "10GB GDDR6X memory",
      "320-bit memory interface",
      "8704 CUDA cores",
      "1.71 GHz boost clock",
      "PCIe 4.0 interface",
      "HDMI 2.1, 3x DisplayPort 1.4a",
    ],
    specifications: [
      { name: "GPU", value: "NVIDIA GeForce RTX 3080" },
      { name: "CUDA Cores", value: "8704" },
      { name: "Memory", value: "10GB GDDR6X" },
      { name: "Memory Interface", value: "320-bit" },
      { name: "Boost Clock", value: "1.71 GHz" },
      { name: "Power Connectors", value: "2x 8-pin" },
      { name: "Recommended PSU", value: "750W" },
    ],
  };

  const data = await getProduct(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src={data.at(0).photos.at(0)}
            alt={data.at(0).name}
            width={600}
            height={400}
            className="w-full rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{data.at(0).name}</h1>
          </div>
          <div className="text-3xl font-bold">
            ${data.at(0).price.toFixed(2)}
          </div>
          <Badge variant={product.inStock ? "default" : "secondary"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
          <p className="text-muted-foreground">{data.at(0).description}</p>
          <div className="flex items-center space-x-4">
            <AddToCartButton id={data.at(0).id} />
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Free shipping
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              2-year warranty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
