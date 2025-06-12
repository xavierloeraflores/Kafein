import Link from "next/link";
import Image from "next/image";
import { images } from "~/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto flex min-h-16 flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image
            src={images.logos.png[128]}
            alt="Kafein"
            width={100}
            height={100}
          />
          <span className="sr-only">Kafein</span>
        </Link>
        <p className="text-center text-sm text-gray-500 md:text-left">
          &copy; {new Date().getFullYear()} Kafein. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="text-gray-500 hover:text-emerald-600"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
