import Footer from "~/components/footer";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Benefits from "~/components/benefits";
import Testimonials from "~/components/testimonials";
import Products from "~/components/products";
import About from "~/components/about";
import Community from "~/components/community";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Products />
        <Testimonials />
        <About />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
