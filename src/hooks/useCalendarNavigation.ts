// hooks/useCalendarNavigation.ts
import { useCallback } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import type { CalendarView } from '../types/calendar';

export const useCalendarNavigation = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void,
  view: CalendarView
) => {
  const next = useCallback