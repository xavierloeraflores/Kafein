import { Star } from "lucide-react";
import { testimonials } from "~/lib/constants";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full bg-white py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don&apos;t just take our word for it. Here&apos;s what matcha
              lovers have to say about our products.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  quote,
  rating,
}: {
  name: string;
  quote: string;
  rating: number;
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
      <div className="space-y-2">
        <div className="flex text-yellow-400">
          {Array(rating)
            .fill(null)
            .map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
        </div>
        <p className="text-gray-500">&quot;{quote}&quot;</p>
      </div>
      <div className="mt-4">
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}
