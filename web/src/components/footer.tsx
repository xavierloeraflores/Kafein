import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Leaf className="h-6 w-6 text-emerald-600" />
          <span>Kafein</span>
        </div>
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
