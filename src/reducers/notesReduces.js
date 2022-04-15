import types from "../types/types";

// {
//     notes: [],
//     active: null,
//     active: {
//         id: 'ASD13lñMSDA',
//         title: '',
//         body: '',
//         imageUrl: '',
//         date: timestamp
//     }
// }

const initialState = {
  notes: [],
  active: null,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        notes: [...state.notes],
        active: {
          ...action.payload,
        },
      };
    case types.notesAdd:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notesLogout:
      return initialState;
    default:
      return state;
  }
};

export default notesReducer;
