/* eslint-disable import/no-mutable-exports */
import { Analytics, getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let firebaseAnalytics: Analytics

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth()

if (firebaseApp.name && typeof window !== 'undefined') {
  firebaseAnalytics = getAnalytics(firebaseApp)
}

export { firebaseAnalytics, firebaseAuth }
