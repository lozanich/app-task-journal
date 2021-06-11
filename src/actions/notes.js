import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    console.log(uid);

    const newNote = {
      title: "",
      body: "",
      date: new Date(),
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

    console.log(docRef);
    dispatch(setActiveNote(docRef.id, newNote));
  };
};

export const setActiveNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const setNotesLoaded = (notes) => {
  return async (dispatch) => {
    const pnotes = await notes;
    console.log(pnotes);
    dispatch(loadNotesAction(pnotes));
  };
};

export const loadNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: { notes },
});
