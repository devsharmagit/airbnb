import React from "react";
import ModalContainer from "./ModalContainer";
import Button from "../ui/Button";

const ImageModal = ({ photos, isOpen, setIsOpen }) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className="fixed left-0 top-0 z-[11111] h-screen w-screen overflow-scroll overflow-x-hidden bg-white bg-opacity-50 backdrop-blur-sm">
        <Button text={"close"} onClick={() => setIsOpen(false)} />

        <div className="m-auto flex max-w-2xl flex-col items-center justify-center gap-3 p-4">
          {photos.map((value) => {
            return <img src={value.url} className="w-full" alt="" loading="lazy" />;
          })}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ImageModal;
