import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import PlaceOverviewPage from "./pages/PlaceOverviewPage";
import BookingOverview from "./pages/BookingOverview";
import NewPlaceFormPage from "./pages/NewPlaceFormPage";
import EditPlacePage from "./pages/EditPlacePage";
import { Toaster } from 'react-hot-toast';
import AuthProtection from "./components/AuthProtection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./slice/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import MyPlacesPage from "./pages/MyPlacesPage";
import SavedPlacesPage from "./pages/SavedPlacesPage";
import BookingsPage from "./pages/BookingsPage";
import MapPlace from "./pages/MapPlace";

function App() {

  const user = useSelector((state)=> state.user.user)
  const dispatch = useDispatch()

  const getUserData = async()=>{
    if(!user){
      const {data} = await axios.get('/api/user/me',  { withCredentials: true })
      dispatch(login(data.user))
    }
  }

  useEffect(()=>{
    const token = Cookies.get("token")
    if(token) getUserData()
  }, [user])

  return (
    <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/map-place" element={<MapPlace />} />
              <Route path="/place/add-new" element={<AuthProtection> <NewPlaceFormPage /> </AuthProtection>} />
              <Route path="/place/:placeId" element={<PlaceOverviewPage />} />
              <Route path="/place/:placeId/edit" element={<AuthProtection> <EditPlacePage /> </AuthProtection>} />
              <Route path="/account" element={<AuthProtection>  <AccountPage /> </AuthProtection>} />
              <Route path="/my-places" element={<AuthProtection>  <MyPlacesPage /> </AuthProtection>} />
              <Route path="/saved-places" element={<AuthProtection>  <SavedPlacesPage /> </AuthProtection>} />
              <Route path="/booking" element={<AuthProtection>  <BookingsPage /> </AuthProtection>} />
            <Route path="/booking/:bookingId"  element={<AuthProtection> <BookingOverview /> </AuthProtection>}/>
            </Route>
          </Routes>
       
        <Toaster />
    </>
  );
}

export default App;
