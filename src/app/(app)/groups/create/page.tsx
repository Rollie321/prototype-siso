"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGroupPage() {
  const router = useRouter();
  const [lookingForRoles, setLookingForRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState("");

  const handleAddRole = () => {
    if (currentRole.trim() !== "" && !lookingForRoles.includes(currentRole.trim())) {
      setLookingForRoles([...lookingForRoles, currentRole.trim()]);
      setCurrentRole("");
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setLookingForRoles(lookingForRoles.filter(role => role !== roleToRemove));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Group creation submitted");
    // Typically, you would send data to a server action
    // For now, redirect to groups page
    router.push("/groups"); 
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Create New Group / Band</CardTitle>
          <CardDescription>Start your next musical collaboration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input id="groupName" placeholder="e.g., The Cosmic Keys" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" placeholder="e.g., Psychedelic Rock, Hip Hop" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={5} placeholder="Tell us about your group, your sound, and what you're aiming for." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupImage">Group Image / Banner</Label>
              <div className="flex items-center gap-4">
                 {/* Placeholder for image preview */}
                <div className="h-20 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">Preview</div>
                <Button type="button" variant="outline">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
                </Button>
              </div>
              <Input id="groupImage" type="file" className="hidden" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lookingFor">Looking For (Roles - optional)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="lookingFor" 
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g., Drummer, Vocalist" 
                />
                <Button type="button" onClick={handleAddRole}>Add Role</Button>
              </div>
              {lookingForRoles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {lookingForRoles.map(role => (
                    <span key={role} className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground">
                      {role}
                      <Button type="button" variant="ghost" size="icon" className="h-4 w-4 text-accent-foreground hover:bg-accent/80" onClick={() => handleRemoveRole(role)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </span>
                  ))}
                </div>
              )}
            </div>


            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Create Group
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
