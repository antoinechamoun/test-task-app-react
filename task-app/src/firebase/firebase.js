import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteField,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAkdUCjyihjhB7M6R1OBmtBW4Mmo3iOTBE",
  authDomain: "task-app-react-700f2.firebaseapp.com",
  projectId: "task-app-react-700f2",
  storageBucket: "task-app-react-700f2.appspot.com",
  messagingSenderId: "721911523308",
  appId: "1:721911523308:web:1a1f3e931fc3b9a98d02c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addTaskFirebase = async (task) => {
  try {
    await setDoc(doc(db, "tasks", `${task.id}`), {
      title: task.value,
      id: task.id,
      isEdit: task.isEdit,
    });
  } catch (error) {
    console.log("An error occured!", error);
  }
};

export const loadTasks = async () => {
  const q = query(collection(db, "tasks"));

  let allTasks = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTasks = [
      ...allTasks,
      {
        id: doc.data().id,
        value: doc.data().title,
        isEdit: doc.data().isEdit,
      },
    ];
  });
  return allTasks;
};

export const deleteTaskFirebase = async (id) => {
  await deleteDoc(doc(db, "tasks", `${id}`));
};
