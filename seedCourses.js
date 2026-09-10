/**
 * Firestore Courses Seeding Script
 * 
 * Seeds realistic Workplace Arabic courses into the Firestore 'courses' collection
 * using the Firebase Admin SDK and serviceAccountKey.json.
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

// 1. Locate serviceAccountKey credentials
const primaryKeyPath = path.join(__dirname, 'serviceAccountKey.json');
const fallbackKeyPath = path.join(__dirname, 'serviceAccountKey.json.json');

let keyPath = null;
if (fs.existsSync(primaryKeyPath)) {
  keyPath = primaryKeyPath;
} else if (fs.existsSync(fallbackKeyPath)) {
  keyPath = fallbackKeyPath;
} else {
  console.error('❌ Error: Service account credentials file not found!');
  console.error('   Please place "serviceAccountKey.json" in the project root.');
  process.exit(1);
}

// 2. Workplace Arabic Courses
const WORKPLACE_ARABIC_COURSES = [
  {
    id: 'workplace-arabic-essentials',
    slug: 'workplace-arabic-essentials',
    title: 'Workplace Arabic Essentials: Professional Communication',
    description: 'অফিস, মিটিং, বিজনেস ইমেইল এবং প্রফেশনাল পরিবেশে সাবলীলভাবে আরবি ভাষায় কথা বলার প্রাথমিক ও কার্যকর কোর্স।',
    price: 1999,
    thumbnailUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    level: 'Beginner',
    isPublished: true,
    modules: [
      {
        id: 'module-1',
        title: 'Corporate Greetings & Office Etiquette',
        lessons: [
          {
            id: 'lesson-1-1',
            title: '১. প্রফেশনাল গ্রিটিংস ও মিটিং শুরু করার নিয়ম',
            duration: '12:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true,
          },
          {
            id: 'lesson-1-2',
            title: '২. সহকর্মী ও ক্লায়েন্টদের সাথে আনুষ্ঠানিক পরিচয়',
            duration: '15:40',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Professional Emails & Phone Calls',
        lessons: [
          {
            id: 'lesson-2-1',
            title: '৩. বিজনেস ইমেইল লেখার ফরম্যাট ও স্ট্যান্ডার্ড শব্দাবলি',
            duration: '18:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
          {
            id: 'lesson-2-2',
            title: '৪. অফিসিয়াল ফোন কল রিসিভ ও হ্যান্ডেল করার টেকনিক',
            duration: '14:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
        ],
      },
    ],
  },
  {
    id: 'gulf-business-negotiation-arabic',
    slug: 'gulf-business-negotiation-arabic',
    title: 'Gulf Spoken Arabic for Business & Deal Negotiation',
    description: 'গাল্ফ বা মধ্যপ্রাচ্যে ব্যবসা, ক্লায়েন্ট মিটিং এবং ডিল ক্লোজ করার জন্য প্রয়োজনীয় কথ্য আরবি (খালিজি ডায়ালেক্ট)।',
    price: 2499,
    thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    level: 'Intermediate',
    isPublished: true,
    modules: [
      {
        id: 'module-1',
        title: 'Client Meetings & Presentations',
        lessons: [
          {
            id: 'lesson-1-1',
            title: '১. আরবিতে প্রোডাক্ট বা সার্ভিস প্রেজেন্টেশন',
            duration: '16:30',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true,
          },
          {
            id: 'lesson-1-2',
            title: '২. প্রশ্নোত্তর পর্ব ও ক্লায়েন্টের আপত্তি দূর করা',
            duration: '20:10',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
        ],
      },
      {
        id: 'module-2',
        title: 'Contract Terms & Negotiations',
        lessons: [
          {
            id: 'lesson-2-1',
            title: '৩. মূল্য নির্ধারণ ও চুক্তির শর্তাবলি নিয়ে দরকষাকষি',
            duration: '22:45',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
          {
            id: 'lesson-2-2',
            title: '৪. ফাইনাল ডিল নিশ্চিতকরণ ও প্রফেশনাল বিদায়',
            duration: '17:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false,
          },
        ],
      },
    ],
  },
];

async function seedCourses() {
  console.log('🚀 Initializing Firestore Course Seeder (Workplace Arabic)...');
  console.log(`🔑 Using credentials: ${path.basename(keyPath)}`);

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const db = getFirestore();
    const coursesCollection = db.collection('courses');

    // 1. Clean up old generic / web dev sample data if present
    const obsoleteIds = ['fullstack-nextjs', 'modern-frontend-react-typescript'];
    for (const oldId of obsoleteIds) {
      const oldDoc = await coursesCollection.doc(oldId).get();
      if (oldDoc.exists) {
        await coursesCollection.doc(oldId).delete();
        console.log(`🧹 Removed previous sample course: "${oldId}"`);
      }
    }

    console.log(`\n📦 Seeding ${WORKPLACE_ARABIC_COURSES.length} Workplace Arabic courses into 'courses' collection...\n`);

    // 2. Seed Workplace Arabic courses
    for (const course of WORKPLACE_ARABIC_COURSES) {
      const docRef = coursesCollection.doc(course.slug);
      
      const coursePayload = {
        ...course,
        createdAt: FieldValue.serverTimestamp(),
      };

      await docRef.set(coursePayload, { merge: true });
      console.log(`✅ Seeded Course: "${course.title}"`);
      console.log(`   Document ID: "${course.slug}" | Level: ${course.level} | Price: ₹${course.price} | Modules: ${course.modules.length}`);
    }

    console.log('\n========================================');
    console.log('🎉 Workplace Arabic Courses Seeding Completed!');
    console.log(`📊 Total Courses in Firestore: ${WORKPLACE_ARABIC_COURSES.length}`);
    console.log('========================================\n');
  } catch (error) {
    console.error('\n❌ Course seeding failed with error:');
    console.error(error);
    process.exit(1);
  }
}

seedCourses();
