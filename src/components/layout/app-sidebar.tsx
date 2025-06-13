import Link from "next/link";
import { Icons } from "@/components/icons";
import { AppSidebarNav } from "@/components/layout/app-sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Icons.Logo className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl">Siso</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <AppSidebarNav />
      </div>
    </aside>
  );
}
