import { Timestamp } from "firebase/firestore";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "12:30"
  videoUrl: string; // video embed or hosting ID
  isFreePreview: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string; // Document ID / Slug
  title: string;
  slug: string;
  description: string;
  price: number; // INR ₹
  thumbnailUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  isPublished: boolean;
  createdAt: Timestamp | Date | string | any;
  modules: CourseModule[];
}
