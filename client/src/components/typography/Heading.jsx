import React from 'react'

function Heading({text, className}) {
  return (
    <h1 className={`mont font-semibold text-2xl ${className}`}>
    {text}
  </h1>
  )
}

export default Heading
