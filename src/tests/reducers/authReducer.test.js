import types from "../../types/types";
import authReducer from "../../reducers/authReducer";

describe("Pruebas en authReducer", () => {
  test("Debe de realizar el login", () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Juan",
      },
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      uid: "abc",
      name: "Juan",
    });
  });

  test("Debe realizar el logout", () => {
    const initialState = {
      uid: "987kxHxeH1N",
      name: "Juan",
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test("Debe de realizar el default", () => {
    const initialState = {
      uid: "987kxHxeH1N",
      name: "Juan",
    };

    const action = {
      type: "No type",
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
