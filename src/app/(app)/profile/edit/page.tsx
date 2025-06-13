
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, UploadCloud, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useState, useEffect } from "react";
import type { UpdateUserProfileData } from "./actions";
import { updateUserProfile } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProfilePage() {
  const router = useRouter();
  const { currentUser, sisoUser, loading: authLoading } = useAuthContext();
  const { toast } = useToast();

  const [formData, setFormData] = useState<UpdateUserProfileData>({
    fullName: '',
    location: '',
    bio: '',
    genres: '',
    skills: '',
    experience: '',
    influences: '',
    spotifyLink: '',
    youtubeLink: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sisoUser) {
      setFormData({
        fullName: sisoUser.fullName || sisoUser.username || currentUser?.displayName || '',
        location: sisoUser.location || '',
        bio: sisoUser.bio || '',
        genres: (sisoUser.genres || []).join(', '),
        skills: (sisoUser.skills || []).join(', '),
        experience: sisoUser.experience || '',
        influences: (sisoUser.influences || []).join(', '),
        spotifyLink: sisoUser.spotifyLink || '',
        youtubeLink: sisoUser.youtubeLink || '',
      });
    } else if (currentUser && !sisoUser && !authLoading) {
      // Fallback if sisoUser is not yet populated but auth user exists
       setFormData(prev => ({...prev, fullName: currentUser.displayName || ''}));
    }
  }, [sisoUser, currentUser, authLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser?.uid) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in to update your profile." });
      return;
    }
    setIsLoading(true);
    const result = await updateUserProfile(currentUser.uid, formData);
    setIsLoading(false);

    if (result.success) {
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
      router.push("/profile");
    } else {
      toast({ variant: "destructive", title: "Update Failed", description: result.error || "Could not update profile." });
    }
  };
  
  if (authLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Edit Your Profile</CardTitle>
          <CardDescription>Keep your musical identity up-to-date.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="flex items-center gap-4">
                <img src={currentUser?.photoURL || `https://placehold.co/100x100.png?text=${(sisoUser?.username || 'U').substring(0,2)}`} alt="Current profile" className="h-20 w-20 rounded-full object-cover" data-ai-hint="user avatar" />
                <Button type="button" variant="outline" disabled> 
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload New Image (Soon)
                </Button>
              </div>
              {/* <Input id="profileImage" type="file" className="hidden" /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g., New York, NY" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea id="bio" value={formData.bio} onChange={handleChange} rows={5} placeholder="Tell us about yourself, your music, and what you're looking for." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genres">Genres (comma-separated)</Label>
              <Input id="genres" value={formData.genres} onChange={handleChange} placeholder="e.g., Indie Rock, Alternative, Pop" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Guitar, Vocals, Songwriting, Drums" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea id="experience" value={formData.experience} onChange={handleChange} rows={3} placeholder="Describe your musical experience." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="influences">Musical Influences (comma-separated)</Label>
              <Input id="influences" value={formData.influences} onChange={handleChange} placeholder="e.g., The Beatles, Radiohead, Kendrick Lamar" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spotifyLink">Spotify Link (Optional)</Label>
              <Input id="spotifyLink" value={formData.spotifyLink} onChange={handleChange} placeholder="https://open.spotify.com/artist/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeLink">YouTube Link (Optional)</Label>
              <Input id="youtubeLink" value={formData.youtubeLink} onChange={handleChange} placeholder="https://youtube.com/channel/..." />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
