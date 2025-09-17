import React, { useState } from 'react'
import Input from './ui/Input'
import Label from './ui/Label'
import Button from './ui/Button'
import ImageUploader from './ImageUploader'
import { motion } from 'framer-motion'
import type { Team } from '@/types'

export default function TeamForm({ onSubmit, initial }: { onSubmit: (team: Omit<Team, 'id'>) => void, initial?: Partial<Team> }) {
  const [name, setName] = useState(initial?.name || '')
  const [filterName, setFilter] = useState(initial?.filterName || '')
  const [foundingDate, setDate] = useState(initial?.foundingDate || '')
  const [crest, setCrest] = useState(initial?.crestDataUrl || '')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Vereinsname ist erforderlich.')
    if (!foundingDate) return setError('Gründungsdatum ist erforderlich.')
    if (!crest) return setError('Bitte ein Wappen hochladen.')
    onSubmit({ name: name.trim(), filterName: filterName.trim(), foundingDate, crestDataUrl: crest })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Vereinsname</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="z. B. FC Beispielstadt" />
        </div>
        <div>
          <Label htmlFor="filter">Filtername</Label>
          <Input id="filter" value={filterName} onChange={e => setFilter(e.target.value)} placeholder="Kurz-/Filtername" />
        </div>
        <div>
          <Label htmlFor="date">Gründungsdatum</Label>
          <Input id="date" type="date" value={foundingDate} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="md:row-span-2">
          <Label>Wappen (1024×1024 PNG)</Label>
          <ImageUploader value={crest} onChange={setCrest} />
        </div>
      </div>
      {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-600">{error}</motion.p>}
      <div className="flex gap-3 pt-2">
        <Button type="submit">Mannschaft speichern</Button>
        <Button type="reset" variant="secondary" onClick={() => { setName(''); setFilter(''); setDate(''); setCrest(''); setError(null) }}>Zurücksetzen</Button>
      </div>
    </form>
  )
}