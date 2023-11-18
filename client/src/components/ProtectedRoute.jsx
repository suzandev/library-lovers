import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

export default function ProtectedRoute({ children }) {
  // 1) Load the authenticated user
  const { isAuthenticated, isLoading } = useAuth();

  // 2) While Loading show a spinner
  if (isLoading) return <Loading />;

  // 3) If there is an authenticated user, render the children
  return isAuthenticated ? children : <Navigate to="/login" replace={true} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
