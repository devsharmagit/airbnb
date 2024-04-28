import React from "react";
import ModalContainer from "./ModalContainer";
import Paragrapgh from "../typography/Paragrapgh";

const LoadingModal = ({ isOpen, text }) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className="fixed left-0 top-0 z-[111111111] flex  h-screen w-screen flex-col items-center justify-center overflow-scroll overflow-x-hidden bg-white bg-opacity-80 backdrop-blur-sm">
        <div
          className="text-surface inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <div className="px-4">
          <Paragrapgh className={"mt-5 text-center font-semibold text-primary"} text={text} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default LoadingModal;
