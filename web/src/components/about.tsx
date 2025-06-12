import Image from "next/image";
import { images } from "~/lib/constants";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-emerald-50 py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center">
            <Image
              src={images.about}
              width={600}
              height={400}
              alt="Matcha farm in Japan"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Matcha Story
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Founded in 2025, Kafein began with a simple mission: to bring
                authentic, high-quality matcha to matcha lovers in the Bay Area.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">
                Our journey started in the lush tea fields of Uji, Japan, where
                we formed direct relationships with family-owned tea farms that
                have been perfecting the art of matcha for generations.
              </p>
              <p className="text-gray-500">
                Today, we&apos;re proud to offer ceremonial grade matcha that
                honors tradition while embracing modern flavors and preparation
                methods. Every product is crafted with care, sustainability, and
                a deep respect for matcha&apos;s rich heritage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
