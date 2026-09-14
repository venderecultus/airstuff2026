import type { Group } from '../types'
import { groups } from '../data'

export default function GroupSelector({ darkMode, onToggleTheme, onSelectGroup }: { darkMode: boolean; onToggleTheme: () => void; onSelectGroup: (group: Group) => void }) {
  return <main className="selection-page">
    <div className="selection-wrap">
      <button className="theme-toggle" onClick={onToggleTheme} aria-label={darkMode ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}>{darkMode ? '☀' : '☾'} <span>{darkMode ? 'Світла тема' : 'Темна тема'}</span></button>
      <div className="selector-card">
        <div className="card-heading"><h2>ОБЕРІТЬ ГРУПУ</h2></div>
        <div className="group-grid">{groups.map(group => <button className="group-option" key={group.id} onClick={() => onSelectGroup(group)}><span>{group.name}</span><b>↗</b></button>)}</div>
      </div>
    </div>
  </main>
}
