
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export async function updateUsernameInFirestore(userId: string, newUsername: string): Promise<{ success: boolean; error?: string }> {
  if (!userId) {
    return { success: false, error: "User ID is required." };
  }
  if (!newUsername || newUsername.trim().length < 3) {
    return { success: false, error: "Username must be at least 3 characters long." };
  }

  try {
    // Update Firestore document
    const userDocRef = doc(db, "Siso_users", userId);
    await updateDoc(userDocRef, {
      username: newUsername,
    });

    // Update Firebase Auth display name if current user matches userId
    // This part requires careful handling of auth state on the server or trusting the client to send its own UID.
    // For direct server-side Firebase Admin SDK, you'd verify the user.
    // With client SDK in server action, it relies on the client being authenticated.
    // A more robust solution would use Firebase Admin SDK or pass an ID token for verification.
    // For simplicity here, if this action is called by an authenticated user for themselves:
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { displayName: newUsername });
    } else {
      // If trying to update another user or auth state mismatch, this might be an issue.
      // For this app, we assume user edits their own profile.
      console.warn("Firebase Auth displayName not updated as current user does not match target userId or no current user.")
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating username:", error);
    return { success: false, error: error.message || "Failed to update username." };
  }
}
