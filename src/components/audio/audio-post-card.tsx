import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AudioPost } from '@/lib/placeholder-data';
import { PlayCircle, MessageSquare, ThumbsUp, Share2, Music2 } from 'lucide-react';

interface AudioPostCardProps {
  post: AudioPost;
}

export function AudioPostCard({ post }: AudioPostCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={post.coverImage}
          alt={`${post.title} cover art`}
          width={500}
          height={280} /* approx 16:9 */
          className="w-full h-auto aspect-[16/9] object-cover"
          data-ai-hint="album art music"
        />
        <Button variant="ghost" size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-black/50 hover:bg-black/70 text-white rounded-full">
          <PlayCircle className="h-10 w-10" />
          <span className="sr-only">Play</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/profile/${post.artistId}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.artistImage} alt={post.artist} data-ai-hint="user avatar" />
              <AvatarFallback>{post.artist.substring(0,1)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <CardTitle className="text-lg font-headline hover:underline">
              <Link href={`/audio/${post.id}`}>{post.title}</Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              By <Link href={`/profile/${post.artistId}`} className="hover:underline font-medium">{post.artist}</Link> - {post.timestamp}
            </p>
          </div>
        </div>
        <CardDescription className="text-sm text-foreground line-clamp-2 mb-2">{post.description}</CardDescription>
        <Badge variant="secondary" className="text-xs"><Music2 className="h-3 w-3 mr-1" />{post.genre}</Badge>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-4 w-4 mr-1.5" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <MessageSquare className="h-4 w-4 mr-1.5" /> {post.commentsCount}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Share2 className="h-4 w-4 mr-1.5" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
