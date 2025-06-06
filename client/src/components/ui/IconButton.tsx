
interface IconButton {
  type?: "submit" | "reset" | "button";
  onClick?: ()=>void;
  className?: string;
  Icon?: any;
  text?: string;
  IconClass?: string;
}

function IconButton({ type, onClick, className, Icon, text, IconClass }: IconButton) {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className={`box-border rounded-full bg-gray-100 p-1 text-center text-gray-700 hover:bg-gray-200  ${className}`}
    >
      {text && `${text}`}
      {Icon && <Icon className={`h-6 w-6 ${IconClass}`} />}
    </button>
  );
}

export default IconButton;
