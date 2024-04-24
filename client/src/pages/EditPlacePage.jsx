import React from 'react'
import PlaceForm from '../components/PlaceForm'
import { useParams } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'

function EditPlacePage() {
    const { placeId } = useParams()

    const {result, loading, error} = useFetchData(`/api/place/${placeId}`)

if(loading) return <h1>it is loading</h1>

if(error) return <h1>it got some error</h1>
    
    return <>
    
    {result?.data?.place && <PlaceForm type={"edit"} placeId={placeId} place={result?.data?.place} /> }
    </>
}

export default EditPlacePage
