import types from "../types/types";

const setNotificationAction = ({ error, title, message }) => ({
  type: types.uiNotification,
  payload: {
    error,
    title,
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
