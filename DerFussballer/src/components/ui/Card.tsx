import React from 'react'
export function Card({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`rounded-2xl bg-white shadow-soft border border-gray-200 ${className}`}>{children}</div>
}
export function CardHeader({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`px-5 pt-4 ${className}`}>{children}</div>
}
export function CardContent({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`px-5 pb-4 ${className}`}>{children}</div>
}