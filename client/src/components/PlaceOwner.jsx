import React from 'react'
import Heading from './typography/Heading'
import Paragrapgh from './typography/Paragrapgh'

const PlaceOwner = ({place}) => {
  return (
    <div className="user-info border-t  border-b border-gray-300 flex gap-3 items-center  py-8">
    {place?.owner?.profilePhoto ? (
      <img
        src={`${place?.owner?.profilePhoto?.url}`}
        className="w-12 h-12 object-cover rounded-full"
        alt=""
        loading="lazy"
      />
    ) : (
      <img
        src={imgSrc}
        className="w-12 h-12 object-cover rounded-full"
      />
    )}

    <div className="flex flex-col content-center">
      <Heading text={place.owner.name} />
      <Paragrapgh text={place?.owner?.email} />
    </div>
  </div>
  )
}

export default PlaceOwner
