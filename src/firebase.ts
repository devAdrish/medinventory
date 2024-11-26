import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwE3rVujrkP0mpXZs-peNjeMSovC8Po5w",
  authDomain: "medinventory-app.firebaseapp.com",
  projectId: "medinventory-app",
  storageBucket: "medinventory-app.firebasestorage.app",
  messagingSenderId: "666178995647",
  appId: "1:666178995647:web:b987bac1ffefce1f0fcd0a",
  measurementId: "G-SBBBZJCP5H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
