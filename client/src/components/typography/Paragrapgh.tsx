import React from "react";

interface ParagrapghTypes {
  text?: string;
  className?: string;
}
function Paragrapgh({ text, className }: ParagrapghTypes) {
  return (
    <p className={`poppings text-base font-normal leading-tight text-gray-600 ${className}`}>
      {text}
    </p>
  );
}

export default Paragrapgh;
