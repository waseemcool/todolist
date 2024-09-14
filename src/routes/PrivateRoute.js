import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  //const navigate = useNavigate();

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
