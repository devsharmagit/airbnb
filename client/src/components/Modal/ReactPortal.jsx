import { createPortal } from "react-dom";

export function ReactPortal({ children, wrapperId = "modal" }) {
  return createPortal(children, document.getElementById("modal"));
}
