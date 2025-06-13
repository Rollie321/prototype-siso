
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { SisoUser } from "@/contexts/auth-context";

export type UpdateUserProfileData = {
  fullName?: string;
  location?: string;
  bio?: string;
  genres?: string; // Comma-separated string from form
  skills?: string; // Comma-separated string from form
  experience?: string;
  influences?: string; // Comma-separated string from form
  spotifyLink?: string;
  youtubeLink?: string;
};

export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<{ success: boolean; error?: string }> {
  if (!userId) {
    return { success: false, error: "User ID is required." };
  }

  try {
    const userDocRef = doc(db, "Siso_users", userId);

    // Prepare data for Firestore, converting comma-separated strings to arrays
    const dataToSave: Partial<SisoUser> = {
      ...(data.fullName && { fullName: data.fullName }),
      ...(data.location && { location: data.location }),
      ...(data.bio && { bio: data.bio }),
      ...(data.experience && { experience: data.experience }),
      ...(data.spotifyLink && { spotifyLink: data.spotifyLink }),
      ...(data.youtubeLink && { youtubeLink: data.youtubeLink }),
      ...(data.genres && { genres: data.genres.split(',').map(g => g.trim()).filter(g => g) }),
      ...(data.skills && { skills: data.skills.split(',').map(s => s.trim()).filter(s => s) }),
      ...(data.influences && { influences: data.influences.split(',').map(i => i.trim()).filter(i => i) }),
      updatedAt: new Date().toISOString(), // Add an updated timestamp
    };

    await setDoc(userDocRef, dataToSave, { merge: true });

    // Update Firebase Auth display name if fullName is part of the update
    if (data.fullName && auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { displayName: data.fullName });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message || "Failed to update profile." };
  }
}
