import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LocationSvg } from "../assets/svgs";
import Heading from "./typography/Heading";
import Paragrapgh from "./typography/Paragrapgh";

function LocationMap({ coordinates, title }) {
  return (
    <>
      {coordinates && (
        <div className=" border-t border-gray-300 py-8">
          <div className="flex items-center gap-1">
            <LocationSvg />
            <Heading text={"Location"} />
          </div>
          <Paragrapgh text={"Location on Map."} />

          <div id="map" className="mt-2">
            <MapContainer
              className="h-96"
              center={[coordinates[1], coordinates[0]]}
              zoom={9}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coordinates[1], coordinates[0]]}>
                <Popup>{title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default LocationMap;
