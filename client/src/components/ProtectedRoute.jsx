import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function ProtectedRoute({ children }) {
  const { user, getUserIsLoading } = useAppContext();

  if (getUserIsLoading) return <p>Loading....</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
