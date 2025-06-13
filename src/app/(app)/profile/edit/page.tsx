"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { placeholderMusicians } from "@/lib/placeholder-data";
import { Save, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation"; // Changed from "next/navigation"

// Assume current user is the first placeholder musician
const currentUser = placeholderMusicians[0];

export default function EditProfilePage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Profile update submitted");
    // Typically, you would send data to a server action
    // For now, redirect to profile page
    router.push("/profile"); 
  };

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
                <img src={currentUser.profileImage} alt="Current profile" className="h-20 w-20 rounded-full object-cover" data-ai-hint="user avatar" />
                <Button type="button" variant="outline">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload New Image
                </Button>
              </div>
              <Input id="profileImage" type="file" className="hidden" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={currentUser.location} placeholder="e.g., New York, NY" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / About Me</Label>
              <Textarea id="bio" defaultValue={currentUser.bio} rows={5} placeholder="Tell us about yourself, your music, and what you're looking for." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genres">Genres (comma-separated)</Label>
              <Input id="genres" defaultValue={currentUser.genres.join(", ")} placeholder="e.g., Indie Rock, Alternative, Pop" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input id="skills" defaultValue={currentUser.skills.join(", ")} placeholder="e.g., Guitar, Vocals, Songwriting, Drums" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea id="experience" defaultValue={currentUser.experience} rows={3} placeholder="Describe your musical experience." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="influences">Musical Influences (comma-separated)</Label>
              <Input id="influences" defaultValue={currentUser.influences.join(", ")} placeholder="e.g., The Beatles, Radiohead, Kendrick Lamar" />
            </div>
            
            {/* Placeholder for links (Spotify, YouTube, etc.) */}
            <div className="space-y-2">
              <Label htmlFor="spotifyLink">Spotify Link (Optional)</Label>
              <Input id="spotifyLink" placeholder="https://open.spotify.com/artist/..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeLink">YouTube Link (Optional)</Label>
              <Input id="youtubeLink" placeholder="https://youtube.com/channel/..." />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
