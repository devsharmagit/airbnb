import { Route, Routes } from "react-router-dom";
import "../App.css";
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
} from "../pages/index.ts";

import LoadingModal from "../components/Modal/LoadingModal.tsx";

import React, { Suspense } from "react";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <IndexPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="/map-place"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <MapPlace />
            </Suspense>
          }
        />
        <Route
          path="/place/add-new"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <NewPlaceFormPage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/place/:placeId"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <PlaceOverviewPage />
            </Suspense>
          }
        />
        <Route
          path="/place/:placeId/edit"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <EditPlacePage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <AccountPage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/my-places"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <MyPlacesPage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/saved-places"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <SavedPlacesPage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/booking"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <BookingsPage />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="/booking/:bookingId"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <AuthProtection>
                <BookingOverview />
              </AuthProtection>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingModal isOpen={true} text={"Loading"} />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default RoutesContainer;
