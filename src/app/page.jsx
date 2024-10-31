import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, FileText, Truck, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/app/actions/categories";
import SearchBar from "@/components/SearchBar";
import { featuredProducts as featuredProductsApi } from "./actions/products";
import AddToCartButton from "@/components/AddToCart-Button";

const steps = [
  {
    title: "Place Your Order",
    description:
      "Browse our wide selection of computer parts and add your desired items to the cart. When you're ready, proceed to checkout.",
    icon: <ShoppingCart className="h-12 w-12 mb-4 text-primary" />,
  },
  {
    title: "Fill in Your Information",
    description:
      "Provide your shipping details and contact information. Don't worry, we keep your data secure and never share it with third parties.",
    icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
  },
  {
    title: "Fast Delivery",
    description:
      "We process your order quickly and ship it out. Most orders are delivered within 3 business days, so you can start building or upgrading your PC in no time!",
    icon: <Truck className="h-12 w-12 mb-4 text-primary" />,
  },
  {
    title: "Cash on Delivery",
    description:
      "No need to pay upfront! We offer cash on delivery for your convenience and peace of mind. Pay when you receive your parts.",
    icon: <CreditCard className="h-12 w-12 mb-4 text-primary" />,
  },
];

export default async function HomePage() {
  const categories = await getCategories();

  // const featuredProducts = [
  //   {
  //     name: "RTX 3080 Graphics Card",
  //     price: "$699.99",
  //     image: "/placeholder.svg",
  //   },
  //   { name: "AMD Ryzen 9 5950X", price: "$749.99", image: "/placeholder.svg" },
  //   { name: "1TB NVMe SSD", price: "$129.99", image: "/placeholder.svg" },
  //   { name: "32GB DDR4 RAM Kit", price: "$159.99", image: "/placeholder.svg" },
  // ];

  const featuredProducts = await featuredProductsApi();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to RTX Computer Parts
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Find the best computer parts for your next build or upgrade.
        </p>
        <SearchBar />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.name}>
              <CardHeader>
                <Image
                  src={product.photos.at(0)}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-contain"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-muted-foreground">{product.price}</p>
              </CardContent>
              <CardFooter>
                <AddToCartButton id={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="hover:bg-muted transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-center capitalize">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardFooter className="justify-center">
                <Link
                  href={`/category/${category.name.toLowerCase()}`}
                  passHref
                >
                  <Button variant="link">Browse</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* how to works */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">How It Works</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center"
              >
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {step.icon}
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
