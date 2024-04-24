import React from 'react'

function IconButton({type, onClick, className, Icon, text, IconClass}) {
  return (
    <button type={type} onClick={onClick} className={ `p-1 bg-gray-100 hover:bg-gray-200 text-center box-border text-gray-700 rounded-full  ${className}`}>
   {text && `${text}`}
   {
    Icon && 
<Icon className={`w-6 h-6 ${IconClass}`}/>
   }
  </button>
  )
}

export default IconButton
