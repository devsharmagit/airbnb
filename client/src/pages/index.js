import React from "react";
import AuthProtection from "../components/AuthProtection.jsx";

const IndexPage = React.lazy(() => import("./IndexPage.jsx"));
const LoginPage = React.lazy(() => import("./LoginPage.jsx"));
const Layout = React.lazy(() => import("../Layout.jsx"));
const RegisterPage = React.lazy(() => import("./RegisterPage.jsx"));
const AccountPage = React.lazy(() => import("./AccountPage.jsx"));
const PlaceOverviewPage = React.lazy(() => import("./PlaceOverviewPage.jsx"));
const BookingOverview = React.lazy(() => import("./BookingOverview.jsx"));
const NewPlaceFormPage = React.lazy(() => import("./NewPlaceFormPage.jsx"));
const EditPlacePage = React.lazy(() => import("./EditPlacePage.jsx"));
const MyPlacesPage = React.lazy(() => import("./MyPlacesPage.jsx"));
const SavedPlacesPage = React.lazy(() => import("./SavedPlacesPage.jsx"));
const BookingsPage = React.lazy(() => import("./BookingsPage.jsx"));
const MapPlace = React.lazy(() => import("./MapPlace.jsx"));
const PageNotFound = React.lazy(() => import("./PageNotFound.jsx"));

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
