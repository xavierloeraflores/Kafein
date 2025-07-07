import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { products } from "~/lib/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SectionContainer } from "./framer-container";

export default function Products() {
  return (
    <SectionContainer
      id="products"
      className="w-full bg-emerald-50 py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Signature Products
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our collection of premium matcha products, crafted with
              care and tradition.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

function ProductCard({
  emoji,
  title,
  price,
  description,
  image,
}: {
  emoji: string;
  title: string;
  price: number;
  description: string;
  image: string;
}) {
  return (
    <Card className="flex flex-col justify-between rounded-lg border bg-white shadow-sm">
      <CardHeader>
        <div className="flex aspect-square w-full flex-row items-center justify-center overflow-hidden rounded-md">
          <Image
            src={image}
            width={500}
            height={500}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <CardTitle className="flex min-h-16 items-center gap-2 text-xl font-bold">
          <span className="text-2xl">{emoji}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="align-text-bottom text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-emerald-600">
          ${price.toFixed(2)}
        </span>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
          asChild
        >
          <Link href="/shop">Order</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
