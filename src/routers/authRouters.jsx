import { Routes, Route, Navigate } from "react-router-dom";

//Components
import LoginScreen from "../components/auth/loginScreen";
import RegisterScreen from "../components/auth/registerScreen";

const AuthRouters = () => {
  return (
    <div className="auth__container">
      <div className="auth__form">
        <div className="auth__form-content">
          <Routes>
            <Route path="/auth/login" element={<LoginScreen />} />
            <Route path="/auth/register" element={<RegisterScreen />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </Routes>
        </div>
      </div>
      <div className="auth_img-container">
        <img
          src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1649467988/journalApp/background-3_y9rjcr.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthRouters;
