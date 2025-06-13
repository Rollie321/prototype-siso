
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

export interface SisoUser extends DocumentData {
  userId: string; // This will be the Firebase UID, typically from docSnap.id
  username: string; // Should always be present if SisoUser object is formed
  email?: string;  // Email from Firebase Auth, might not always be in Firestore doc if created minimally
  createdAt?: string; // Timestamp of creation, typically set during signup
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  influences?: string[];
  genres?: string[];
  // Add any other fields that might be part of a Siso user's profile
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  sisoUser: SisoUser | null;
  loading: boolean;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [sisoUser, setSisoUser] = useState<SisoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user) => {
        setCurrentUser(user);
        if (user) {
          const userDocRef = doc(db, 'Siso_users', user.uid);
          const unsubscribeFirestore = onSnapshot(
            userDocRef,
            (docSnap) => {
              if (docSnap.exists()) {
                // Ensure that the data is correctly typed according to the SisoUser interface
                const data = docSnap.data();
                setSisoUser({
                  userId: docSnap.id,
                  username: data.username, // username is expected
                  email: data.email, // email is optional
                  createdAt: data.createdAt, // createdAt is optional
                  location: data.location,
                  bio: data.bio,
                  skills: data.skills,
                  experience: data.experience,
                  influences: data.influences,
                  genres: data.genres,
                  ...data, // Spread remaining data
                } as SisoUser);
              } else {
                console.warn(`Siso user profile not found for UID: ${user.uid}. A minimal profile might be created on first edit.`);
                // If the Siso_users doc doesn't exist, we might want to reflect that sisoUser is not fully populated yet.
                // Setting sisoUser to null, or a minimal SisoUser object with just UID and perhaps a placeholder username from auth.currentUser.displayName
                // For example, to ensure sisoUser is not null if currentUser is present:
                // setSisoUser({ userId: user.uid, username: user.displayName || "New User" });
                setSisoUser(null); 
              }
              setLoading(false);
            },
            (firestoreError) => {
              console.error('Error fetching Siso user profile:', firestoreError);
              setError(firestoreError);
              setSisoUser(null);
              setLoading(false);
            }
          );
          return () => unsubscribeFirestore();
        } else {
          setSisoUser(null);
          setLoading(false);
        }
      },
      (authError) => {
        console.error('Auth state change error:', authError);
        setError(authError);
        setCurrentUser(null);
        setSisoUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribeAuth();
  }, []);

  const value = { currentUser, sisoUser, loading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
