import { useEffect, useState } from 'react'
import GroupSelector from './components/GroupSelector'
import Schedule from './components/Schedule'
import type { Group } from './types'

function App() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-25">
      {!selectedGroup ? (
        <GroupSelector darkMode={darkMode} onToggleTheme={() => setDarkMode(value => !value)} onSelectGroup={setSelectedGroup} />
      ) : (
        <Schedule 
          group={selectedGroup} 
          onBack={() => setSelectedGroup(null)} 
        />
      )}
    </div>
  )
}

export default App
