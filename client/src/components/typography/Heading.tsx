import React from "react";

interface HeadingType {
  text?: string;
  className?: string;
}

function Heading({ text, className }: HeadingType) {
  return <h1 className={`mont text-2xl font-semibold ${className}`}>{text}</h1>;
}

export default Heading;
