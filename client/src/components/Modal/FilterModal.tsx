import React from "react";
import ModalContainer from "./ModalContainer.tsx";
import Filter from "../Filter.tsx";

const FilterModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div 
        className={`fixed left-0 top-0 z-[111111111] h-screen w-screen overflow-scroll overflow-x-hidden bg-black transition-all duration-300 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
        } backdrop-blur-sm`}
      >
            <Filter setFilterOpen={setIsOpen} />  
      </div>
    </ModalContainer>
  );
};

export default FilterModal;
