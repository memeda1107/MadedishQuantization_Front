
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
   {
    start: '2025-05-08T00:00:00',
    id: createEventId(),
    title: 'Timed event',
    
  }
]

export function createEventId() {
  return String(eventGuid++)
}
