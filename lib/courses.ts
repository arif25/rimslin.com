import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Course } from "@/types/course";

/**
 * Fetches all published courses from Firestore.
 */
export async function getAllCourses(): Promise<Course[]> {
  try {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("isPublished", "==", true));
    const querySnapshot = await getDocs(q);

    const courses: Course[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...(doc.data() as Omit<Course, "id">),
      });
    });

    return courses;
  } catch (error) {
    console.error("Error fetching courses from Firestore:", error);
    return [];
  }
}

/**
 * Fetches a single course document by its slug or document ID.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (!slug) return null;

  try {
    // 1. Direct lookup by document ID (slug-based ID)
    const directDocRef = doc(db, "courses", slug);
    const directDocSnap = await getDoc(directDocRef);

    if (directDocSnap.exists()) {
      return {
        id: directDocSnap.id,
        ...(directDocSnap.data() as Omit<Course, "id">),
      };
    }

    // 2. Fallback query matching the slug field
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const foundDoc = querySnapshot.docs[0];
      return {
        id: foundDoc.id,
        ...(foundDoc.data() as Omit<Course, "id">),
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching course by slug "${slug}":`, error);
    return null;
  }
}
