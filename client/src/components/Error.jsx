import React from "react";
import Paragrapgh from "./typography/Paragrapgh";
import { CircleExlamanation } from "../assets/svgs";

const Error = () => {
  return (
    <div className="px-4 py-4 text-center ">
      <CircleExlamanation className={"m-auto mb-4 h-10 w-10 text-primary"} />
      <Paragrapgh text={"Something went wrong server side."} />
    </div>
  );
};

export default Error;
