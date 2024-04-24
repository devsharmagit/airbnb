import React from "react";

const TextArea = React.forwardRef(({ errorMsg, ...other }, ref) => {
  function autoExpand(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = parseInt(textarea.scrollHeight + 5) + "px";
  }

  return (
    <>
      <textarea
        onInput={(e) => autoExpand(e.target)}
        ref={ref}
        {...other}
      ></textarea>
      {errorMsg && (
        <p className="text-red-500 font-medium text-sm pl-2 mont"> {errorMsg} </p>
      )}
    </>
  );
});

export default TextArea;
