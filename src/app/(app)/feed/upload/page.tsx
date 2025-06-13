"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


export default function UploadAudioPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // This would involve uploading the file to Supabase Storage and saving metadata to Firestore.
    console.log("Audio upload submitted");
    
    toast({
      title: "Audio Shared!",
      description: "Your track has been successfully shared to the feed.",
    });
    // For now, redirect to feed page
    router.push("/feed"); 
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Share Your Audio</CardTitle>
          <CardDescription>Upload a track, demo, or song idea to share with the Siso community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Track Title</Label>
              <Input id="title" placeholder="e.g., Midnight Drive (Demo)" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audioFile">Audio File (MP3, WAV)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="audioFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">MP3, WAV, OGG (MAX. 20MB)</p>
                  </div>
                  <Input id="audioFile" type="file" className="hidden" accept=".mp3,.wav,.ogg" required />
                </label>
              </div>
               {/* Placeholder for file name if uploaded */}
               {/* <p className="text-sm text-muted-foreground">Selected file: my_track.mp3</p> */}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image (Optional)</Label>
               <Input id="coverImage" type="file" accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" rows={3} placeholder="Add some details about your track, what inspired it, or what you're looking for feedback on." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Input id="genre" placeholder="e.g., Indie Rock, Electronic" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Visible to everyone)</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="group">Specific Group (Coming Soon)</SelectItem>
                    <SelectItem value="private">Private (Only you)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="mr-2 h-4 w-4" /> Share Audio
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
