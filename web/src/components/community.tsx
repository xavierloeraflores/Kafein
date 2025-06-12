import { Button } from "~/components/ui/button";
import { socials } from "~/lib/constants";

export default function Community() {
  return (
    <section className="w-full bg-emerald-600 py-12 text-white md:py-24 lg:py-32">
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Join our Matcha Community
          </h2>
          <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Follow us on Instagram for exclusive offers, news, and more.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <Button
            className="bg-white text-emerald-600 hover:bg-white/90"
            asChild
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={socials.instagram}
            >
              Follow Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
