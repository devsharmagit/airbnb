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
import React, { useEffect, Suspense } from 'react';

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
          <Route
            index
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <IndexPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/map-place"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <MapPlace />
              </Suspense>
            }
          />
          <Route
            path="/place/add-new"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <NewPlaceFormPage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/place/:placeId"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <PlaceOverviewPage />
              </Suspense>
            }
          />
          <Route
            path="/place/:placeId/edit"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <EditPlacePage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <AccountPage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/my-places"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <MyPlacesPage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/saved-places"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <SavedPlacesPage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/booking"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <BookingsPage />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="/booking/:bookingId"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <AuthProtection>
                  <BookingOverview />
                </AuthProtection>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
