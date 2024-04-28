import React from "react";

const TextArea = React.forwardRef(({ errorMsg, ...other }, ref) => {
  function autoExpand(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = parseInt(textarea.scrollHeight + 5) + "px";
  }

  return (
    <>
      <textarea onInput={(e) => autoExpand(e.target)} ref={ref} {...other}></textarea>
      {errorMsg && <p className="mont pl-2 text-sm font-medium text-red-500"> {errorMsg} </p>}
    </>
  );
});

export default TextArea;
