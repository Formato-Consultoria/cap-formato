import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount = require("./cap-formato.config.json");

if(!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://cap-formato.firebaseio.com'
  });
}

const db = getFirestore();

export { db };