"use client"; // This page will involve client-side interactions

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/messaging/message-bubble";
import { placeholderMessageThreads, placeholderMessages, type MessageThread, type Message } from "@/lib/placeholder-data";
import { ArrowLeft, Send, Paperclip, Phone, Video, MoreVertical } from "lucide-react";
import Link from "next/link";
import { ChatListItem } from "@/components/messaging/chat-list-item";
import { cn } from '@/lib/utils';

// Helper function to get chat data (replace with actual data fetching)
function getChatData(chatId: string): { thread: MessageThread | undefined, messages: Message[] } {
  const thread = placeholderMessageThreads.find(t => t.id === chatId);
  // Filter messages for this specific chat - in real app, this would be a DB query
  // For this placeholder, we'll just use the generic placeholderMessages for any chat.
  return { thread, messages: placeholderMessages };
}

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const { thread, messages: initialMessages } = getChatData(params.chatId);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  if (!thread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 text-center">
        <h2 className="text-2xl font-semibold">Chat not found</h2>
        <p className="text-muted-foreground">The conversation you are looking for does not exist.</p>
        <Button className="mt-6" asChild>
          <Link href="/messages">Back to Chats</Link>
        </Button>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const msg: Message = {
      id: `msg${messages.length + 1}`,
      senderId: 'currentUser', // Assume current user is sending
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
    // Here you would typically send the message to your backend (Firestore)
  };
  
  const activeChatId = params.chatId;

  return (
    <div className="flex h-[calc(100vh-4rem)] border-t"> {/* Adjust height based on header */}
      <aside className={cn("hidden md:flex md:flex-col md:w-80 lg:w-96 border-r bg-card")}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold font-headline">Chats</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {placeholderMessageThreads.map(t => (
              <ChatListItem key={t.id} thread={t} isActive={t.id === activeChatId} />
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <header className="flex items-center justify-between p-3 border-b bg-card">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/messages">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.contactImage} alt={thread.contactName} data-ai-hint="user avatar group" />
              <AvatarFallback>{thread.contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{thread.contactName}</h2>
              <p className="text-xs text-muted-foreground">Online</p> {/* Placeholder status */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 md:p-6 space-y-4">
          {messages.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.senderId === 'currentUser'}
              contactImage={msg.senderId !== 'currentUser' ? thread.contactImage : undefined}
              contactName={msg.senderId !== 'currentUser' ? thread.contactName : undefined}
            />
          ))}
        </ScrollArea>

        {/* Message Input */}
        <footer className="p-3 border-t bg-card">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </footer>
      </main>
    </div>
  );
}
