import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { images } from "~/lib/constants";
import { SectionContainer } from "./framer-container";

export default function Hero() {
  return (
    <SectionContainer className="w-full bg-gradient-to-b from-white to-emerald-50 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Experience the Perfect{" "}
                <span className="text-emerald-600">Matcha Latte</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Kafein is a San Jose-based matcha shop proudly serving the Bay
                Area with thoughtfully crafted, small-batch matcha drinks made
                using premium ceremonial-grade matcha sourced from Uji, Japan.
                Refresh, recharge, and reconnect—one sip at a time.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/shop">
                  Order Now
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={images.hero}
              width={350}
              height={350}
              alt="Matcha Latte"
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
