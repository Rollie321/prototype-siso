
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase, AUDIO_BUCKET_NAME } from "@/lib/supabase";
import { saveUploadMetadata } from "@/app/(app)/profile/actions"; // Updated import if function name changed
import { Loader2, UploadCloud } from "lucide-react";

interface UploadAudioDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: () => void; // Callback to refresh audio list
}

export function UploadAudioDialog({ isOpen, onOpenChange, onUploadSuccess }: UploadAudioDialogProps) {
  const { currentUser } = useAuthContext();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNameDisplay, setFileNameDisplay] = useState<string | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(selectedFile.type)) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select an MP3, WAV, or OGG file.",
        });
        setFile(null);
        setFileNameDisplay(null);
        e.target.value = ""; // Reset file input
        return;
      }
      if (selectedFile.size > 20 * 1024 * 1024) { // 20MB limit
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please select a file smaller than 20MB.",
        });
        setFile(null);
        setFileNameDisplay(null);
        e.target.value = ""; // Reset file input
        return;
      }
      setFile(selectedFile);
      setFileNameDisplay(selectedFile.name);
    } else {
      setFile(null);
      setFileNameDisplay(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser?.uid) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in." });
      return;
    }
    if (!file) {
      toast({ variant: "destructive", title: "No File", description: "Please select an audio file to upload." });
      return;
    }
    if (!title.trim()) {
      toast({ variant: "destructive", title: "No Title", description: "Please enter a title for your audio." });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const supabaseFileName = `${Date.now()}.${fileExt}`;
      // The path includes the Firebase currentUser.uid, associating the file with the user.
      const supabasePath = `public/${currentUser.uid}/${supabaseFileName}`; 

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(AUDIO_BUCKET_NAME)
        .upload(supabasePath, file, {
          cacheControl: '3600',
          upsert: false, 
        });

      if (uploadError) {
        throw new Error(`Supabase upload error: ${uploadError.message}`);
      }
      
      if (!uploadData?.path) {
        throw new Error("Supabase upload returned no path.");
      }

      // 2. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from(AUDIO_BUCKET_NAME)
        .getPublicUrl(uploadData.path);

      if (!publicUrlData?.publicUrl) {
        throw new Error("Could not get public URL from Supabase.");
      }
      
      const audioUrl = publicUrlData.publicUrl;

      // 3. Save metadata to Firestore
      const metadata = {
        userId: currentUser.uid,
        title: title.trim(),
        audioUrl: audioUrl,
        supabasePath: uploadData.path,
        fileName: file.name,
        fileType: file.type,
      };

      const saveResult = await saveUploadMetadata(metadata); // Using the updated function name implicitly

      if (!saveResult.success) {
        throw new Error(saveResult.error || "Failed to save upload metadata.");
      }

      toast({ title: "Upload Successful!", description: `"${title}" has been shared.` });
      onUploadSuccess(); 
      onOpenChange(false); 
      setTitle("");
      setFile(null);
      setFileNameDisplay(null);

    } catch (error: any) {
      console.error("Upload failed:", error);
      toast({ variant: "destructive", title: "Upload Failed", description: error.message || "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isLoading) { // Prevent closing while loading
        onOpenChange(open);
        if (!open) { // Reset form if dialog is closed
          setTitle("");
          setFile(null);
          setFileNameDisplay(null);
        }
      }
    }}>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload New Audio</DialogTitle>
            <DialogDescription>
              Share your track, demo, or song idea. Provide a title and select your audio file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Your track title"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="audioFile-input" className="text-right">
                Audio File
              </Label>
              <div className="col-span-3">
                 <label
                  htmlFor="audioFile-input"
                  className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg ${isLoading ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer bg-card hover:bg-muted/50'}`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                    {fileNameDisplay ? (
                       <p className="text-sm text-foreground font-medium truncate max-w-full px-2">{fileNameDisplay}</p>
                    ) : (
                      <>
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-xs text-muted-foreground">MP3, WAV, OGG (MAX. 20MB)</p>
                      </>
                    )}
                  </div>
                  <Input 
                    id="audioFile-input" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept=".mp3,.wav,.ogg,audio/mpeg,audio/wav,audio/ogg" 
                    required 
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
              {isLoading ? "Uploading..." : "Upload & Share"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
