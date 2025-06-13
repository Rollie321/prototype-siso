
"use server";

import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import type { SisoUser } from "@/contexts/auth-context";

// Moved S3Client imports and initialization here as it's server-side only
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME } from "@/lib/backblazeClient"; 


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

export interface UploadMetadataInput {
  userId: string;
  title: string;
  fileUrl: string; 
  storagePath: string; 
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

// Function to initialize B2 S3 client (only on server)
function getB2S3Client() {
  const B2_KEY_ID = process.env.BACKBLAZE_KEY_ID;
  const B2_APPLICATION_KEY = process.env.BACKBLAZE_APPLICATION_KEY;
  const B2_S3_ENDPOINT = process.env.BACKBLAZE_S3_ENDPOINT;

  if (!B2_KEY_ID || !B2_APPLICATION_KEY || !B2_S3_ENDPOINT) {
    throw new Error("Missing Backblaze B2 server-side environment variables for S3 client configuration.");
  }
  
  // Extract region from endpoint if possible, otherwise default or use a known one
  // Example: s3.us-west-000.backblazeb2.com -> us-west-000
  const regionMatch = B2_S3_ENDPOINT.match(/^s3\.([a-zA-Z0-9-]+)\.backblazeb2\.com$/);
  const B2_REGION = regionMatch ? regionMatch[1] : "us-east-1"; // Default to a common region if parse fails

  return new S3Client({
    endpoint: `https://${B2_S3_ENDPOINT}`, // Ensure https
    region: B2_REGION,
    credentials: {
      accessKeyId: B2_KEY_ID,
      secretAccessKey: B2_APPLICATION_KEY,
    },
  });
}


export async function generatePresignedUploadUrlB2(
  originalFileName: string,
  fileType: string,
  userId: string
): Promise<{ success: boolean; uploadUrl?: string; filePath?: string; error?: string }> {
  if (!userId) {
    return { success: false, error: "User ID is required to generate upload URL." };
  }
  if (!NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME) { 
    return { success: false, error: "Backblaze B2 bucket name is not configured (NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME)." };
  }

  const b2S3Client = getB2S3Client(); 

  const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueFileName = `${Date.now()}-${sanitizedFileName}`;
  const filePath = `public/${userId}/${uniqueFileName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
      // ACL: 'public-read', // If you want to make files public on upload via ACL (B2 might handle this differently, often via bucket settings)
      ChecksumAlgorithm: undefined, // Explicitly disable SDK from adding its own checksum headers/params
    });

    const uploadUrl = await getSignedUrl(b2S3Client, command, { 
        expiresIn: 300, // URL expires in 5 minutes
        // By default, getSignedUrl for PutObjectCommand uses 'UNSIGNED-PAYLOAD' for browsers.
        // No explicit unsignPayload: true should be needed for PutObject in most SDK versions >= 3.188.0 for browser uploads.
    });

    return { success: true, uploadUrl, filePath };
  } catch (error: any) {
    console.error("Error generating pre-signed URL for B2:", error);
    return { success: false, error: error.message || "Failed to generate upload URL." };
  }
}

