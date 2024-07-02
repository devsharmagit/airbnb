import React from "react";
import AuthProtection from "../components/AuthProtection.jsx";

const IndexPage = React.lazy(() => import('./IndexPage'));
const LoginPage = React.lazy(() => import('./LoginPage'));
const Layout = React.lazy(() => import('../Layout'));
const RegisterPage = React.lazy(() => import('./RegisterPage'));
const AccountPage = React.lazy(() => import('./AccountPage.jsx'));
const PlaceOverviewPage = React.lazy(() => import('./PlaceOverviewPage'));
const BookingOverview = React.lazy(() => import('./BookingOverview.jsx'));
const NewPlaceFormPage = React.lazy(() => import('./NewPlaceFormPage'));
const EditPlacePage = React.lazy(() => import('./EditPlacePage'));
const MyPlacesPage = React.lazy(() => import('./MyPlacesPage'));
const SavedPlacesPage = React.lazy(() => import('./SavedPlacesPage'));
const BookingsPage = React.lazy(() => import('./BookingsPage'));
const MapPlace = React.lazy(() => import('./MapPlace'));
const PageNotFound = React.lazy(() => import('./PageNotFound.jsx'));

export {
  IndexPage,
  LoginPage,
  Layout,
  RegisterPage,
  AccountPage,
  PlaceOverviewPage,
  BookingOverview,
  NewPlaceFormPage,
  EditPlacePage,
  AuthProtection,
  MyPlacesPage,
  SavedPlacesPage,
  BookingsPage,
  MapPlace,
  PageNotFound,
};
