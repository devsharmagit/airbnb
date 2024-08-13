import React from "react";

interface InputTypes {
  type?: string;
  placeholder?: string;
  className?: string;
  errorMsg?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = React.forwardRef(
  ({ type, placeholder, className, errorMsg, onChange, ...others }: InputTypes, ref: any) => {
    return (
      <>
        <input
          type={type || "text"}
          placeholder={placeholder || "Name"}
          ref={ref}
          className={className}
          {...others}
        />
        {errorMsg && <p className="mont pl-2 text-sm font-medium text-red-500">{errorMsg}</p>}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
