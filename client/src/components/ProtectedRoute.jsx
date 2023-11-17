import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function ProtectedRoute({ children }) {
  const { user, getUserIsLoading } = useAppContext();

  if (getUserIsLoading) return <p>Loading....</p>;

  if (getUserIsLoading && !user) {
    console.log("redirecting to login");
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
