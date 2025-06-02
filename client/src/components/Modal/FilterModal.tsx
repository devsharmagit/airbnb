import React from "react";
import ModalContainer from "./ModalContainer.tsx";
import Button from "../ui/Button.tsx";
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
        <div className="relative">
          <Button 
            text={"close"} 
            onClick={() => setIsOpen(false)} 
            className="absolute right-4 top-4 z-10"
          />

          <div 
            className={`m-auto flex max-w-3xl items-center justify-center gap-3 p-4 transition-all duration-300 ${
              isOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}
          >
            <Filter setFilterOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default FilterModal;
