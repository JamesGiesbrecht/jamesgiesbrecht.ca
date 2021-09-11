import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
