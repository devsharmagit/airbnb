import React from "react";

interface TextAreaArgTypes {
  errorMsg?: string;
}

const TextArea = React.forwardRef(({ errorMsg, ...other }: TextAreaArgTypes, ref: any) => {
  function autoExpand(textarea: any) {
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

// Add display name for debugging
TextArea.displayName = "TextArea";

export default TextArea;
