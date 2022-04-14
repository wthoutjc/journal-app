import { useNavigate } from "react-router-dom";

import "animate.css";

// Icons
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

// Hooks
import useForm from "../../hooks/useForm";

//Helpers
import { registeredValid } from "../../services/helpers/isValid";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import { setNotificationAction } from "../../actions/ui";
import { startRegisterForm } from "../../actions/auth";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // error, tittle,
    const valid = registeredValid(values);
    dispatch(setNotificationAction(valid));
    const { error } = valid;
    const { email, name, password } = values;
    if (!error) {
      dispatch(startRegisterForm(email, password, name));
    }
  };

  return (
    <div className="auth__register">
      <div
        className={
          loading ? "auth__register-form auth__loading" : "auth__register-form"
        }
      >
        <h1>Create Account</h1>
        <div className="auth__with-google">
          <button className="auth__google-icon">
            <AiIcons.AiOutlineGooglePlus />
          </button>
        </div>
        <span>or use your email account for registration</span>
        <form onSubmit={handleRegister}>
          <div className="auth__input-data">
            <div className="auth_input-icon">
              <AiIcons.AiOutlineMail />
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="auth__input-data">
            <div className="auth_input-icon">
              <AiIcons.AiOutlineUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="auth__input-data">
            <div className="auth_input-icon">
              <RiIcons.RiLockPasswordLine />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="auth__input-data">
            <div className="auth_input-icon">
              <RiIcons.RiLockPasswordLine />
            </div>
            <input
              type="password"
              name="password2"
              placeholder="Confirm your password"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <button className="auth__sign-btn" disabled={loading}>
            SIGN UP
          </button>
        </form>
      </div>
      <div className="auth__register-hub">
        <h1>Hello, Friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button onClick={handleLogin}>SIGN IN</button>
      </div>
    </div>
  );
};

export default RegisterScreen;
