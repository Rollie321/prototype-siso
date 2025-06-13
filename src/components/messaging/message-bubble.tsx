import type { Message } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  contactImage?: string;
  contactName?: string;
}

export function MessageBubble({ message, isCurrentUser, contactImage, contactName }: MessageBubbleProps) {
  return (
    <div className={cn("flex items-end gap-2", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={contactImage} alt={contactName} data-ai-hint="user avatar" />
          <AvatarFallback>{contactName?.substring(0,1) || 'U'}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-xl px-4 py-2.5 shadow",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left")}>
          {message.timestamp}
        </p>
      </div>
       {isCurrentUser && (
        <Avatar className="h-8 w-8">
          {/* Current user avatar, can be dynamic if needed */}
          <AvatarImage src="https://placehold.co/50x50.png?text=Me" alt="My Avatar" data-ai-hint="user avatar" />
          <AvatarFallback>Me</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
