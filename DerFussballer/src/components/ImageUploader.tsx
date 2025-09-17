import React, { useRef, useState } from 'react'
import Button from './ui/Button'
import { resizeToPng1024Square } from '@/utils/image'

export default function ImageUploader({ value, onChange }: { value?: string, onChange: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Bitte eine Bilddatei wählen.')
      return
    }
    try {
      const dataUrl = await resizeToPng1024Square(file)
      onChange(dataUrl)
    } catch (e: any) {
      setError(e.message || 'Bild konnte nicht verarbeitet werden.')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="size-24 rounded-2xl bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center">
          {value ? <img src={value} alt="Wappen" className="object-cover w-full h-full" /> : <span className="text-gray-400 text-xs text-center px-2">Kein Wappen</span>}
        </div>
        <div className="flex gap-2">
          <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0]; if (f) handleFile(f)
          }}/>
          <Button type="button" onClick={() => inputRef.current?.click()}>Wappen wählen</Button>
          {value && (
            <Button type="button" variant="secondary" onClick={() => onChange('')}>Entfernen</Button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500">Das Bild wird automatisch auf <strong>1024×1024 PNG</strong> skaliert (transparenter Hintergrund).</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}