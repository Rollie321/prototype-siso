
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Changed from updateDoc, removed getDoc and serverTimestamp for simplicity here

export async function updateUsernameInFirestore(userId: string, newUsername: string): Promise<{ success: boolean; error?: string }> {
  if (!userId) {
    return { success: false, error: "User ID is required." };
  }
  if (!newUsername || newUsername.trim().length < 3) {
    return { success: false, error: "Username must be at least 3 characters long." };
  }

  try {
    const userDocRef = doc(db, "Siso_users", userId);

    // Using setDoc with merge: true ensures that the document is created if it doesn't exist,
    // and if it does exist, only the specified fields are updated, preserving other existing fields.
    // For this action, we are primarily concerned with setting/updating the username.
    await setDoc(userDocRef, {
      username: newUsername,
      // You could also add/update a 'lastUpdatedAt: serverTimestamp()' field here if needed.
    }, { merge: true });

    // Update Firebase Auth display name if current user matches userId
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { displayName: newUsername });
    } else if (auth.currentUser && auth.currentUser.uid !== userId) {
        console.warn(`User ${auth.currentUser.uid} is attempting to update username for ${userId}, but Firebase Auth displayName will not be updated for ${userId} by this action.`);
    } else if (!auth.currentUser) {
        console.warn("No Firebase Auth currentUser found. DisplayName not updated.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating username:", error);
    return { success: false, error: error.message || "Failed to update username." };
  }
}

