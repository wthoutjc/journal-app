/**
 * @jest-environment node
 */

import { login, logout, startLogout } from "../../actions/auth";
import types from "../../types/types";

import configureStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

// eslint-disable-next-line no-unused-vars
let store = mockStore({});

describe("PRuebas en auth.js", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  test("Login y logout deben de crear la acción respectiva", () => {
    const uid = "ABC123";
    const displayName = "Juan";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("Debe de realizar el logout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({
      type: types.notesLogout,
    });
  });
});
