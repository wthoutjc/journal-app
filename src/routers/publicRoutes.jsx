import { Navigate } from "react-router-dom";

const PublicRoutes = ({ isAuth, children }) => {
  return isAuth ? <Navigate to="/" /> : children;
};

export default PublicRoutes;
