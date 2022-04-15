import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
import { setNotificationAction, loadingAction } from "./ui";

// Types
import types from "../types/types";

// Services
import { loadNotesService } from "../services/loadNotes";
import { loadImageService } from "../services/loadImage";

const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(collection(db, uid, "journal/notes"), newNote);

    dispatch(activeNoteAction(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

const addNewNote = (id, note) => ({
  type: types.notesAdd,
  payload: {
    id,
    ...note,
  },
});

const activeNoteAction = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

const setNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotesService(uid);
    dispatch(setNotesAction(notes));
  };
};

const saveNoteAction = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await updateDoc(
      doc(db, `${uid}/journal/notes/${note.id}`),
      noteToFirestore
    );

    dispatch(refreshNoteAction(note.id, noteToFirestore));
    dispatch(
      setNotificationAction({
        error: false,
        title: "Success",
        message: "Changes saved!",
      })
    );
  };
};

const refreshNoteAction = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

const startUploadingAction = (file) => {
  return async (dispatch, getState) => {
    dispatch(loadingAction(true));

    const { active } = getState().notes;
    const secureUrl = await loadImageService(file);

    active.url = secureUrl;

    dispatch(loadingAction(false));

    dispatch(saveNoteAction(active));

    dispatch(
      setNotificationAction({
        error: false,
        title: "Success",
        message: "Image uploaded successfully!",
      })
    );
  };
};

const startDeletingAction = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const noteRef = doc(db, `${uid}/journal/notes/${id}`);
    await deleteDoc(noteRef);

    dispatch(deleteNoteAction(id));
  };
};

const deleteNoteAction = (id) => ({
  type: types.notesDelete,
  payload: id,
});

const cleanLogoutAction = () => ({
  type: types.notesLogout,
});

export {
  startNewNote,
  addNewNote,
  refreshNoteAction,
  activeNoteAction,
  setNotesAction,
  startLoadingNotes,
  saveNoteAction,
  startUploadingAction,
  startDeletingAction,
  deleteNoteAction,
  cleanLogoutAction,
};
