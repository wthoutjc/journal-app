import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// Reducers
import authReducer from "../reducers/authReducer";
import uiReducer from "../reducers/uiReducers";

// Thunk - Middleware
import thunk from "redux-thunk";

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
