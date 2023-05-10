import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, off } from "firebase/database";

const app = initializeApp({
  apiKey: "cb88244f2f43257f221a2df98ca180852bf1c58f",
  authDomain: "probandoapx.firebaseapp.com",
  databaseURL: "https://probandoapx-default-rtdb.firebaseio.com/",
});

const database = getDatabase(app);

export { database, onValue, ref, update, off };
