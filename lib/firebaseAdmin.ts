import admin from "firebase-admin"
import { getStorage } from "firebase-admin/storage"
import path from "path"
import fs from "fs"

if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), "firebase.json")
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"))

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET
  })
}

export const storage = getStorage().bucket()
