// ------------------------------------------------------------------
// FIREBASE CONFIGURATION
// ------------------------------------------------------------------
// To activate:
// 1. Go to console.firebase.google.com and create a project
// 2. Add a Web App to get your config
// 3. Fill in the config object below
// 4. Uncomment the exports at the bottom
// ------------------------------------------------------------------

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // TODO: Replace with your actual Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};

// --- UNCOMMENT BELOW TO ACTIVATE FIREBASE ---

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// For now, we export null to prevent errors in the prototype
export const auth = null;
export const db = null;
