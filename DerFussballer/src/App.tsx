import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { DatabaseV1, Team } from './types'
import { addTeam, loadDbFromFile, loadLocal, newDatabase, persistLocal, saveDbToFile, updateTeam, deleteTeam } from './lib/db'
import { Card, CardContent, CardHeader } from './components/ui/Card'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import TeamForm from './components/TeamForm'
import TeamList from './components/TeamList'
import DatabaseBar from './components/DatabaseBar'
import { FolderOpen, Plus, Save } from 'lucide-react'

type Tab = 'create' | 'manage'

export default function App() {
  const [db, setDb] = useState<DatabaseV1>(() => loadLocal() ?? newDatabase('Meine Vereine'))
  const [tab, setTab] = useState<Tab>('create')

  useEffect(() => {
    persistLocal(db)
  }, [db])

  useEffect(() => {
    const handler = async (e: any) => {
      const file: File = e.detail
      try {
        const loaded = await loadDbFromFile(file)
        setDb(loaded)
      } catch (err: any) {
        alert(err.message || 'Fehler beim Laden der Datenbank.')
      }
    }
    window.addEventListener('db-load-file' as any, handler)
    return () => window.removeEventListener('db-load-file' as any, handler)
  }, [])

  function handleAddTeam(partial: Omit<Team, 'id'>) {
    const next = addTeam(db, partial)
    setDb(next)
    setTab('manage')
  }

  function handleChangeTeams(teams: Team[]) {
    setDb({ ...db, teams, updatedAt: new Date().toISOString() })
  }

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-8">
      <header className="mb-6">
        <div className="flex items-start md:items-center gap-3 md:gap-5 flex-col md:flex-row">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-brand-600 text-white grid place-items-center font-bold">VM</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Vereinsmanager</h1>
              <p className="text-gray-500 text-sm">Datenbanken erstellen, speichern, laden &amp; Mannschaften verwalten</p>
            </div>
          </div>
          <div className="flex-1" />
          <DatabaseBar db={db} setDb={setDb} onNew={() => setDb(newDatabase('Neue Datenbank'))} />
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant={tab==='create'?'primary':'secondary'} onClick={()=> setTab('create')}><Plus className="size-4 mr-2" /> Mannschaft anlegen</Button>
          <Button variant={tab==='manage'?'primary':'secondary'} onClick={()=> setTab('manage')}><FolderOpen className="size-4 mr-2" /> Mannschaften verwalten</Button>
          <Button className="ml-auto" onClick={()=> saveDbToFile(db)}><Save className="size-4 mr-2" /> Datenbank speichern</Button>
        </div>
      </header>

      <main className="grid gap-6">
        {tab === 'create' && (
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Neue Mannschaft anlegen</h2>
              </CardHeader>
              <CardContent>
                <TeamForm onSubmit={handleAddTeam} />
              </CardContent>
            </Card>
          </motion.div>
        )}
        {tab === 'manage' && (
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Mannschaften verwalten</h2>
              </CardHeader>
              <CardContent>
                <TeamList teams={db.teams} onChange={handleChangeTeams} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      <footer className="mt-10 text-center text-xs text-gray-400">
        <p>Alle Daten bleiben im Browser. Zum Teilen/Backup die Datenbank über „Speichern“ als JSON herunterladen und später wieder „Laden“.</p>
      </footer>
    </div>
  )
}