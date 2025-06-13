
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserCircle,
  Search,
  Users,
  Disc3,
  MessageCircle,
  Wand2,
  LogOut,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/hooks/use-auth-context";


interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  action?: () => Promise<void>;
}


interface AppSidebarNavProps {
  isMobile?: boolean;
  onLinkClick?: () => void; // For closing mobile sheet
}

export function AppSidebarNav({ isMobile = false, onLinkClick }: AppSidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push("/login");
      if (onLinkClick) onLinkClick();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Logout Failed", description: error.message });
    }
  };

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
    // Logout is now a button with an action
  ];


  const renderNavItem = (item: NavItem) => {
    if (item.action) {
      return (
        <Button
          key={item.label}
          variant="ghost"
          className={cn(
            "flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 w-full",
            isMobile && "text-base"
          )}
          onClick={() => {
            item.action!();
            if (onLinkClick) onLinkClick();
          }}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Button>
      );
    }
    return (
    <Link
      key={item.href}
      href={item.href}
      onClick={onLinkClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
        pathname === item.href && "bg-primary/10 text-primary font-medium",
        isMobile && "text-base"
      )}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </Link>
  )};

  if (!currentUser && !isMobile) return null; // Don't show sidebar nav if not logged in on desktop

  return (
    <nav className={cn("grid items-start gap-1 text-sm font-medium", isMobile ? "p-4" : "p-2")}>
      {navItems.map(renderNavItem)}
      <div className="my-2 border-t border-border"></div>
      {bottomNavItems.map(renderNavItem)}
       <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10 w-full",
            isMobile && "text-base"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
    </nav>
  );
}
