import React, { useRef } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { saveDbToFile } from '@/lib/db'
import type { DatabaseV1 } from '@/types'

export default function DatabaseBar({ db, setDb, onNew }: { db: DatabaseV1, setDb: (db: DatabaseV1) => void, onNew: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input value={db.name} onChange={e => setDb({ ...db, name: e.target.value })} placeholder="Datenbankname" />
      <Button onClick={onNew}>Neu</Button>
      <Button variant="secondary" onClick={() => fileRef.current?.click()}>Laden</Button>
      <Button onClick={() => saveDbToFile(db)}>Speichern</Button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => {
        const f = e.target.files?.[0]
        if (f) {
          // handled in App via hidden input passed through props? Simpler: dispatch custom event
          const ev = new CustomEvent('db-load-file', { detail: f })
          window.dispatchEvent(ev)
          e.currentTarget.value = ''
        }
      }}/>
      <div className="ml-auto text-sm text-gray-500">
        <span className="hidden sm:inline">Version:</span> v{db.version} • Aktualisiert: {new Date(db.updatedAt).toLocaleString()}
      </div>
    </div>
  )
}