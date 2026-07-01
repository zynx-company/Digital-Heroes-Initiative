// ============================================================
// firebase-app.js
// REAL Firebase integration — uses the CDN version of the SDK,
// so it works directly in plain HTML (no npm / build step needed).
//
// This connects to your actual "Digital Heroes Initiative" project.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your real project config
const firebaseConfig = {
  apiKey: "AIzaSyD4kDJ1pvlZMRmBGArrQSrQZl4LPxptf0A",
  authDomain: "digital-heroes-initiative.firebaseapp.com",
  projectId: "digital-heroes-initiative",
  storageBucket: "digital-heroes-initiative.firebasestorage.app",
  messagingSenderId: "635795811598",
  appId: "1:635795811598:web:aeb9a249bdef5e976a3b5f",
  measurementId: "G-1LWD3BZWBN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Create a new student account: Firebase Auth + Firestore profile.
 */
export async function signUpStudent({ fullName, age, phone, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  await sendEmailVerification(user);

  await setDoc(doc(db, "students", user.uid), {
    fullName,
    age: Number(age),
    phone,
    email,
    role: "student",
    createdAt: serverTimestamp(),
    emailVerified: false,
  });

  return user;
}

/**
 * Log an existing student in.
 */
export async function loginStudent({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

/**
 * Forgot password.
 */
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Log out.
 */
export async function logoutStudent() {
  await signOut(auth);
}

/**
 * Get a student's Firestore profile.
 */
export async function getStudentProfile(uid) {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
}

/**
 * Listen for login state changes anywhere on the site.
 * Used to: show "Log in" vs "My account" in the nav, and to
 * block access to session pages for logged-out visitors.
 */
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Helper: turns Firebase's raw error codes into friendly Arabic/English
 * messages for the forms.
 */
export function friendlyAuthError(error) {
  const code = error?.code || "";
  const map = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };
  return map[code] || "Something went wrong. Please try again.";
}
