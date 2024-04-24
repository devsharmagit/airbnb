import React from 'react'
import ModalContainer from './ModalContainer';
import Button from '../ui/Button';


const ImageModal = ({photos, isOpen, setIsOpen}) => {
  return (
    <ModalContainer isOpen={isOpen} >

    <div className='w-screen overflow-x-hidden h-screen fixed top-0 left-0 bg-white bg-opacity-50 backdrop-blur-sm z-[11111] overflow-scroll'>
    <Button text={"close"} onClick={()=>setIsOpen(false)} /> 

        
    <div className='max-w-2xl m-auto p-4 flex flex-col items-center justify-center gap-3'>
    {photos.map((value) => {
            return (
                <img
                src={value.url}
                className="w-full"
                alt=""
                loading="lazy"
                />
            );
        })}
    </div>
     
    </div>
        </ModalContainer>
  )
}

export default ImageModal
