
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { SisoUser } from "@/contexts/auth-context";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { b2S3Client, B2_BUCKET_NAME } from "@/lib/backblazeClient";

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

export interface UploadMetadataInput { // Renamed from UploadMetadata for clarity with Firestore type
  userId: string;
  title: string;
  fileUrl: string; // Public URL of the file (e.g., on Backblaze B2)
  storagePath: string; // Path within the storage service (e.g., public/userId/filename.ext)
  fileName: string;
  fileType: string;
}

export async function saveUploadMetadata(
  metadata: UploadMetadataInput
): Promise<{ success: boolean; error?: string; id?: string }> {
  if (!metadata.userId || !metadata.title || !metadata.fileUrl || !metadata.storagePath) {
    return { success: false, error: "Missing required upload metadata." };
  }

  try {
    const uploadsCollectionRef = collection(db, "Siso_uploads");
    const docRef = await addDoc(uploadsCollectionRef, {
      ...metadata,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving upload metadata:", error);
    return { success: false, error: error.message || "Failed to save upload metadata." };
  }
}

export async function generatePresignedUploadUrlB2(
  originalFileName: string,
  fileType: string,
  userId: string
): Promise<{ success: boolean; uploadUrl?: string; filePath?: string; error?: string }> {
  if (!userId) {
    return { success: false, error: "User ID is required to generate upload URL." };
  }
  if (!B2_BUCKET_NAME) {
    return { success: false, error: "Backblaze B2 bucket name is not configured." };
  }

  // Sanitize filename and create a unique path
  const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;
  const filePath = `public/${userId}/${uniqueFileName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: B2_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
      // ACL: 'public-read', // If you want to make files public immediately. B2 might handle this via bucket settings.
    });

    const uploadUrl = await getSignedUrl(b2S3Client, command, { expiresIn: 300 }); // URL expires in 5 minutes

    return { success: true, uploadUrl, filePath };
  } catch (error: any) {
    console.error("Error generating pre-signed URL for B2:", error);
    return { success: false, error: error.message || "Failed to generate upload URL." };
  }
}
