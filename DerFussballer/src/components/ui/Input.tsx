import React from 'react'
type Props = React.InputHTMLAttributes<HTMLInputElement>
const Input = React.forwardRef<HTMLInputElement, Props>(({ className = '', ...props }, ref) => {
  return <input ref={ref} className={`w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 shadow-soft placeholder:text-gray-400 ${className}`} {...props} />
})
Input.displayName = 'Input'
export default Input