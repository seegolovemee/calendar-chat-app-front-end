import { useState, useEffect } from 'react';
import { startOfWeek, addDays } from 'date-fns';
import type { CalendarEvent } from '../types';

export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDays = getWeekDays(selectedDate);

  return {
    selectedDate,
    setSelectedDate,
    weekDays,
    events,
    setEvents,
  };
};