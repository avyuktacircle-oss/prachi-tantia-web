import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialise once per process. On Firebase App Hosting, ADC is available
// automatically. Locally, set GOOGLE_APPLICATION_CREDENTIALS to a service
// account key file, or point FIRESTORE_EMULATOR_HOST to a local emulator.
const app =
  getApps().length > 0
    ? getApps()[0]!
    : initializeApp();

export const db = getFirestore(app);
