import { db } from "../firebase/firebaseConfig";

//Firestore
import { getDocs, query, collection } from "firebase/firestore";

const loadNotesService = async (uid) => {
  const notes = await getDocs(query(collection(db, `${uid}/journal/notes`)));

  const notesList = [];

  notes?.forEach((note) => {
    notesList.push({
      id: note.id,
      ...note.data(),
    });
  });

  return notesList;
};

export { loadNotesService };
