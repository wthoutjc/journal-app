/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { startNewNote, startUploadingAction } from "../../actions/notes";

// Firestore
import { db } from "../../firebase/firebaseConfig";
import { disableNetwork } from "firebase/firestore";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

// Types
import types from "../../types/types";

import * as fs from "fs";

// Services
import { loadImageService } from "../../services/loadImage";

/**
 * IMPORTANTE
 * Antes de ejecutar este módulo de pruebas es necesario quitar las
 * restricciones de autenticación de firestore:
 *
 * if request.auth.uid != null
 *
 */

jest.mock("../../services/loadImage", () => ({
    loadImageService: jest.fn(),
}));

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "hfCLmZglqJtX15sr25wE",
      title: "Hola",
      body: "Mundo",
      url: null,
    },
  },
});

describe("Pruebas en notes actions", () => {
  afterAll(() => {
    disableNetwork(db);
  });

  test("Payloads de reducer correctas", async () => {
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
      type: types.notesAdd,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;

    const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
    await deleteDoc(noteRef);
  });

  test("Debe actualizar la url de la imagen", async () => {
    loadImageService.mockReturnValue('https://hola-mundo.com')
    fs.writeFileSync('foto.jpg', '')
    const file = fs.readFileSync('foto.jpg')
    await store.dispatch(startUploadingAction(file));

    const docRef = doc( db, 'TESTING/journal/notes/hfCLmZglqJtX15sr25wE' );
    const docRecived = await getDoc( docRef );
    
    expect(docRecived.data().url).toBe('https://hola-mundo.com');
  });
});
