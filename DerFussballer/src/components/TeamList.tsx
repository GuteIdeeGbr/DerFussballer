import React, { useMemo, useState } from 'react'
import Input from './ui/Input'
import TeamCard from './TeamCard'
import Modal from './ui/Modal'
import TeamForm from './TeamForm'
import type { Team } from '@/types'

export default function TeamList({ teams, onChange }: { teams: Team[], onChange: (updated: Team[]) => void }) {
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Team | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teams
    return teams.filter(t => t.name.toLowerCase().includes(q) || t.filterName.toLowerCase().includes(q))
  }, [teams, query])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <Input placeholder="Suchen (Name oder Filter)..." value={query} onChange={e => setQuery(e.target.value)} />
        <div className="text-sm text-gray-500">Gespeicherte Mannschaften: <strong>{teams.length}</strong></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(team => (
          <TeamCard key={team.id} team={team} onEdit={(t)=> setEditing(t)} onDelete={(id)=> onChange(teams.filter(x => x.id !== id))} />
        ))}
        {filtered.length === 0 && <p className="text-gray-500">Keine Mannschaften gefunden.</p>}
      </div>

      <Modal open={!!editing} title="Mannschaft bearbeiten" onClose={() => setEditing(null)}>
        {editing && (
          <TeamForm
            initial={editing}
            onSubmit={(partial) => {
              const updated: Team = { ...editing, ...partial }
              onChange(teams.map(t => t.id === editing.id ? updated : t))
              setEditing(null)
            }}
          />
        )}
      </Modal>
    </div>
  )
}