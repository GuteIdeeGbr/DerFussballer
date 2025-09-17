import React from 'react'
import Button from './Button'

export default function Modal({ open, title, onClose, children }: { open: boolean, title: string, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-soft border border-gray-200">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-lg">{title}</h3>
            <Button variant="ghost" onClick={onClose} aria-label="Schließen">✕</Button>
          </div>
          <div className="p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}