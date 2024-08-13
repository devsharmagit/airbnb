import React from "react";

interface ButtonArgTypes {
  className?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  id?: string;
}

const Button = ({
  className,
  text,
  onClick,
  type = "submit",
  disabled,
  ...other
}: ButtonArgTypes) => {
  return (
    <button
      type={type}
      className={`m-auto mt-4 block w-fit rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {text}
    </button>
  );
};

export default Button;
