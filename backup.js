/**
 * Local Firestore Backup Script
 * 
 * Fetches specified Firestore collections and exports documents into
 * a timestamped JSON file located in the /backups directory.
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 1. Locate and validate serviceAccountKey credentials
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

// 2. Collections to export
const COLLECTIONS = ['users', 'courses'];

async function runBackup() {
  console.log('🚀 Starting Firestore backup...');
  console.log(`🔑 Using credentials from: ${path.basename(keyPath)}`);

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    // Initialize Firebase Admin App if not already initialized
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const db = getFirestore();
    const backupData = {
      backupTimestamp: new Date().toISOString(),
      projectId: serviceAccount.project_id || 'unknown',
      collections: {},
    };

    let totalDocsCount = 0;

    for (const colName of COLLECTIONS) {
      console.log(`\n📥 Fetching collection: "${colName}"...`);
      const snapshot = await db.collection(colName).get();

      console.log(`   Found ${snapshot.size} document(s) in "${colName}".`);
      totalDocsCount += snapshot.size;

      backupData.collections[colName] = [];

      snapshot.forEach((doc) => {
        const rawData = doc.data();
        
        // Convert any Firestore Timestamps into ISO strings for clean JSON serialization
        const formattedData = {};
        for (const [key, value] of Object.entries(rawData)) {
          if (value && typeof value.toDate === 'function') {
            formattedData[key] = value.toDate().toISOString();
          } else {
            formattedData[key] = value;
          }
        }

        backupData.collections[colName].push({
          _id: doc.id,
          ...formattedData,
        });
      });
    }

    // 3. Ensure /backups directory exists in root
    const backupsDir = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
      console.log('📁 Created "/backups" directory.');
    }

    // 4. Generate filename with ISO timestamp (safe for Windows & Linux filesystems)
    const safeTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `firestore-backup-${safeTimestamp}.json`;
    const outputPath = path.join(backupsDir, fileName);

    // 5. Write JSON backup
    fs.writeFileSync(outputPath, JSON.stringify(backupData, null, 2), 'utf8');

    const fileSizeKB = (fs.statSync(outputPath).size / 1024).toFixed(2);
    console.log('\n========================================');
    console.log('✅ Firestore Backup Complete!');
    console.log(`📄 File: ${fileName}`);
    console.log(`📍 Path: ${outputPath}`);
    console.log(`📊 Summary: ${COLLECTIONS.length} collection(s), ${totalDocsCount} total document(s) (${fileSizeKB} KB)`);
    console.log('========================================\n');
  } catch (error) {
    console.error('\n❌ Backup failed with error:');
    console.error(error);
    process.exit(1);
  }
}

runBackup();
