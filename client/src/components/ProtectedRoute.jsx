import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1) Load the authenticated user
  const { isAuthenticated, isLoading } = useAuth();

  // 2) If there is no authenticated user, redirect to the login page
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3) While Loading show a spinner
  if (isLoading) return <p>Loading....</p>;

  // 4) If there is an authenticated user, render the children
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
