import "./App.css";
import { Toaster } from "react-hot-toast";
import { fetchUser } from "./slice/userSlice";
import Cookies from "js-cookie";
import LoadingModal from "./components/Modal/LoadingModal.tsx";
import Error from "./components/Error.tsx";
import React, { useEffect, Suspense } from "react";
import RoutesContainer from "./utils/RoutesContainer.tsx";
import { useAppSelector, useAppDispatch } from "./hooks/reduxhooks.js";

function App() {
  const { loading, error, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [user, token, dispatch]);

  if (loading) {
    return <LoadingModal text={"Getting your details..."} />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
        <RoutesContainer />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
