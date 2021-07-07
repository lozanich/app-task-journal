/**
 * @jest-environment node
 */

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import {
  setNotesLoaded,
  startNewNote,
  startSaveNote,
} from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TEST",
  },
  notes: {
    active: {
      id: "pkRVSQqu63IpVULcVtwd",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

global.scrollTo = jest.fn();

describe("Pruebas en las acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe de crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: expect.any(Object),
    });

    const docId = actions[0].payload.id;
    const path = `TEST/journal/notes/${docId}`;
    await db.doc(path).delete();
  });

  test("setNotesLoaded debe de cargar las notes", async () => {
    await store.dispatch(setNotesLoaded("TEST"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Object),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload.notes[0]).toMatchObject(expected);
  });

  test("startSaveNote debe de actualizar la note", async () => {
    const note = {
      id: "jiT33iCAkZq0Y6SuCl9a",
      title: "titulo test",
      body: "nuevo body test2",
      url: "http://test.com",
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesUpdated,
      payload: expect.any(Object),
    });

    const docRef = await db.doc(`/TEST/journal/notes/${note.id}`).get();
    expect(note.title).toBe(docRef.data().title);
  });
});
