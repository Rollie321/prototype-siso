
import { S3Client } from "@aws-sdk/client-s3";

const B2_KEY_ID = process.env.BACKBLAZE_KEY_ID;
const B2_APPLICATION_KEY = process.env.BACKBLAZE_APPLICATION_KEY;
const B2_ENDPOINT = process.env.BACKBLAZE_S3_ENDPOINT;

if (!B2_KEY_ID || !B2_APPLICATION_KEY || !B2_ENDPOINT) {
  throw new Error("Missing Backblaze B2 environment variables for S3 client configuration.");
}

// The S3 endpoint for B2 doesn't include the region in the hostname sometimes,
// but the SDK expects it for the 'region' property. We extract it if possible,
// or use a sensible default. B2 S3 endpoint usually looks like s3.<region>.backblazeb2.com
// e.g., s3.us-west-004.backblazeb2.com -> region is us-west-004
const regionMatch = B2_ENDPOINT.match(/^s3\.([a-zA-Z0-9-]+)\.backblazeb2\.com$/);
const B2_REGION = regionMatch ? regionMatch[1] : "us-east-1"; // Fallback region if parsing fails

export const b2S3Client = new S3Client({
  endpoint: `https://${B2_ENDPOINT}`, // Ensure protocol is present
  region: B2_REGION,
  credentials: {
    accessKeyId: B2_KEY_ID,
    secretAccessKey: B2_APPLICATION_KEY,
  },
});

export const B2_BUCKET_NAME = process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME;
export const B2_BUCKET_PUBLIC_URL_BASE = process.env.NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE;

if (!B2_BUCKET_NAME) {
  console.warn("NEXT_PUBLIC_BACKBLAZE_BUCKET_NAME is not set. File uploads may fail.");
}
if (!B2_BUCKET_PUBLIC_URL_BASE) {
  console.warn("NEXT_PUBLIC_BACKBLAZE_BUCKET_PUBLIC_URL_BASE is not set. File URLs may be incorrect.");
}
