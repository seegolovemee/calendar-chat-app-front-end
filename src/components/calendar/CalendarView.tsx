// components/calendar/CalendarView.tsx
import React, { useState, useCallback } from 'react';
import { 
  addDays, 
  subDays, 
  addWeeks, 
  subWeeks, 
  addMonths, 
  subMonths,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval
} from 'date-fns';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { TimeGrid } from './TimeGrid';
import { DayGrid } from './DayGrid';
import { EventModal } from './EventModal';
import type { CalendarEvent, CalendarViewType } from '../../types/calendar';

export const CalendarView: React.FC = () => {
  // 基础状态
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>('month');
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);
  
  // 事件相关状态
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 生成时间槽（0-23小时）
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // 获取视图中显示的日期范围
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

  // 导航处理
  const handlePrev = () => {
    switch (view) {
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'day':
        setCurrentDate(prev => subDays(prev, 1));
        break;
    }
  };

  const handleNext = () => {
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
  };

  // 视图切换处理
  const handleViewChange = (newView: CalendarViewType) => {
    setView(newView);
    if (newView === 'day') {
      setCurrentDate(selectedDate);
    }
  };

  // 日期时间选择处理
  const handleDateTimeSelect = (date: Date, hour: number) => {
    setSelectedDate(date);
    setSelectedTime(hour);
    setSelectedEndTime(hour + 1);
  };

  // 处理日视图时间选择
  const handleDayTimeSelect = (hour: number) => {
    setSelectedTime(hour);
    setSelectedEndTime(hour + 1);
  };

  // 事件处理
  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
    // TODO: 实现事件详情查看/编辑功能
  };

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTime(null);
    setSelectedEndTime(null);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(), // 简单的ID生成
    };
    setEvents(prev => [...prev, newEvent]);
    handleCloseModal();
  };

  return (
    <div className="h-full w-full max-w-6xl mx-auto p-4">
      {/* 日历头部 */}
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={handleViewChange}
        onPrevMonth={handlePrev}
        onNextMonth={handleNext}
        onAddEvent={handleAddEvent}
      />

      {/* 月视图 */}
      {view === 'month' && (
        <CalendarGrid
          days={getDaysInView()}
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          view={view}
        />
      )}

      {/* 周视图 */}
      {view === 'week' && (
        <TimeGrid
          days={getDaysInView()}
          events={events}
          timeSlots={timeSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDateTime={handleDateTimeSelect}
        />
      )}

      {/* 日视图 */}
      {view === 'day' && (
        <DayGrid
          date={currentDate}
          events={events.filter(event => 
            isSameDay(event.start, currentDate)
          )}
          onEventClick={handleEventClick}
          selectedTime={selectedTime}
          onTimeSelect={handleDayTimeSelect}
        />
      )}

      {/* 事件编辑模态框 */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        selectedDate={view === 'day' ? currentDate : selectedDate}
        selectedStartHour={selectedTime}
        selectedEndHour={selectedEndTime}
      />
    </div>
  );
};

export default CalendarView;