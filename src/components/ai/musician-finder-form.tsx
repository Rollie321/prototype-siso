"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Loader2 } from 'lucide-react';
import type { MatchMusiciansInput, MatchMusiciansOutput } from '@/ai/flows/match-musicians';

const formSchema = z.object({
  needs: z.string().min(10, "Please describe your needs in more detail (min 10 characters).").max(500),
  userProfile: z.string().min(20, "Please provide a brief profile (min 20 characters).").max(1000),
  userPosts: z.string().optional().describe("Recent posts or musical interests (optional).").max(1000),
});

type MusicianFinderFormValues = z.infer<typeof formSchema>;

interface MusicianFinderFormProps {
  onFindMatches: (data: MatchMusiciansInput) => Promise<void>;
  isLoading: boolean;
}

export function MusicianFinderForm({ onFindMatches, isLoading }: MusicianFinderFormProps) {
  const form = useForm<MusicianFinderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: "",
      userProfile: "",
      userPosts: "",
    },
  });

  const onSubmit: SubmitHandler<MusicianFinderFormValues> = async (data) => {
    await onFindMatches(data);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" /> AI Musician Finder
        </CardTitle>
        <CardDescription>
          Let our AI help you find the perfect musical collaborators based on your needs, profile, and recent activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you looking for?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Drummer for a rock band, vocalist for jazz ensemble" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Musical Profile</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe your skills, experience, influences, and what you bring to a collaboration."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userPosts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recent Musical Interests/Posts (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Copy-paste any recent posts or describe current musical projects/interests that might help find a match."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Find Matches
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
