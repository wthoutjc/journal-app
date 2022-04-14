import types from "../types/types";

const initialState = {
  loading: false,
  error: null,
  tittle: null,
  message: null,
};

const uiReducer = (state = initialState, action) => {
  const { loading, error, tittle, message } = action.payload || initialState;
  switch (action.type) {
    case types.uiNotification:
      return {
        ...state,
        error,
        tittle,
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
