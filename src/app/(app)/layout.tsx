
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Skeleton } from '@/components/ui/skeleton'; // For loading UI

export default function AppLayout({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    // Basic full-page skeleton loader
    return (
      <div className="flex min-h-screen">
        <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-card p-6">
          <Skeleton className="h-8 w-24 mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
          </div>
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6">
            <Skeleton className="h-8 w-8 md:hidden" />
            <Skeleton className="h-8 w-48" />
            <div className="ml-auto flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            <Skeleton className="h-64 w-full" />
          </main>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // This case should ideally be handled by the redirect,
    // but return null or a minimal message to prevent rendering children prematurely.
    return null; 
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
