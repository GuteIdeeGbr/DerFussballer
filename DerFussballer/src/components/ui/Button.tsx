import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost', size?: 'sm' | 'md' }
export default function Button({ className = '', variant='primary', size='md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center font-medium rounded-2xl transition shadow-soft disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'
  const variants = variant === 'primary'
    ? 'bg-brand-600 hover:bg-brand-700 text-white'
    : variant === 'secondary'
    ? 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
    : 'bg-transparent hover:bg-gray-100 text-gray-700'
  return <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />
}