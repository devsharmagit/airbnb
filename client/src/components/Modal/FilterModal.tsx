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
      <div className="fixed left-0 top-0 z-[111111111] h-screen w-screen overflow-scroll overflow-x-hidden bg-black bg-opacity-50 backdrop-blur-sm">
        <Button text={"close"} onClick={() => setIsOpen(false)} />

        <div className="m-auto flex max-w-3xl items-center justify-center gap-3 p-4">
          <Filter setFilterOpen={setIsOpen} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default FilterModal;
