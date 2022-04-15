import types from "../types/types";

const initialState = {
  loading: false,
  error: null,
  title: null,
  message: null,
};

const uiReducer = (state = initialState, action) => {
  const { loading, error, title, message } = action.payload || initialState;
  switch (action.type) {
    case types.uiNotification:
      return {
        ...state,
        error,
        title,
        message,
      };
    case types.uiLoading:
      return {
        ...state,
        loading,
      };
    default:
      return state;
  }
};

export default uiReducer;
