import React from "react";
import PlaceForm from "../components/PlaceForm";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import LoadingModal from "../components/Modal/LoadingModal";
import { GET_A_PLACE } from "../services/api/apiEndpoints";


function EditPlacePage() {
  const { placeId } = useParams();

  const { result, loading, error } = useFetchData(`${GET_A_PLACE}/${placeId}`);

  if (loading)
    return (
      <>
        <LoadingModal isOpen={loading} text={"Getting your place details..."} />
      </>
    );

  if (error) return <h1>it got some error</h1>;

  return (
    <>
      {result?.data?.place && (
        <PlaceForm type={"edit"} placeId={placeId} place={result?.data?.place} />
      )}
    </>
  );
}

export default EditPlacePage;
