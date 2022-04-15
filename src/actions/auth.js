import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebaseConfig";

import types from "../types/types";
import { cleanLogoutAction } from "./notes";

// Actions
import { setNotificationAction, loadingAction } from "./ui";

const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        dispatch(loadingAction(false));
        dispatch(login(user.uid, user.displayName));
      }
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch(
        setNotificationAction({
          error: true,
          title: `Error: ${error.code} `,
          message: error.message,
        })
      );
    }
  };
};

const startGoogleLogin = () => {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithPopup(auth, googleAuthProvider);
      dispatch(login(user.uid, user.displayName));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotificationAction({
          error: true,
          title: `Error: ${error.code} `,
          message: error.message,
        })
      );
    }
  };
};

const startRegisterForm = (email, password, name) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      dispatch(login(user.uid, user.displayName));
      dispatch(loadingAction(false));
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch(
        setNotificationAction({
          error: true,
          title: `Error: ${error.code} `,
          message: error.message,
        })
      );
      console.error(error);
    }
  };
};

const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(cleanLogoutAction());
  };
};

/* SOLO SE EXPORTA PARA PRUEBAS */
const logout = () => ({
  type: types.logout,
});

export {
  login,
  startLoginEmailPassword,
  startGoogleLogin,
  startRegisterForm,
  startLogout,
  logout,
};
