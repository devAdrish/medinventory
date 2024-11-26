import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_BASE_NAME = "inventory";

const fetchData = async (collectionName: string = "") => {
  try {
    const querySnapshot = await getDocs(
      collection(db, COLLECTION_BASE_NAME + collectionName)
    );
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return null;
  }
};

const createRecord = async (collectionName: string = "", payload: JObj) => {
  try {
    const docRef = await addDoc(
      collection(db, COLLECTION_BASE_NAME + collectionName),
      payload
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

export { fetchData, createRecord };
