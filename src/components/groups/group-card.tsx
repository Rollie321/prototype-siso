import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Group } from '@/lib/placeholder-data';
import { Users, Music, PlusCircle } from 'lucide-react';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={group.image}
          alt={group.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
          data-ai-hint="band photo music group"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">{group.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Music className="h-4 w-4 mr-1.5" /> {group.genre}
          <span className="mx-2">|</span>
          <Users className="h-4 w-4 mr-1.5" /> {group.membersCount} Members
        </div>
        <CardDescription className="text-sm text-foreground line-clamp-3 mb-3">{group.description}</CardDescription>
        
        {group.lookingFor && group.lookingFor.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">Looking for:</h4>
            <div className="flex flex-wrap gap-1">
              {group.lookingFor.map((role) => (
                <Badge key={role} variant="outline" className="text-xs border-accent/50 text-accent">{role}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 pb-6 border-t pt-4 mt-auto">
        <Button variant="default" size="sm" asChild className="w-full">
          <Link href={`/groups/${group.id}`}>View Group</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
