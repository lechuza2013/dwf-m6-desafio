import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, get } from "firebase/database";

// import * as keyData from "../key.json";

// const app = initializeApp(keyData);
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
});
const database = getDatabase(app);

export { database, onValue, ref, get };
