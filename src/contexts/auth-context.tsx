
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';

export interface SisoUser extends DocumentData {
  userId: string;
  email: string;
  username: string;
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
          // User is signed in, now listen for Firestore profile changes
          const userDocRef = doc(db, 'Siso_users', user.uid);
          const unsubscribeFirestore = onSnapshot(
            userDocRef,
            (docSnap) => {
              if (docSnap.exists()) {
                setSisoUser({ userId: docSnap.id, ...docSnap.data() } as SisoUser);
              } else {
                // Siso profile doesn't exist, might happen if created before this logic
                // Or if user signed up but Firestore write failed.
                // You might want to create it here or prompt user.
                console.warn(`Siso user profile not found for UID: ${user.uid}`);
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
          return () => unsubscribeFirestore(); // Cleanup Firestore listener on user change or unmount
        } else {
          // No user signed in
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

    return () => unsubscribeAuth(); // Cleanup Auth listener on component unmount
  }, []);

  const value = { currentUser, sisoUser, loading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
