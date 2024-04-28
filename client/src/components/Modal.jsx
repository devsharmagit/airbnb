import React from "react";
import Button from "./ui/Button";

function Modal({ isOpen, setIsOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-[11111] h-screen w-screen overflow-scroll bg-white bg-opacity-70 backdrop-blur-md">
      <Button text={"close"} onClick={() => setIsOpen(false)} />

      <div className="m-auto flex max-w-2xl flex-col items-center justify-center gap-3 p-4">
        {children}
      </div>
    </div>
  );
}

export default Modal;
