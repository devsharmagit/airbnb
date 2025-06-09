import Header from "./components/Header.tsx";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {

  const {pathname} = useLocation()

  return (
    <>
    {!(pathname.includes("login") || pathname.includes("register") ) && 
      <Header />
    }
      <Outlet />
    </>
  );
}

export default Layout;
