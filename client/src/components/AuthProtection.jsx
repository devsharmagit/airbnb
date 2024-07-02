import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthProtection({ children }) {

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return <>{user && children}</>;
}

export default AuthProtection;
