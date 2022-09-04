import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNc0k2zRIKdjEDKCQu5Q_YaLBGwTwCqv4",
  authDomain: "rn-social-4a015.firebaseapp.com",
  projectId: "rn-social-4a015",
  storageBucket: "rn-social-4a015.appspot.com",
  messagingSenderId: "128103374722",
  appId: "1:128103374722:web:89edf3086a0c4b682d399b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
