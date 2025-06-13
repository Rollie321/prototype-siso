// src/app/(app)/ai-finder/actions.ts
"use server";

import { matchMusicians, type MatchMusiciansInput, type MatchMusiciansOutput } from '@/ai/flows/match-musicians';

export async function findMusicianMatchesAction(input: MatchMusiciansInput): Promise<MatchMusiciansOutput | { error: string }> {
  try {
    // Add any necessary validation or processing before calling the AI flow
    if (!input.needs || !input.userProfile) {
      return { error: "Needs and User Profile fields are required." };
    }

    const result = await matchMusicians(input);
    return result;
  } catch (error) {
    console.error("Error in findMusicianMatchesAction:", error);
    // It's good practice to return a generic error message to the client
    // and log the specific error on the server.
    return { error: "An unexpected error occurred while finding matches. Please try again later." };
  }
}
