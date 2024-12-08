// components/calendar/DayGrid.tsx
import React from 'react';
import { format } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';

interface DayGridProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  selectedTime: number | null;
  onTimeSelect: (hour: number) => void;
}

export const DayGrid: React.FC<DayGridProps> = ({
  date,
  events,
  onEventClick,
  selectedTime,
  onTimeSelect
}) => {
  // 生成24小时的时间槽
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventHour = event.start.getHours();
      return eventHour === hour;
    });
  };

  // 判断时间槽是否被选中
  const isTimeSelected = (hour: number) => {
    return hour === selectedTime;
  };

  return (
    <div className="flex flex-col h-full">
      {/* 日期头部 */}
      <div className="text-center py-4 mb-4">
        <div className="font-semibold text-2xl">{format(date, 'EEEE')}</div>
        <div className="text-gray-500 text-lg">{format(date, 'MMMM d, yyyy')}</div>
      </div>

      {/* 时间格子 */}
      <div className="flex-1 overflow-y-auto">
        {timeSlots.map(hour => (
          <div 
            key={hour} 
            className={`flex border-b border-gray-100 min-h-[60px] cursor-pointer
              ${isTimeSelected(hour) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            onClick={() => onTimeSelect(hour)}
          >
            {/* 时间列 */}
            <div className="w-20 py-2 text-right pr-4 text-gray-500 select-none">
              {format(new Date().setHours(hour), 'HH:mm')}
            </div>
            {/* 事件区域 */}
            <div className="flex-1 relative">
              {getEventsForHour(hour).map(event => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡
                    onEventClick?.(event);
                  }}
                  className="absolute left-0 right-2 px-3 py-1 m-1 rounded 
                    bg-blue-100 text-blue-600 cursor-pointer hover:bg-blue-200"
                  style={{
                    top: `${(event.start.getMinutes() / 60) * 100}%`,
                    height: `${((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100}%`,
                    minHeight: '20px'
                  }}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="text-xs">
                    {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};