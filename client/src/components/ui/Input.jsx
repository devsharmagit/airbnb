import React from 'react';

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
      {errorMsg && (
        <p className="text-red-500 font-medium text-sm pl-2 mont">{errorMsg}</p>
      )}
    </>
  );
});

export default Input;
