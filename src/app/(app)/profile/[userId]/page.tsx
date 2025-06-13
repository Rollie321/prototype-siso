import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { placeholderMusicians, type Musician } from "@/lib/placeholder-data";
import { Music, MapPin, Users as UsersIcon, Guitar, Mic2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Helper function to get musician data (replace with actual data fetching)
async function getMusicianData(userId: string): Promise<Musician | null> {
  return placeholderMusicians.find(m => m.id === userId) || null;
}

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  const musician = await getMusicianData(params.userId);

  if (!musician) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Musician Not Found</h1>
        <p className="text-muted-foreground">Sorry, we couldn&apos;t find a profile for this user.</p>
        <Button asChild className="mt-4">
          <Link href="/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-primary/50">
            <AvatarImage src={musician.profileImage} alt={musician.name} data-ai-hint="musician portrait" />
            <AvatarFallback>{musician.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{musician.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {musician.location}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/messages/new?userId=${musician.id}`}> {/* Placeholder for new message */}
            <MessageCircle className="mr-2 h-4 w-4" /> Message {musician.name.split(' ')[0]}
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Music className="h-5 w-5 text-primary" /> About {musician.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-line">{musician.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Guitar className="h-5 w-5 text-primary" />Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">Skills:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {musician.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Experience:</h3>
                <p className="text-foreground">{musician.experience}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Mic2 className="h-5 w-5 text-primary" />Musical Influences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {musician.influences.map(influence => (
                  <span key={influence} className="px-3 py-1 text-sm rounded-full border border-primary text-primary">{influence}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" />{musician.name.split(' ')[0]}&apos;s Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Placeholder for user's groups */}
              <p className="text-sm text-muted-foreground">{musician.name.split(' ')[0]} is not part of any public groups yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{musician.name.split(' ')[0]}&apos;s Shared Audio</CardTitle>
          <CardDescription>Tracks and ideas shared by {musician.name}.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for user's audio posts - filter placeholderAudioPosts by artistId */}
          {[1,2].map(i => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Image src={`https://placehold.co/300x180.png`} data-ai-hint="album art music" alt={`Track ${i}`} width={300} height={180} className="w-full aspect-[5/3] object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold">Track Title {i}</h3>
                <p className="text-sm text-muted-foreground">Shared 2 days ago</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-1">View Post</Button>
              </CardContent>
            </Card>
          ))}
          <p className="text-sm text-muted-foreground col-span-full text-center p-4">{musician.name.split(' ')[0]} has not shared any audio yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
