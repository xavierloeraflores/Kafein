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
                Kafein was founded in 2025 after a life-changing trip to Japan.
                What began as a one-month stay turned into a lasting love for
                the culture, the people, and most of all—the matcha. After
                experiencing ceremonial-grade matcha in Uji, we couldn&apos;t
                forget the taste, the ritual, or the feeling it left us with.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">
                Inspired by that journey, we returned home with a mission: to
                bring that same authenticity and quality to the Bay Area.
              </p>
              <p className="text-gray-500">
                Today, Kafein proudly serves thoughtfully crafted, small-batch
                matcha drinks made from premium Uji-sourced green tea. Every cup
                honors the tradition we fell in love with—while embracing fresh,
                modern ways to enjoy it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
