import { SecondaryHeader } from "~/components/header";
import Footer from "~/components/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SecondaryHeader />
      {children}
      <Footer />
    </div>
  );
}
