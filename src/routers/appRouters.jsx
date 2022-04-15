import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//Components
import JournalScreen from "../components/journal/journalScreen";
import Loader from "../components/portal/loader";

// Sub- Router
import AuthRouters from "./authRouters";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

// Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { login } from "../actions/auth";
import { useState } from "react";
import { startLoadingNotes } from "../actions/notes";

const AppRouters = () => {
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      setChecking(false);
      if (user?.uid) {
        setIsLoggedIn(true);

        dispatch(login(user.uid, user.displayName));

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch]);

  if (loading || checking) {
    return <Loader />;
  }

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
