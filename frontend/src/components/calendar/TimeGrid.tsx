// TimeGrid.tsx
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';

interface TimeGridProps {
  days: Date[];
  events: CalendarEvent[];
  timeSlots: number[];
  selectedDate: Date;
  selectedTime: number | null;  // 新增: 选中的时间
  onSelectDateTime: (date: Date, hour: number) => void;  // 新增: 选择日期和时间的回调
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  days,
  events,
  timeSlots,
  selectedDate,
  selectedTime,
  onSelectDateTime
}) => {
  const getEventsForTimeSlot = (date: Date, hour: number) => {
    return events.filter(event => {
      const eventHour = event.start.getHours();
      return isSameDay(event.start, date) && eventHour === hour;
    });
  };

  // 判断单元格是否被选中
  const isCellSelected = (date: Date, hour: number) => {
    return isSameDay(date, selectedDate) && hour === selectedTime;
  };

  return (
    <div className="mt-4">
      {/* 日期头部 */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-4" />
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-4 text-center cursor-pointer transition-colors
              ${isSameDay(day, selectedDate) ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
          >
            <div className="font-medium">{format(day, 'EEE')}</div>
            <div className="text-sm text-gray-500">{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* 时间格子 */}
      <div className="grid grid-cols-8">
        {/* 时间列 */}
        <div className="border-r border-gray-200">
          {timeSlots.map(hour => (
            <div key={hour} className="h-16 p-2 text-right text-sm text-gray-500">
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>

        {/* 每天的时间格子 */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="border-r border-gray-200">
            {timeSlots.map(hour => (
              <div
                key={hour}
                onClick={() => onSelectDateTime(day, hour)}
                className={`h-16 border-b border-gray-200 relative cursor-pointer
                  ${isCellSelected(day, hour) ? 'bg-blue-200' : ''}
                  ${isSameDay(day, selectedDate) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                {getEventsForTimeSlot(day, hour).map(event => (
                  <div
                    key={event.id}
                    className="absolute inset-x-1 bg-blue-100 text-blue-600 p-1 rounded text-sm truncate"
                    style={{
                      top: `${(event.start.getMinutes() / 60) * 100}%`,
                      height: `${((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100}%`,
                      minHeight: '20px'
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};