import React from 'react'
import ModalContainer from './ModalContainer';
import Button from '../ui/Button';
import Filter from "../Filter"

const FilterModal = ({ isOpen, setIsOpen}) => {
  return (
    <ModalContainer isOpen={isOpen} >

    <div className='w-screen overflow-x-hidden h-screen fixed top-0 left-0 bg-white bg-opacity-50 backdrop-blur-sm z-[111111111] overflow-scroll'>
    <Button text={"close"} onClick={()=>setIsOpen(false)} /> 

        
    <div className='max-w-3xl m-auto p-4 flex items-center justify-center gap-3'>
   <Filter filterOpen={isOpen} setFilterOpen={setIsOpen} />
    </div>
     
    </div>
        </ModalContainer>
  )
}

export default FilterModal
