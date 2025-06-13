
// This file should now only contain constants that are safe to expose to the client,
// typically those prefixed with NEXT_PUBLIC_.

export const NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME = process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME;
export const NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE = process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE;

if (!NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME) {
  console.warn("NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME is not set. File uploads may fail or URLs may be incorrect.");
}
if (!NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE) {
  console.warn("NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE is not set. File URLs may be incorrect.");
}
