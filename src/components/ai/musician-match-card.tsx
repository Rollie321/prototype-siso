import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { MatchMusiciansOutput } from '@/ai/flows/match-musicians';
import { UserCheck, MessageSquare, Info } from 'lucide-react';
import Link from 'next/link';

interface MusicianMatchCardProps {
  match: MatchMusiciansOutput['musicianMatches'][0];
}

export function MusicianMatchCard({ match }: MusicianMatchCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4 bg-muted/30">
        <Avatar className="h-16 w-16 border">
          {/* For AI matches, we might not have an image URL, so fallback is important */}
          <AvatarImage src={`https://placehold.co/100x100.png?text=${match.name.substring(0,2)}`} alt={match.name} data-ai-hint="musician portrait"/>
          <AvatarFallback>{match.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg font-headline">{match.name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Contact: {match.contactInfo}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center gap-1.5 text-primary">
            <UserCheck className="h-4 w-4" /> Profile Summary
          </h4>
          <p className="text-sm text-foreground">{match.profileSummary}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1 flex items-center gap-1.5 text-accent">
            <Info className="h-4 w-4" /> Why it&apos;s a Match
          </h4>
          <p className="text-sm text-foreground">{match.matchReason}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button size="sm" asChild className="w-full">
          {/* This link might need to be dynamic or go to a generic contact page if contactInfo is an email/phone */}
          <Link href={`/messages/new?contact=${encodeURIComponent(match.name)}`}> 
            <MessageSquare className="mr-2 h-4 w-4" /> Contact {match.name.split(' ')[0]}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
