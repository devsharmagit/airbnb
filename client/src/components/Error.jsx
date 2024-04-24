import React from 'react'
import Paragrapgh from './typography/Paragrapgh'
import {CircleExlamanation} from "../assets/svgs"

const Error = () => {
  return (
    <div className='text-center py-4 px-4 '>
        <CircleExlamanation className={"w-10 h-10 text-primary m-auto mb-4"} />
      <Paragrapgh text={"Something went wrong server side."} />
    </div>
  )
}

export default Error
