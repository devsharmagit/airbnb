import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import mapSrc from "../assets/placeholder.png";
import L from "leaflet";
import Button from "../components/ui/Button.tsx";
import toast from "react-hot-toast";
import Paragrapgh from "../components/typography/Paragrapgh.tsx";
import useFetchData from "../hooks/useFetchData";
import { GET_ALL_MAP_PLACE } from "../services/api/apiEndpoints";
import { PlaceDataType } from "../types/place.ts";

const MapPlace = () => {
  const myIcon = L.icon({
    iconUrl: mapSrc,
    iconSize: [40, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -20],
  });

  const [coordinates, setCoordinates] = useState<number[]>([]);
  const navigate = useNavigate();
  const markerRef: any = useRef(null);

  const mapRef: any = useRef(null);

  const getCurrectLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => setCoordinates([position.coords.latitude, position.coords.longitude]),
      () => {
        toast.error("Error occured to get location!");
        setCoordinates([]);
      }
    );
  };

  const onClickShowMarker = () => {
    if (coordinates.length === 0) return toast.error("Please allow location! and Refresh.");
    const map = mapRef.current;
    if (!map) {
      return;
    }

    map.flyTo(coordinates, 8);

    const marker = markerRef.current;
    if (marker) {
      marker.openPopup();
    }
  };
  const { result } = useFetchData(GET_ALL_MAP_PLACE);

  const places = result?.data?.places;
  useEffect(() => {
    getCurrectLocation();
  }, []);

  return (
    <div id="map">
      <MapContainer
        ref={mapRef}
        center={[25, 75]}
        zoom={5}
        scrollWheelZoom={true}
        className=" h-[90vh] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places?.map((place: PlaceDataType) => {
          return (
            <Marker
              key={place._id}
              position={[
                Number(place.location.coordinates[1]),
                Number(place.location.coordinates[0]),
              ]}
            >
              <Popup>
                <button
                  className="w-32 cursor-pointer p-2 "
                  onClick={() => navigate(`/place/${place._id}`)}
                >
                  <img
                    alt=""
                    src={place.mainImage.url}
                    className="h-28 w-28 rounded-md object-cover"
                  />
                  <Paragrapgh text={place.title} className={"!mb-0  !mt-2 w-28 truncate text-sm"} />
                </button>
              </Popup>
            </Marker>
          );
        })}

        {coordinates.length === 2 && (
          <Marker
            ref={markerRef}
            icon={myIcon}
            key={"current_location"}
            position={coordinates as L.LatLngTuple}
          >
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="absolute bottom-5 left-5 z-[99999] text-center">
        <Button onClick={onClickShowMarker} className={" bottom-0"} text={"Get Current Location"} />
      </div>
    </div>
  );
};

export default MapPlace;
