import { Button } from "@/components/ui/button";
import { AudioPostCard } from "@/components/audio/audio-post-card";
import { placeholderAudioPosts } from "@/lib/placeholder-data";
import { PlusCircle, TrendingUp, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function AudioFeedPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-headline font-semibold">Audio Feed</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/feed/upload">
            <PlusCircle className="mr-2 h-4 w-4" /> Share Audio
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 border-b pb-4">
        <Button variant="ghost" className="font-semibold text-primary border-b-2 border-primary rounded-none">For You</Button>
        <Button variant="ghost" className="text-muted-foreground">Following</Button>
        <Button variant="ghost" className="text-muted-foreground"><TrendingUp className="mr-2 h-4 w-4" />Trending</Button>
        <Button variant="outline" size="icon" className="ml-auto">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter feed</span>
        </Button>
      </div>
      
      {placeholderAudioPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderAudioPosts.map(post => (
            <AudioPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg">
          <Music2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No Audio Posts Yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to share your music or check back later!
          </p>
          <Button className="mt-6" asChild>
             <Link href="/feed/upload">
                <PlusCircle className="mr-2 h-4 w-4" /> Share Your Music
            </Link>
          </Button>
        </div>
      )}
      
      {/* Placeholder for pagination or infinite scroll */}
      {placeholderAudioPosts.length > 9 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
}
