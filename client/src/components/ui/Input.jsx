import React from "react";

const Input = React.forwardRef(({ type, placeholder, className, errorMsg, ...others }, ref) => {
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
});

export default Input;
