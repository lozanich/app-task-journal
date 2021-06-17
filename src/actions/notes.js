import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react_journalapp

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(setActiveNote(docRef.id, newNote));
    newNote.id = docRef.id;
    dispatch(addNote(newNote));
  };
};

export const setActiveNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNote = (note) => ({
  type: types.notesAddNew,
  payload: {
    note,
  },
});

export const setNotesLoaded = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(loadNotesAction(notes));
  };
};

export const loadNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: { notes },
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      Swal.fire("Saved", note.title, "success");
      dispatch(refreshNote(note.id, note));
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      ...note,
    },
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: aciveNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const url = await fileUpload(file);
    aciveNote.url = url;
    dispatch(startSaveNote(aciveNote));

    Swal.close();
  };
};

export const startDelete = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const url = `${uid}/journal/notes/${id}`;

    try {
      db.doc(url).delete();
      dispatch(deleteNote(id));
      Swal.fire({
        title: "Eliminada",
        text: "Nota eliminada correctamente",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: { id },
});

export const notesLogoutClean = () => ({
  type: types.notesLogoutCleanning,
});
