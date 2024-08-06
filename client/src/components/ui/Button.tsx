import React from "react";

const Button = ({ className, text, onClick, type, ...other }) => {
  return (
    <button
      type={type || "submit"}
      className={`m-auto mt-4 block w-fit rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 ${className}`}
      onClick={onClick}
      {...other}
    >
      {text}
    </button>
  );
};

export default Button;
