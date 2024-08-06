import { createPortal } from "react-dom";

export function ReactPortal({ children = "modal" }) {
  return createPortal(children, document.getElementById("modal"));
}
