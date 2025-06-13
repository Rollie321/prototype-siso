"use client";

import { useState } from 'react';
import { MusicianFinderForm } from '@/components/ai/musician-finder-form';
import { MusicianMatchCard } from '@/components/ai/musician-match-card';
import { findMusicianMatchesAction } from './actions';
import type { MatchMusiciansInput, MatchMusiciansOutput } from '@/ai/flows/match-musicians';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AiFinderPage() {
  const [matches, setMatches] = useState<MatchMusiciansOutput['musicianMatches'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindMatches = async (data: MatchMusiciansInput) => {
    setIsLoading(true);
    setError(null);
    setMatches(null);

    const result = await findMusicianMatchesAction(data);

    if ('error' in result) {
      setError(result.error);
    } else {
      setMatches(result.musicianMatches);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <MusicianFinderForm onFindMatches={handleFindMatches} isLoading={isLoading} />
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
         <div className="text-center py-6">
            <Sparkles className="h-12 w-12 text-primary animate-pulse mx-auto mb-2" />
            <p className="text-muted-foreground">Finding perfect matches for you...</p>
        </div>
      )}

      {matches && matches.length > 0 && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" /> Suggested Matches
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match, index) => (
                    <MusicianMatchCard key={index} match={match} />
                    ))}
                </div>
            </CardContent>
        </Card>
      )}

      {matches && matches.length === 0 && !isLoading && (
        <Card className="mt-8 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-headline">No Matches Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    We couldn&apos;t find any specific matches based on your criteria right now. Try refining your search terms or check back later!
                </p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
