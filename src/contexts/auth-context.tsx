
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

export interface SisoUser extends DocumentData {
  userId: string; 
  username: string; 
  fullName?: string; // Added: Distinguish from username if needed, or can be same
  email?: string;  
  createdAt?: string; 
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  influences?: string[];
  genres?: string[];
  spotifyLink?: string; // Added
  youtubeLink?: string; // Added
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
                const data = docSnap.data();
                setSisoUser({
                  userId: docSnap.id,
                  username: data.username, 
                  fullName: data.fullName,
                  email: data.email, 
                  createdAt: data.createdAt, 
                  location: data.location,
                  bio: data.bio,
                  skills: data.skills || [],
                  experience: data.experience,
                  influences: data.influences || [],
                  genres: data.genres || [],
                  spotifyLink: data.spotifyLink,
                  youtubeLink: data.youtubeLink,
                  ...data, 
                } as SisoUser);
              } else {
                console.warn(`Siso user profile not found for UID: ${user.uid}. A minimal profile might be created on first edit or settings update.`);
                setSisoUser({ userId: user.uid, username: user.displayName || "New User", fullName: user.displayName }); 
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
