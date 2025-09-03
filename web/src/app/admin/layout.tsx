// import { ChartAreaIcon, LogsIcon, User2Icon } from "lucide-react";
import { LogsIcon } from "lucide-react";

const links: { icon: React.ReactNode; label: string; href: string }[] = [
  {
    icon: <LogsIcon className="mr-3 h-5 w-5" />,
    label: "Orders",
    href: "/admin/orders",
  },
  //   {
  //     icon: <User2Icon className="mr-3 h-5 w-5" />,
  //     label: "Customers",
  //     href: "/admin/customers",
  //   },
  //   {
  //     icon: <ChartAreaIcon className="mr-3 h-5 w-5" />,
  //     label: "Reports",
  //     href: "/admin/reports",
  //   },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex">
        <aside className="bg-sidebar border-sidebar-border w-64 border-r">
          <div className="p-6">
            <h1 className="text-sidebar-foreground text-xl font-bold">
              Order Admin
            </h1>
          </div>
          <nav className="space-y-2 px-4">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                className="bg-sidebar-primary/80 text-sidebar-primary-foreground hover:bg-sidebar-primary flex items-center rounded-md px-3 py-2 text-sm font-medium"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
