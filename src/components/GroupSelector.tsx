import type { Group } from '../types'
import { groups } from '../data'

export default function GroupSelector({ onSelectGroup }: { onSelectGroup: (group: Group) => void }) {
  return <main className="selection-page">
    <div className="selection-wrap">
      <div className="selector-card">
        <div className="card-heading"><h2>ОБЕРІТЬ ГРУПУ</h2></div>
        <div className="group-grid">{groups.map(group => <button className="group-option" key={group.id} onClick={() => onSelectGroup(group)}><span>{group.name}</span><b>↗</b></button>)}</div>
      </div>
    </div>
  </main>
}
