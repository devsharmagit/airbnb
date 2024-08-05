import "./App.css";
import { Toaster } from "react-hot-toast";
import { fetchUser } from "./slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import LoadingModal from "./components/Modal/LoadingModal.jsx";
import Error from "./components/Error.jsx";
import React, { useEffect, Suspense } from "react";
import RoutesContainer from "./utils/RoutesContainer.jsx";

function App() {
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
