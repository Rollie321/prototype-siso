import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { MessageThread } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  thread: MessageThread;
  isActive?: boolean;
}

export function ChatListItem({ thread, isActive = false }: ChatListItemProps) {
  return (
    <Link
      href={`/messages/${thread.id}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors",
        isActive && "bg-primary/10"
      )}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={thread.contactImage} alt={thread.contactName} data-ai-hint="user avatar group" />
        <AvatarFallback>{thread.contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className={cn("font-semibold truncate", isActive ? "text-primary" : "text-foreground")}>{thread.contactName}</h3>
          <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate pr-2">{thread.lastMessage}</p>
          {thread.unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground h-5 px-2 text-xs">
              {thread.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
