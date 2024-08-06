import React from "react";

function Heading({ text, className }) {
  return <h1 className={`mont text-2xl font-semibold ${className}`}>{text}</h1>;
}

export default Heading;
