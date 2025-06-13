
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
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
      updatedAt: new Date().toISOString(),
    };

    await setDoc(userDocRef, dataToSave, { merge: true });

    if (data.fullName && auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { displayName: data.fullName });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return { success: false, error: error.message || "Failed to update profile." };
  }
}

export interface AudioPostMetadata {
  userId: string;
  title: string;
  audioUrl: string;
  supabasePath: string;
  fileName: string;
  fileType: string;
  createdAt: any; // Will be Firestore serverTimestamp
}

export async function saveAudioPostMetadata(
  metadata: Omit<AudioPostMetadata, 'createdAt'>
): Promise<{ success: boolean; error?: string; id?: string }> {
  if (!metadata.userId || !metadata.title || !metadata.audioUrl || !metadata.supabasePath) {
    return { success: false, error: "Missing required audio metadata." };
  }

  try {
    const audioPostsCollectionRef = collection(db, "Siso_audio_posts");
    const docRef = await addDoc(audioPostsCollectionRef, {
      ...metadata,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving audio post metadata:", error);
    return { success: false, error: error.message || "Failed to save audio metadata." };
  }
}
