import React from 'react'
import Button from './ui/Button'

function Modal({ isOpen, setIsOpen, children}) {

  if(!isOpen) return null

  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-white bg-opacity-70 backdrop-blur-md z-[11111] overflow-scroll'>

     <Button text={"close"} onClick={()=>setIsOpen(false)} /> 
     
      <div className='max-w-2xl m-auto p-4 flex flex-col items-center justify-center gap-3'>

      {children}
      </div>
    </div>
  )
}

export default Modal
