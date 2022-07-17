import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC71LF0Y_TIl1t_ewXzO8oTkgXaLCx6R08",
  authDomain: "mini-blo-3d6fa.firebaseapp.com",
  projectId: "mini-blo-3d6fa",
  storageBucket: "mini-blo-3d6fa.appspot.com",
  messagingSenderId: "485955432258",
  appId: "1:485955432258:web:be9618b7e4c05f995c22db",
  measurementId: "G-MBK42BR3NY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db, app };
