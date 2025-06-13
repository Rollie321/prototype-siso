import { ChatListItem } from "@/components/messaging/chat-list-item";
import { placeholderMessageThreads } from "@/lib/placeholder-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  // In a real app, a chat might be pre-selected or the first one, or none
  const activeChatId = null; // Or placeholderMessageThreads[0]?.id;

  return (
    <div className="flex h-[calc(100vh-4rem)] border-t"> {/* Adjust height based on header */}
      <aside className="w-full md:w-80 lg:w-96 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold font-headline">Chats</h2>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/messages/new"> {/* Placeholder for new chat */}
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">New Chat</span>
                </Link>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {placeholderMessageThreads.map(thread => (
              <ChatListItem key={thread.id} thread={thread} isActive={thread.id === activeChatId} />
            ))}
            {placeholderMessageThreads.length === 0 && (
                <div className="text-center p-10 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                    <p>No conversations yet.</p>
                    <Button variant="link" asChild><Link href="/search">Find musicians to chat with</Link></Button>
                </div>
            )}
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 hidden md:flex flex-col items-center justify-center bg-background p-6 text-center">
        <MessageSquare className="h-24 w-24 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold">Select a chat</h2>
        <p className="text-muted-foreground">Choose a conversation from the list to start messaging.</p>
        <Button className="mt-6" asChild>
             <Link href="/search">
                <PlusCircle className="mr-2 h-4 w-4" /> Start a New Conversation
            </Link>
        </Button>
      </main>
    </div>
  );
}
