import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Musician } from '@/lib/placeholder-data';
import { MapPin, Guitar, MessageCircle } from 'lucide-react';

interface MusicianCardProps {
  musician: Musician;
}

export function MusicianCard({ musician }: MusicianCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        {/* Placeholder for a background image or banner */}
        <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="absolute top-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-card shadow-md">
            <AvatarImage src={musician.profileImage} alt={musician.name} data-ai-hint="musician portrait" />
            <AvatarFallback>{musician.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-16 px-6 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">{musician.name}</CardTitle>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
          <MapPin className="h-4 w-4" /> {musician.location}
        </p>
        <p className="text-sm text-foreground line-clamp-3 mb-3">{musician.bio.length > 100 ? musician.bio.substring(0,100) + "..." : musician.bio}</p>
        
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Genres:</h4>
          <div className="flex flex-wrap gap-1">
            {musician.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">{genre}</Badge>
            ))}
            {musician.genres.length > 3 && <Badge variant="secondary" className="text-xs">+{musician.genres.length - 3} more</Badge>}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {musician.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs border-primary/50 text-primary/80">{skill}</Badge>
            ))}
             {musician.skills.length > 3 && <Badge variant="outline" className="text-xs border-primary/50 text-primary/80">+{musician.skills.length - 3} more</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 border-t pt-4 mt-auto">
        <div className="flex w-full justify-between gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/profile/${musician.id}`}>View Profile</Link>
          </Button>
          <Button size="sm" asChild className="flex-1">
            <Link href={`/messages/new?userId=${musician.id}`}>
              <MessageCircle className="mr-2 h-4 w-4" /> Message
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
