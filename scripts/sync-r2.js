import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { fileURLToPath } from 'url';

// Setup environment variables
dotenv.config();

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error('❌ Missing R2 credentials in .env file.');
  process.exit(1);
}

// Configure S3 Client for Cloudflare R2
const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, '../r2-assets');

// Recursively get all files in directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

async function uploadFile(filePath) {
  // Get relative path to use as S3 key (e.g., projects/pantausam-video.mp4)
  const relativePath = path.relative(ASSETS_DIR, filePath).replace(/\\/g, '/');
  const fileStream = fs.createReadStream(filePath);
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  const uploadParams = {
    Bucket: R2_BUCKET_NAME,
    Key: relativePath,
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    console.log(`⏳ Uploading: ${relativePath} ...`);
    await S3.send(new PutObjectCommand(uploadParams));
    console.log(`✅ Success: ${relativePath}`);
  } catch (err) {
    console.error(`❌ Error uploading ${relativePath}:`, err.message);
  }
}

async function runSync() {
  console.log('🚀 Starting R2 Asset Sync...\n');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`❌ Directory not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  const files = getAllFiles(ASSETS_DIR);

  if (files.length === 0) {
    console.log('⚠️ No files found in r2-assets directory.');
    return;
  }

  console.log(`Found ${files.length} files. Uploading to bucket: ${R2_BUCKET_NAME}\n`);

  for (const file of files) {
    await uploadFile(file);
  }

  console.log('\n🎉 All uploads completed!');
}

runSync();
