import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { images } from "~/lib/constants";
import { DivContainer } from "./framer-container";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <DivContainer className="container mx-auto flex h-20 w-full items-center justify-between space-x-4 px-4 sm:space-x-0">
        <Link href="#" className="flex items-center gap-2 text-xl font-bold">
          <span className="sr-only">Kafein</span>
          <Image
            src={images.logos.png[256]}
            alt="Kafein"
            width={200}
            height={200}
          />
        </Link>
        <div className="hidden items-center space-x-1 md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#products"
              className="transition-colors hover:text-emerald-600"
            >
              Products
            </Link>
            <Link
              href="#benefits"
              className="transition-colors hover:text-emerald-600"
            >
              Benefits
            </Link>
            {/* <Link
              href="#testimonials"
              className="transition-colors hover:text-emerald-600"
            >
              Testimonials
            </Link> */}
            <Link
              href="#about"
              className="transition-colors hover:text-emerald-600"
            >
              About
            </Link>
          </nav>
          <div className="ml-4 flex items-center space-x-1">
            <Button
              size="sm"
              className="bg-emerald-600 px-4 hover:bg-emerald-700"
              asChild
            >
              <Link href="/shop">Order</Link>
            </Button>
          </div>
        </div>
        <div className="flex md:hidden">
          <Button
            size="sm"
            className="bg-emerald-600 px-4 hover:bg-emerald-700"
            asChild
          >
            <Link href="/shop">Order</Link>
          </Button>
          {/* TODO: Add menu button */}
          {/* <Button variant="ghost" size="sm" className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button> */}
        </div>
      </DivContainer>
    </header>
  );
}

export function SecondaryHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-20 w-full items-center justify-between space-x-4 sm:space-x-0">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="sr-only">Kafein</span>
          <Image
            src={images.logos.png[256]}
            alt="Kafein"
            width={200}
            height={200}
          />
        </Link>
        <div className="hidden items-center space-x-1 md:flex">
          <div className="ml-4 flex items-center space-x-1">
            <Button
              size="sm"
              className="bg-emerald-600 px-4 hover:bg-emerald-700"
              asChild
            >
              <Link href="/shop">Order Now</Link>
            </Button>
          </div>
        </div>
        <div className="flex md:hidden">
          <Button
            size="sm"
            className="bg-emerald-600 px-4 hover:bg-emerald-700"
            asChild
          >
            <Link href="/shop">Order</Link>
          </Button>
          {/* TODO: Add menu button */}
          {/* <Button variant="ghost" size="sm" className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button> */}
        </div>
      </div>
    </header>
  );
}
