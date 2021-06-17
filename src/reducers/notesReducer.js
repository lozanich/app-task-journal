import { types } from "../types/types";

/*
    {
        notes: [],
        active: null,
        active: {
            id:o12kjhskas,
            title: "",
            body: "",
            imageUrl: "",
            date: 628182812794
        }
    }
*/

const initialState = {
  notes: [],
  active: null,
};

export const notesreducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          id: action.payload.id,
          ...action.payload,
        },
      };

    case types.notesAddNew:
      // state.notes.push(action.payload.note);
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
      };

    case types.notesLoad:
      return {
        ...state,
        notes: action.payload.notes,
      };

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((item) => item.id !== action.payload.id),
      };

    case types.notesLogoutCleanning:
      return {
        ...state,
        active: null,
        notes: [],
      };

    default:
      return state;
  }
};
