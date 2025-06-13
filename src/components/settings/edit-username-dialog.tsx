
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/hooks/use-auth-context";
import { updateUsernameInFirestore } from "@/app/(app)/settings/actions"; // Server action

interface EditUsernameDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUsernameDialog({ isOpen, onOpenChange }: EditUsernameDialogProps) {
  const { sisoUser, currentUser } = useAuthContext();
  const [newUsername, setNewUsername] = useState(sisoUser?.username || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!currentUser?.uid) {
      toast({ variant: "destructive", title: "Error", description: "You are not logged in." });
      return;
    }
    if (!newUsername.trim() || newUsername.trim().length < 3) {
      toast({ variant: "destructive", title: "Invalid Username", description: "Username must be at least 3 characters." });
      return;
    }

    setIsLoading(true);
    const result = await updateUsernameInFirestore(currentUser.uid, newUsername.trim());
    setIsLoading(false);

    if (result.success) {
      toast({ title: "Success", description: "Username updated successfully." });
      onOpenChange(false); // Close dialog on success
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error || "Failed to update username." });
    }
  };
  
  // Update local state if sisoUser changes (e.g. after initial load)
  useState(() => {
    if (sisoUser?.username) {
      setNewUsername(sisoUser.username);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sisoUser?.username]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="col-span-3"
              placeholder="Your new username"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
