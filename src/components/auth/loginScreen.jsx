import { useNavigate, Link } from "react-router-dom";
import "animate.css";

// Icons
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

// Hooks
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

const LoginScreen = () => {
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/auth/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <div className="auth__login">
      <div
        className={
          loading ? "auth__login-form auth__loading" : "auth__login-form"
        }
      >
        <h1>Sign in to JournalApp</h1>
        <div className="auth__with-google">
          <button className="auth__google-icon" onClick={handleGoogleLogin}>
            <AiIcons.AiOutlineGooglePlus />
          </button>
        </div>
        <span>or use your email account</span>
        <form onSubmit={handleLogin}>
          <div className="auth__input-data">
            <div className="auth_input-icon">
              <AiIcons.AiOutlineMail />
            </div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
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
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <Link to="#">Forgot your password?</Link>
          <button className="auth__sign-btn" disabled={loading}>
            SIGN IN
          </button>
        </form>
      </div>
      <div className="auth__login-hub">
        <h1>Welcome back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button onClick={handleRegister}>SIGN UP</button>
      </div>
    </div>
  );
};

export default LoginScreen;
