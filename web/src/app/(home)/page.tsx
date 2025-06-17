import Hero from "~/components/hero";
import Benefits from "~/components/benefits";
// import Testimonials from "~/components/testimonials";
import Products from "~/components/products";
import About from "~/components/about";
import Community from "~/components/community";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Benefits />
      <Products />
      {/* <Testimonials /> */}
      <About />
      <Community />
    </main>
  );
}
