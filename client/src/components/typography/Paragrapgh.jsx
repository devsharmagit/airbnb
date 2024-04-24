import React from 'react'

function Paragrapgh( {text, className} ) {
  return (
    <p className={`poppings font-normal text-base leading-tight text-gray-600 ${className}`}>
    {text}
  </p> 
  )
}

export default Paragrapgh
