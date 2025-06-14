
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebarNav } from "@/components/layout/app-sidebar-nav"; 
import { Icons } from "@/components/icons";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useState } from "react";

export function AppHeader() {
  const { currentUser, sisoUser } = useAuthContext();
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6">
      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-[260px]">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 border-b px-4 py-4 text-lg font-semibold"
            onClick={() => setMobileSheetOpen(false)}
          >
            <Icons.Logo className="h-7 w-7 text-primary" />
            <span className="font-headline">Siso</span>
          </Link>
          <AppSidebarNav isMobile={true} onLinkClick={() => setMobileSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        {currentUser && (
          <Link href="/profile">
            <Avatar className="h-9 w-9 cursor-pointer">
              {/* Add logic for actual avatar image later if available */}
              <AvatarImage src={currentUser.photoURL || `https://placehold.co/100x100.png?text=${getInitials(sisoUser?.username || currentUser.displayName)}`} alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>{getInitials(sisoUser?.username || currentUser.displayName)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </header>
  );
}
