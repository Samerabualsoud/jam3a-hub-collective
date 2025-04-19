
import React from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const Register = () => {
  // Pass a prop to the Login component to show the register tab by default
  return <Login defaultTab="register" />;
};

export default Register;
