
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Register = () => {
  // This component simply redirects to the Login page with the register tab active
  // We're reusing the Login component which has tabs for both login and register
  return <Login />;
};

export default Register;
