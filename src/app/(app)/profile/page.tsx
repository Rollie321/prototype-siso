
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { placeholderMusicians } from "@/lib/placeholder-data"; // Keep for structure, but data will come from auth
import { Edit3, Music, MapPin, Users as UsersIcon, Guitar, Mic2, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { currentUser, sisoUser, loading } = useAuthContext();

  // Data to display, prioritize sisoUser, then currentUser, then fallbacks
  const displayName = sisoUser?.username || currentUser?.displayName || "User";
  const location = sisoUser?.location || "Unknown location";
  const bio = sisoUser?.bio || "No bio available.";
  const skills = sisoUser?.skills || [];
  const experience = sisoUser?.experience || "No experience listed.";
  const influences = sisoUser?.influences || [];
  const profileImage = currentUser?.photoURL || `https://placehold.co/150x150.png?text=${displayName.substring(0,2)}`;


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Separator />
        {/* Add more skeletons for cards as needed */}
      </div>
    );
  }

  if (!currentUser) {
     // This should be caught by AppLayout, but as a fallback:
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Please log in</h1>
        <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }
  
  // For now, placeholder data for skills, influences etc. if not in sisoUser
  // These would ideally come from Firestore `Siso_users` document.
  const currentMusicianData = placeholderMusicians[0]; // Use as a fallback for now for structure

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={profileImage} alt={displayName} data-ai-hint="musician portrait" />
            <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{displayName}</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {location || currentMusicianData.location}
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/profile/edit">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Music className="h-5 w-5 text-primary" /> About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-line">{bio || currentMusicianData.bio}</p>
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
                  {(skills.length > 0 ? skills : currentMusicianData.skills).map((skill: string) => (
                    <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Experience:</h3>
                <p className="text-foreground">{experience || currentMusicianData.experience}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Mic2 className="h-5 w-5 text-primary" />Musical Influences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(influences.length > 0 ? influences : currentMusicianData.influences).map((influence: string) => (
                  <span key={influence} className="px-3 py-1 text-sm rounded-full border border-primary text-primary">{influence}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" />My Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Placeholder for user's groups */}
              <p className="text-sm text-muted-foreground">You are not part of any groups yet.</p>
              <Button className="w-full" asChild>
                <Link href="/groups/create">Create a Group</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Settings2 className="h-5 w-5 text-primary" />Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">Go to Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Shared Audio</CardTitle>
          <CardDescription>Tracks and ideas you&apos;ve shared on Siso.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for user's audio posts */}
          {[1,2,3].map(i => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Image src={`https://placehold.co/300x180.png`} data-ai-hint="album art music" alt={`Track ${i}`} width={300} height={180} className="w-full aspect-[5/3] object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold">My Track Title {i}</h3>
                <p className="text-sm text-muted-foreground">Shared 2 days ago</p>
                 <Button variant="link" size="sm" className="p-0 h-auto mt-1">View Post</Button>
              </CardContent>
            </Card>
          ))}
           <p className="text-sm text-muted-foreground col-span-full text-center p-4">No audio shared yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
