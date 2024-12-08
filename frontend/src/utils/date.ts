// utils/date.ts
import { format, isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const formatDate = (date: Date, formatString: string = 'PPP'): string => {
  return format(date, formatString);
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getTimeSlots = (startHour: number = 0, endHour: number = 24): Date[] => {
  const slots: Date[] = [];
  const baseDate = new Date();
  baseDate.setMinutes(0);
  baseDate.setSeconds(0);
  baseDate.setMilliseconds(0);

  for (let hour = startHour; hour < endHour; hour++) {
    baseDate.setHours(hour);
    slots.push(new Date(baseDate));
  }

  return slots;
};

export const isEventInDay = (event: { start: Date; end: Date }, date: Date): boolean => {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  return isWithinInterval(event.start, { start: dayStart, end: dayEnd }) ||
    isWithinInterval(event.end, { start: dayStart, end: dayEnd });
};