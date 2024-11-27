// hooks/useCalendar.ts
import { useState, useCallback } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays 
} from 'date-fns';
import type { CalendarViewType } from '../types/calendar';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>('month');

  // 获取视图中显示的日期
  const getDaysInView = useCallback(() => {
    switch (view) {
      case 'month': {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfWeek(endOfMonth(currentDate));
        return eachDayOfInterval({ start, end });
      }
      case 'week': {
        const start = startOfWeek(currentDate);
        const end = endOfWeek(currentDate);
        return eachDayOfInterval({ start, end });
      }
      case 'day': {
        return [currentDate];
      }
    }
  }, [currentDate, view]);

  // 前进
  const next = useCallback(() => {
    switch (view) {
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
    }
  }, [view]);

  // 后退
  const prev = useCallback(() => {
    switch (view) {
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'day':
        setCurrentDate(prev => addDays(prev, -1));
        break;
    }
  }, [view]);

  // 更改视图时的处理
  const handleViewChange = useCallback((newView: CalendarViewType) => {
    setView(newView);
    // 确保当前日期在视图范围内
    if (newView === 'week') {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  return {
    currentDate,
    selectedDate,
    view,
    daysInView: getDaysInView(),
    setView: handleViewChange,
    nextMonth: next,
    prevMonth: prev,
    setSelectedDate,
    setCurrentDate
  };
};