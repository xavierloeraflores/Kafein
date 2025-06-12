import { Leaf, Coffee, Award } from "lucide-react";

export default function Benefits() {
  return (
    <section id="benefits" className="w-full bg-white py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="focus:ring-ring text-primary-foreground inline-flex items-center rounded-full border border-transparent bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-emerald-600/80 focus:ring-2 focus:ring-offset-2 focus:outline-none">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Benefits of Our Matcha
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our ceremonial grade matcha is carefully sourced from the finest
              tea farms in Japan, ensuring exceptional quality and taste.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <BenefitCard
            title="Rich in Antioxidants"
            description="Packed with catechins, our matcha provides powerful antioxidants that help protect your cells and boost immunity."
            icon={<Leaf className="h-6 w-6 text-emerald-600" />}
          />
          <BenefitCard
            title="Sustained Energy"
            description="Experience calm alertness with L-theanine and caffeine that provides energy without the crash or jitters."
            icon={<Coffee className="h-6 w-6 text-emerald-600" />}
          />
          <BenefitCard
            title="Premium Quality"
            description="Our ceremonial grade matcha is stone-ground from the youngest tea leaves for exceptional flavor and nutrients."
            icon={<Award className="h-6 w-6 text-emerald-600" />}
          />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
