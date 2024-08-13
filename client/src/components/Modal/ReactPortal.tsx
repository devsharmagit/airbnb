import React from "react";
import { createPortal } from "react-dom";

// putting ! in the end is very new to me
const modaDiv = document.getElementById("modal")!;

export function ReactPortal({ children }: { children: React.ReactNode }) {
  return createPortal(children, modaDiv);
}
