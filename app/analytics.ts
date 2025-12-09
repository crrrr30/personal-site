import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBhAUAsgljjiieI2bmTD8CuDuNZMmLfxuM",
  authDomain: "personal-443011.firebaseapp.com",
  projectId: "personal-443011",
  storageBucket: "personal-443011.firebasestorage.app",
  messagingSenderId: "22649088719",
  appId: "1:22649088719:web:8e796399d7f48384b565ba",
  measurementId: "G-F8XHP3KPJR",
} as const;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export type AnalyticsTag = never;

export function logEvent(tag: AnalyticsTag) {
  firebaseLogEvent(analytics, tag);
}
