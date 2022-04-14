import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//Components
import JournalScreen from "../components/journal/journalScreen";

// Sub- Router
import AuthRouters from "./authRouters";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Redux
import { useDispatch } from "react-redux";

// Actions
import { login } from "../actions/auth";
import { useState } from "react";

const AppRouters = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setChecking(false);
      if (user?.uid) {
        setIsLoggedIn(true);
        dispatch(login(user.uid, user.displayName));
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch]);

  if (checking)
    return (
      <>
        <h1>Wait..</h1>
      </>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoutes isAuth={isLoggedIn}>
              <AuthRouters />
            </PublicRoutes>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoutes isAuth={isLoggedIn}>
              <JournalScreen />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
