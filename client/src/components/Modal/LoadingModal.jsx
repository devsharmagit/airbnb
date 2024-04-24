import React from 'react'
import ModalContainer from './ModalContainer';
import Paragrapgh from '../typography/Paragrapgh';


const LoadingModal = ({ isOpen, text}) => {
  return (
    <ModalContainer isOpen={isOpen} >

    <div className='flex-col w-screen flex items-center justify-center  overflow-x-hidden h-screen fixed top-0 left-0 bg-white bg-opacity-80 backdrop-blur-sm z-[111111111] overflow-scroll'>
    <div
  className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"
  role="status">
</div>
<div className='px-4'>

<Paragrapgh className={"font-semibold text-primary mt-5 text-center"} text={text} />
</div>

     
    </div>
        </ModalContainer>
  )
}

export default LoadingModal
