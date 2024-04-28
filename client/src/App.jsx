import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import {
  AccountPage,
  AuthProtection,
  BookingOverview,
  BookingsPage,
  EditPlacePage,
  IndexPage,
  Layout,
  LoginPage,
  MapPlace,
  MyPlacesPage,
  NewPlaceFormPage,
  PageNotFound,
  PlaceOverviewPage,
  RegisterPage,
  SavedPlacesPage,
} from './pages/index';
import { fetchUser } from './slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import LoadingModal from './components/Modal/LoadingModal';
import Error from './components/Error';
import { useEffect } from 'react';

function App() {
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [user]);

  if (loading) {
    return <LoadingModal text={'Getting your details...'} />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map-place" element={<MapPlace />} />
          <Route
            path="/place/add-new"
            element={
              <AuthProtection>
                <NewPlaceFormPage />
              </AuthProtection>
            }
          />
          <Route path="/place/:placeId" element={<PlaceOverviewPage />} />
          <Route
            path="/place/:placeId/edit"
            element={
              <AuthProtection>
                <EditPlacePage />
              </AuthProtection>
            }
          />
          <Route
            path="/account"
            element={
              <AuthProtection>
                <AccountPage />
              </AuthProtection>
            }
          />
          <Route
            path="/my-places"
            element={
              <AuthProtection>
                <MyPlacesPage />
              </AuthProtection>
            }
          />
          <Route
            path="/saved-places"
            element={
              <AuthProtection>
                <SavedPlacesPage />
              </AuthProtection>
            }
          />
          <Route
            path="/booking"
            element={
              <AuthProtection>
                <BookingsPage />
              </AuthProtection>
            }
          />
          <Route
            path="/booking/:bookingId"
            element={
              <AuthProtection>
                <BookingOverview />
              </AuthProtection>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
