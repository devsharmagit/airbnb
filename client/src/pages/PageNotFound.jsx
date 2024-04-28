import React from "react";
import Paragrapgh from "../components/typography/Paragrapgh";

const PageNotFound = () => {
  return (
    <div className="flex h-40 items-center justify-center text-center">
      <Paragrapgh text={"The page you are looking for does not exist."} />
    </div>
  );
};

export default PageNotFound;
