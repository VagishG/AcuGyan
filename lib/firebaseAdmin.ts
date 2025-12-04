import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import path from "path";
import fs from "fs";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT as string
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET,
  });
}

export const storage = getStorage().bucket();
