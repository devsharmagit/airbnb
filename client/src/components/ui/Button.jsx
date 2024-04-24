import React from 'react'

const Button = ({className, text, onClick, type, ...other}) => {
  return (
    <button
    type={type || "submit"}
    className={`disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 bg-primary shadow-md py-2 px-4 block font-semibold rounded-full text-white w-fit m-auto mt-4 ${className}`}
    onClick={onClick}
    {...other}
  >
   {text}
  </button>
  )
}

export default Button
