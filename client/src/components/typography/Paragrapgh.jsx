import React from "react";

function Paragrapgh({ text, className }) {
  return (
    <p className={`poppings text-base font-normal leading-tight text-gray-600 ${className}`}>
      {text}
    </p>
  );
}

export default Paragrapgh;
