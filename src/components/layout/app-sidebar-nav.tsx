
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserCircle,
  Search,
  Users,
  Music2,
  MessageCircle,
  Wand2,
  LogOut,
  Settings,
  Disc3
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/search", label: "Search Musicians", icon: Search },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/feed", label: "Audio Feed", icon: Disc3 },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/ai-finder", label: "AI Finder", icon: Wand2 },
];

const bottomNavItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/logout", label: "Logout", icon: LogOut }, // Placeholder, link to / for now
];

interface AppSidebarNavProps {
  isMobile?: boolean;
}

export function AppSidebarNav({ isMobile = false }: AppSidebarNavProps) {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.href}
      href={item.href === "/logout" ? "/" : item.href} // Logout redirects to landing
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
        pathname === item.href && "bg-primary/10 text-primary font-medium",
        isMobile && "text-base"
      )}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </Link>
  );

  return (
    <nav className={cn("grid items-start gap-1 text-sm font-medium", isMobile ? "p-4" : "p-2")}>
      {navItems.map(renderNavItem)}
      {!isMobile && (
        <>
          <div className="my-4 border-t border-border"></div>
          {bottomNavItems.map(renderNavItem)}
        </>
      )}
    </nav>
  );
}
