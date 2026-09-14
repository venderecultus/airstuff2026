export interface Group {
  id: string
  name: string
  course: number
}

export interface Lesson {
  id: string
  subject: string
  teacher: string
  room: string
  type: 'lecture' | 'practice' | 'lab'
  startTime: string
  endTime: string
  dayOfWeek: number // 1-7 (Пн-Вс)
  date?: string
  weekType: 'all' | 'odd' | 'even'
  period?: string
  link?: string
  access?: { code: string; password: string }
}

export interface ScheduleData {
  group: Group
  lessons: Lesson[]
}

export type ScheduleFilter = 'today' | 'week' | 'all'
