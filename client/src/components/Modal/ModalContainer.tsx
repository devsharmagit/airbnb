import React from "react";
import { ReactPortal } from "./ReactPortal.tsx";

const ModalContainer = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return <ReactPortal>{children}</ReactPortal>;
};

export default ModalContainer;
