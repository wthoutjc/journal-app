import types from "../types/types";

const setNotificationAction = ({ error, tittle, message }) => ({
  type: types.uiNotification,
  payload: {
    error,
    tittle,
    message,
  },
});

const loadingAction = (render) => ({
  type: types.uiLoading,
  payload: {
    loading: render,
  },
});

export { setNotificationAction, loadingAction };
