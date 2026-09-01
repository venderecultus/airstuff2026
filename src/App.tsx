import { useState } from 'react'
import GroupSelector from './components/GroupSelector'
import Schedule from './components/Schedule'
import type { Group } from './types'

function App() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  return (
    <div className="min-h-screen bg-gray-25">
      {!selectedGroup ? (
        <GroupSelector onSelectGroup={setSelectedGroup} />
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
