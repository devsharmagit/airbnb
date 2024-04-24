import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import mapSrc from "../assets/placeholder.png"
import L from 'leaflet';
import Button from "../components/ui/Button"
import toast from "react-hot-toast"
import Paragrapgh from "../components/typography/Paragrapgh"

const MapPlace = () => {
  const myIcon = L.icon({
    iconUrl: mapSrc,
    iconSize: [40, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -20],
  });

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState([])
  const navigate = useNavigate()
  const markerRef = useRef(null)

  const mapRef = useRef(null)

  const getCurrectLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) =>
        setCoordinates([position.coords.latitude, position.coords.longitude]),
      (err) => {
        console.log(err)
        toast.error("Error occured to get location!");
        setCoordinates([]);
      }
    );
  }

  const onClickShowMarker = () => {
    if(coordinates.length === 0) return toast.error("Please allow location! and Refresh.")
		const map = mapRef.current
		if (!map) {
			return
		}

		map.flyTo(coordinates, 8)

		const marker = markerRef.current
		if (marker) {
			marker.openPopup()
		}
	}



  const fetchAllLocations = async () => {
    const result = await axios.get('/api/place/map')
    setPlaces(result?.data?.places)
  }

  useEffect(() => {
    getCurrectLocation()
    fetchAllLocations()
  }, [])



  return (
    <div id="map">
   
        <MapContainer  ref={mapRef} center={[25,75]} zoom={5} scrollWheelZoom={true} className=' h-[90vh] w-full'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places?.map((place) => {
            return (
              <Marker key={place._id} position={[place.location.coordinates[1], place.location.coordinates[0]]}>
                <Popup>
                <div className='w-32 p-2 cursor-pointer ' onClick={() => navigate(`/place/${place._id}`)}>
                  <img src={place.mainImage.url} className='w-28 h-28 rounded-md object-cover'  />
                   <Paragrapgh text={place.title} className={"truncate  !mt-2 !mb-0 text-sm w-28"} />
                    
                </div>
                </Popup>
              </Marker>
            )
          })}

        {coordinates.length !== 0 && 
               <Marker ref={markerRef} icon={myIcon} key={"current_location"} position={coordinates}>
               <Popup>
                 Your Current Location
               </Popup>
             </Marker>
        }
   
          
        </MapContainer>
  
      <div className='z-[99999] absolute bottom-5 text-center left-5'>
      <Button onClick={onClickShowMarker} className={" bottom-0"} text={"Get Current Location"}/>
      </div>
    </div>
  )
}

export default MapPlace
