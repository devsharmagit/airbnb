import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./Modal/LoadingModal.tsx";
import { useAppSelector } from "../hooks/reduxhooks.ts";

function AuthProtection({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return <LoadingModal text={"Getting details"} />;
  }

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return <>{user && children}</>;
}

export default AuthProtection;
