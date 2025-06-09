import React from "react";
import ModalContainer from "./ModalContainer.tsx";
import Button from "../ui/Button.tsx";
import { ProfilePhotoType } from "../../types/file.ts";

interface ImageModalTypes {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photos: ProfilePhotoType[];
}

const ImageModal = ({ photos, isOpen, setIsOpen }: ImageModalTypes) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className="fixed left-0 top-0 z-[11111] h-screen w-screen overflow-scroll overflow-x-hidden bg-white bg-opacity-50 backdrop-blur-sm">
        <Button text={"close"} onClick={() => setIsOpen(false)} className="mx-auto mt-5" />

        <div className="m-auto flex max-w-2xl flex-col items-center justify-center gap-3 p-4">
          {photos.map((value, index) => {
            return <img key={index} src={value.url} className="w-full" alt="" loading="lazy" />;
          })}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ImageModal;
