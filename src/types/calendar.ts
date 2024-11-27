// types/calendar.ts
export type CalendarViewType = 'day' | 'week' | 'month';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  isAllDay?: boolean; 
}