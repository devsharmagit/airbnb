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
import React, { useEffect, Suspense, useTransition } from 'react';
import RoutesContainer from './utils/RoutesContainer';

function App() {
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [isPending, startTransition] = useTransition();

  console.log({ loading, error, user });

  useEffect(() => {
    if (token && !user) {
      startTransition(() => {
        dispatch(fetchUser());
      });
    }
  }, [user, token, dispatch]);

  if (loading || isPending) {
    return <LoadingModal text={'Getting your details...'} />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
    <Suspense fallback={<LoadingModal isOpen={true} text={'Loading'} />}>
   <RoutesContainer />
    </Suspense>
   

      <Toaster />
    </>
  );
}

export default App;
