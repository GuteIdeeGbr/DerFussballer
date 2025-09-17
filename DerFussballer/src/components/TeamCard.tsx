import React from 'react'
import { Card, CardContent, CardHeader } from './ui/Card'
import Button from './ui/Button'
import type { Team } from '@/types'

export default function TeamCard({ team, onEdit, onDelete }: { team: Team, onEdit: (t: Team) => void, onDelete: (id: string) => void }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img src={team.crestDataUrl} alt={team.name} className="size-16 rounded-xl border border-gray-200 object-cover" />
          <div className="min-w-0">
            <h4 className="font-semibold text-lg truncate">{team.name}</h4>
            <p className="text-sm text-gray-500">Gegründet am {team.foundingDate}</p>
            {team.filterName && <p className="text-xs text-gray-400 mt-1">Filter: {team.filterName}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(team)}>Bearbeiten</Button>
          <Button variant="secondary" onClick={() => onDelete(team.id)}>Löschen</Button>
        </div>
      </CardContent>
    </Card>
  )
}