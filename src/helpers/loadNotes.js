import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  notesSnap.forEach((snaphijo) => {
    notes.push({
      id: snaphijo.id,
      ...snaphijo.data(),
    });
  });

  return notes;
};
