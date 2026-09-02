import { useMemo, useState } from 'react'
import type { Group, Lesson, ScheduleFilter } from '../types'
import { getLessonsForGroup } from '../data'

const days = ['', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П’ятниця"]
const types = { lecture: ['Лекція', 'blue'], practice: ['Практика', 'green'], lab: ['Лабораторна', 'orange'] } as const

export default function Schedule({ group, onBack }: { group: Group; onBack: () => void }) {
  const [filter, setFilter] = useState<ScheduleFilter>('week')
  const [accessLesson, setAccessLesson] = useState<Lesson | null>(null)
  const today = new Date().getDay() || 7
  const lessons = useMemo(() => getLessonsForGroup(group.id), [group.id])
  const currentWeek = 'odd'
  const visible = (filter === 'today' ? lessons.filter(l => l.dayOfWeek === today) : lessons)
    .filter(l => filter === 'all' || l.weekType === 'all' || l.weekType === currentWeek)
  const grouped = useMemo(() => visible.reduce<Record<number, Lesson[]>>((all, lesson) => { (all[lesson.dayOfWeek] ??= []).push(lesson); return all }, {}), [visible])
  const tabs: [ScheduleFilter, string][] = [['today', 'На сьогодні'], ['week', 'Цього тижня'], ['all', 'Весь розклад']]

  return <main className="schedule-page">
    <header className="topbar"><button className="back-button" onClick={onBack}><b>←</b><span>Змінити групу</span></button><span /></header>
    <div className="schedule-wrap">
      <section className="schedule-intro"><div><h1>{group.name}</h1></div><div className="week-badge">Непарний тиждень</div></section>
      <nav className="tabs" aria-label="Період розкладу">{tabs.map(([value, label]) => <button className={filter === value ? 'active' : ''} key={value} onClick={() => setFilter(value)}>{label}</button>)}</nav>
      <section className="schedule-list">{Object.entries(grouped).map(([day, dayLessons]) => <div className={`day-block ${Number(day) === today ? 'is-today' : ''}`} key={day}><div className="day-title"><span>{days[Number(day)]}</span>{Number(day) === today && <small>СЬОГОДНІ</small>}</div><div className="lesson-list">{dayLessons.map(lesson => <LessonItem lesson={lesson} key={lesson.id} onOpen={setAccessLesson} />)}</div></div>)}</section>
      {!visible.length && <div className="empty-state"><strong>Сьогодні занять немає</strong><span>Можеш видихнути. Або повторити матеріал.</span></div>}
    </div>{accessLesson && <AccessModal lesson={accessLesson} onClose={() => setAccessLesson(null)} />}
  </main>
}

function LessonItem({ lesson, onOpen }: { lesson: Lesson; onOpen: (lesson: Lesson) => void }) {
  const [label, color] = types[lesson.type]
  const service = lesson.access ? 'access' : lesson.link?.includes('meet.google') ? 'meet' : lesson.link ? 'zoom' : ''
  const open = () => lesson.access ? onOpen(lesson) : lesson.link && window.open(lesson.link, '_blank', 'noopener,noreferrer')
  return <article className={`lesson ${service ? 'is-clickable' : ''}`} onClick={open} onKeyDown={event => event.key === 'Enter' && open()} role={service ? 'button' : undefined} tabIndex={service ? 0 : undefined}><div className="lesson-time"><strong>{lesson.startTime}</strong><span>{lesson.endTime}</span></div><div className="lesson-line" /><div className="lesson-info"><div className="lesson-heading"><h3>{lesson.subject}</h3><span className={`tag ${color}`}>{label}</span></div>{lesson.teacher && <p>{lesson.teacher}</p>}<small>{lesson.period}</small></div>{service && <ServiceIcon service={service} />}</article>
}

function ServiceIcon({ service }: { service: string }) {
  const meet = service === 'meet'
  return <span className={`service-icon ${meet ? 'meet' : service === 'access' ? 'access' : 'zoom'}`} aria-label={meet ? 'Google Meet' : 'Zoom'}><img src={`https://api.iconify.design/${meet ? 'lineicons/google-meet' : 'bxl/zoom-workplace'}.svg`} alt="" /></span>
}

function AccessModal({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  const [copied, setCopied] = useState<'code' | 'password' | null>(null)
  const [copyError, setCopyError] = useState(false)
  const copy = async (value: string, field: 'code' | 'password') => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(value)
      setCopied(field)
      setCopyError(false)
      window.setTimeout(() => setCopied(current => current === field ? null : current), 2000)
    } catch {
      setCopyError(true)
    }
  }
  return <div className="modal-backdrop" onClick={onClose}><section className="access-modal" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="access-title"><button className="modal-close" onClick={onClose} aria-label="Закрити">×</button><p className="modal-label">ZOOM</p><h2 id="access-title">{lesson.subject}</h2><div className="access-row"><span>Код конференції</span><strong>{lesson.access?.code}</strong><button className={copied === 'code' ? 'copied' : ''} onClick={() => copy(lesson.access?.code ?? '', 'code')} aria-label="Скопіювати код конференції">{copied === 'code' ? 'Скопійовано' : 'Копіювати'}</button></div><div className="access-row"><span>Пароль</span><strong>{lesson.access?.password}</strong><button className={copied === 'password' ? 'copied' : ''} onClick={() => copy(lesson.access?.password ?? '', 'password')} aria-label="Скопіювати пароль">{copied === 'password' ? 'Скопійовано' : 'Копіювати'}</button></div>{copyError && <p className="copy-error" role="alert">Не вдалося скопіювати. Спробуй ще раз.</p>}<p className="sr-only" aria-live="polite">{copied ? 'Скопійовано' : ''}</p></section></div>
}
