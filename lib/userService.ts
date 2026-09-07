import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  role: "student" | "admin" | "instructor";
  enrolledCourses: string[];
  createdAt?: any;
  lastLoginAt: any;
}

/**
 * Synchronizes Firebase Auth user (Google Auth or Phone OTP) with Firestore database.
 * If user does not exist in 'users' collection, creates a new profile record.
 * If user exists, updates 'lastLoginAt' and non-empty profile metadata.
 */
export async function syncUserWithDatabase(user: User): Promise<void> {
  if (!user || !user.uid) return;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      // Create new user profile document
      const newUserData: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || "User",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || "",
        role: "student",
        enrolledCourses: [],
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };

      await setDoc(userDocRef, newUserData);
    } else {
      // User exists: update lastLoginAt and any fresh metadata
      const updates: Record<string, any> = {
        lastLoginAt: serverTimestamp(),
      };

      if (user.displayName) updates.displayName = user.displayName;
      if (user.email) updates.email = user.email;
      if (user.phoneNumber) updates.phoneNumber = user.phoneNumber;
      if (user.photoURL) updates.photoURL = user.photoURL;

      await setDoc(userDocRef, updates, { merge: true });
    }
  } catch (error) {
    // Gracefully handle Firestore sync errors so auth is not blocked
    console.error("Error syncing user with Firestore database:", error);
  }
}
