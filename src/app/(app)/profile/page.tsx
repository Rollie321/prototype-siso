
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit3, Music, MapPin, Users as UsersIcon, Guitar, Mic2, Settings2, Link as LinkIcon, Youtube, ListMusic, UploadCloud, PlayCircle, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { UploadAudioDialog } from "@/components/profile/upload-audio-dialog";
import { collection, query, where, getDocs, orderBy, Timestamp, type DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from 'date-fns';


interface UploadedItem extends DocumentData { // Renamed from AudioPost for generality, though still audio for now
  id: string;
  userId: string;
  title: string;
  audioUrl: string; // This is the Supabase reference
  supabasePath: string;
  fileName: string;
  fileType: string;
  createdAt: Timestamp; 
}

export default function ProfilePage() {
  const { currentUser, sisoUser, loading: authLoading } = useAuthContext();
  const { toast } = useToast();
  const [isUploadAudioDialogOpen, setIsUploadAudioDialogOpen] = useState(false);
  const [userUploads, setUserUploads] = useState<UploadedItem[]>([]); // Renamed state
  const [uploadsLoading, setUploadsLoading] = useState(true); // Renamed state

  const displayName = sisoUser?.fullName || sisoUser?.username || currentUser?.displayName || "User";
  const location = sisoUser?.location || "Unknown location";
  const bio = sisoUser?.bio || "No bio available.";
  const skills = sisoUser?.skills || [];
  const experience = sisoUser?.experience || "No experience listed.";
  const influences = sisoUser?.influences || [];
  const genres = sisoUser?.genres || [];
  const profileImage = currentUser?.photoURL || `https://placehold.co/150x150.png?text=${(sisoUser?.username || displayName).substring(0,2)}`;
  const spotifyLink = sisoUser?.spotifyLink;
  const youtubeLink = sisoUser?.youtubeLink;

  const fetchUserUploads = useCallback(async () => { // Renamed function
    if (!currentUser?.uid) return;
    setUploadsLoading(true);
    try {
      const q = query(
        collection(db, "Siso_uploads"), // Changed collection name
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UploadedItem));
      setUserUploads(posts);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not fetch your uploads." });
    } finally {
      setUploadsLoading(false);
    }
  }, [currentUser?.uid, toast]);

  useEffect(() => {
    if (currentUser) {
      fetchUserUploads();
    }
  }, [currentUser, fetchUserUploads]);

  const handleUploadSuccess = () => {
    fetchUserUploads(); 
  };


  if (authLoading) {
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
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!currentUser) {
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
  
  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={profileImage} alt={displayName} data-ai-hint="musician portrait" />
            <AvatarFallback>{(sisoUser?.username || displayName).substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{displayName}</h1>
            { (sisoUser?.username && sisoUser.username !== displayName) && <p className="text-sm text-muted-foreground">@{sisoUser.username}</p>}
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" /> {location}
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
              <p className="text-foreground whitespace-pre-line">{bio}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><ListMusic className="h-5 w-5 text-primary" />Genres</CardTitle>
            </CardHeader>
            <CardContent>
              {genres.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre: string) => (
                    <span key={genre} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{genre}</span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No genres listed yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Guitar className="h-5 w-5 text-primary" />Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">Skills:</h3>
                {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                    {skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{skill}</span>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground mt-1">No skills listed yet.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold">Experience:</h3>
                <p className="text-foreground whitespace-pre-line">{experience || "No experience detailed."}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Mic2 className="h-5 w-5 text-primary" />Musical Influences</CardTitle>
            </CardHeader>
            <CardContent>
              {influences.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {influences.map((influence: string) => (
                    <span key={influence} className="px-3 py-1 text-sm rounded-full border border-primary text-primary">{influence}</span>
                  ))}
                </div>
              ) : (
                 <p className="text-sm text-muted-foreground">No influences listed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" />My Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">You are not part of any groups yet.</p>
              <Button className="w-full" asChild>
                <Link href="/groups/create">Create a Group</Link>
              </Button>
            </CardContent>
          </Card>

          {(spotifyLink || youtubeLink) && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><LinkIcon className="h-5 w-5 text-primary" /> External Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {spotifyLink && (
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
                      <ListMusic className="mr-2 h-4 w-4" /> Spotify
                    </a>
                  </Button>
                )}
                {youtubeLink && (
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 h-4 w-4" /> YouTube
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">My Shared Audio</CardTitle>
            <CardDescription>Tracks and ideas you&apos;ve shared on Siso.</CardDescription>
          </div>
          <Button onClick={() => setIsUploadAudioDialogOpen(true)}>
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Audio
          </Button>
        </CardHeader>
        <CardContent>
          {uploadsLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Loading your audio...</p>
            </div>
          )}
          {!uploadsLoading && userUploads.length === 0 && (
            <div className="text-center py-10 border rounded-lg">
              <Music className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-xl font-semibold">No Audio Shared Yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Click "Upload Audio" to share your first track!
              </p>
            </div>
          )}
          {!uploadsLoading && userUploads.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {userUploads.map(upload => (
                <Card key={upload.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-muted aspect-video flex items-center justify-center">
                     <Music className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate" title={upload.title}>{upload.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Uploaded {upload.createdAt ? formatDistanceToNow(upload.createdAt.toDate(), { addSuffix: true }) : 'recently'}
                    </p>
                    <audio controls className="w-full mt-2 h-10" src={upload.audioUrl}>
                        Your browser does not support the audio element.
                         <a href={upload.audioUrl} download={upload.fileName}>Download audio</a>
                    </audio>
                    <div className="mt-2 flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                            <a href={upload.audioUrl} target="_blank" rel="noopener noreferrer">
                                <PlayCircle className="mr-1 h-4 w-4" /> Play
                            </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <a href={upload.audioUrl} download={upload.fileName}>
                                <Download className="mr-1 h-4 w-4" /> Download
                            </a>
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    <UploadAudioDialog 
        isOpen={isUploadAudioDialogOpen} 
        onOpenChange={setIsUploadAudioDialogOpen}
        onUploadSuccess={handleUploadSuccess}
    />
    </>
  );
}
