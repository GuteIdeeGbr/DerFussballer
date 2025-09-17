import type { DatabaseV1, Team, AnyDatabase } from '@/types'

const LOCAL_KEY = 'vereinsmanager:lastDb'

export function newDatabase(name: string): DatabaseV1 {
  const now = new Date().toISOString()
  return {
    version: 1,
    name,
    createdAt: now,
    updatedAt: now,
    teams: []
  }
}

export function addTeam(db: DatabaseV1, team: Omit<Team, 'id'> & { id?: string }): DatabaseV1 {
  const id = team.id ?? crypto.randomUUID()
  const next: DatabaseV1 = { ...db, updatedAt: new Date().toISOString(), teams: [...db.teams, { ...team, id }] }
  return next
}

export function updateTeam(db: DatabaseV1, team: Team): DatabaseV1 {
  const idx = db.teams.findIndex(t => t.id === team.id)
  if (idx === -1) return db
  const nextTeams = db.teams.slice()
  nextTeams[idx] = { ...team }
  return { ...db, updatedAt: new Date().toISOString(), teams: nextTeams }
}

export function deleteTeam(db: DatabaseV1, id: string): DatabaseV1 {
  const nextTeams = db.teams.filter(t => t.id !== id)
  return { ...db, updatedAt: new Date().toISOString(), teams: nextTeams }
}

export function triggerDownload(filename: string, content: string, mime = 'application/json') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function saveDbToFile(db: DatabaseV1) {
  const json = JSON.stringify(db, null, 2)
  const safe = db.name.replace(/[^a-z0-9_-]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const file = `db_${safe || 'vereine'}_${new Date().toISOString().slice(0,10)}.json`
  triggerDownload(file, json)
}

export function persistLocal(db: DatabaseV1) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(db))
}

export function loadLocal(): DatabaseV1 | null {
  const raw = localStorage.getItem(LOCAL_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as AnyDatabase
    return validateDb(parsed)
  } catch {
    return null
  }
}

export async function loadDbFromFile(file: File): Promise<DatabaseV1> {
  const text = await file.text()
  const parsed = JSON.parse(text) as AnyDatabase
  return validateDb(parsed)
}

export function validateDb(obj: AnyDatabase): DatabaseV1 {
  if (!obj || typeof obj !== 'object') throw new Error('Ungültige Datenbankdatei.')
  if (obj.version !== 1) throw new Error('Nicht unterstützte Datenbankversion.')
  if (!Array.isArray(obj.teams)) throw new Error('Datenbank enthält keine gültige Mannschaftsliste.')
  // Basic shape checks
  obj.teams.forEach((t, i) => {
    if (!t.id || !t.name || !t.foundingDate || !t.crestDataUrl) {
      throw new Error(`Team Nr. ${i + 1} ist unvollständig.`)
    }
  })
  return obj as DatabaseV1
}