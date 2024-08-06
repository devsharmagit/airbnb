import React from "react";
import AuthProtection from "../components/AuthProtection.tsx";

const IndexPage = React.lazy(() => import("./IndexPage.tsx"));
const LoginPage = React.lazy(() => import("./LoginPage.tsx"));
const Layout = React.lazy(() => import("../Layout.tsx"));
const RegisterPage = React.lazy(() => import("./RegisterPage.tsx"));
const AccountPage = React.lazy(() => import("./AccountPage.tsx"));
const PlaceOverviewPage = React.lazy(() => import("./PlaceOverviewPage.tsx"));
const BookingOverview = React.lazy(() => import("./BookingOverview.tsx"));
const NewPlaceFormPage = React.lazy(() => import("./NewPlaceFormPage.tsx"));
const EditPlacePage = React.lazy(() => import("./EditPlacePage.tsx"));
const MyPlacesPage = React.lazy(() => import("./MyPlacesPage.tsx"));
const SavedPlacesPage = React.lazy(() => import("./SavedPlacesPage.tsx"));
const BookingsPage = React.lazy(() => import("./BookingsPage.tsx"));
const MapPlace = React.lazy(() => import("./MapPlace.tsx"));
const PageNotFound = React.lazy(() => import("./PageNotFound.tsx"));

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
