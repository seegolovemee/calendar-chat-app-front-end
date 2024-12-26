// components/calendar/DayGrid.tsx
import React from 'react';
import { format, addHours, isSameHour, isWithinInterval, startOfDay, getHours } from 'date-fns';
import { CalendarEvent as ICalendarEvent } from '../../types/calendar';
import { CalendarEvent } from './CalendarEvent';

interface DayGridProps {
  date: Date;
  events: ICalendarEvent[];
  onEventClick?: (event: ICalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void; // 修改为传递完整日期
  selectedSlot?: {
    date: Date;
    hour: number;
  } | null; // 修改选中状态的数据结构
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const DayGrid: React.FC<DayGridProps> = ({
  date,
  events,
  onEventClick,
  onTimeSlotClick,
  selectedSlot
}) => {
  const getEventsForHour = (hour: number) => {
    const currentHourDate = addHours(startOfDay(date), hour);
    
    return events.filter(event => {
      if (event.isAllDay) return false;
      
      return isWithinInterval(currentHourDate, {
        start: event.start,
        end: event.end
      }) || isSameHour(event.start, currentHourDate);
    });
  };

  // 检查时间槽是否被选中
  const isSlotSelected = (hour: number) => {
    if (!selectedSlot) return false;
    const currentDate = startOfDay(date);
    const selectedDate = startOfDay(selectedSlot.date);
    return currentDate.getTime() === selectedDate.getTime() && selectedSlot.hour === hour;
  };

  return (
    <div className="flex flex-col h-full border-l border-t">
      {HOURS.map(hour => {
        const hourEvents = getEventsForHour(hour);
        const timeLabel = format(addHours(startOfDay(date), hour), 'HH:mm');
        const isSelected = isSlotSelected(hour);
        
        return (
          <div 
            key={hour}
            className={`
              flex min-h-[60px] border-b border-r relative group cursor-pointer
              transition-colors duration-200
              ${isSelected ? 'bg-blue-600 bg-opacity-10' : 'hover:bg-gray-50'}
            `}
            onClick={() => onTimeSlotClick?.(date, hour)}
          >
            {/* 时间标签 */}
            <div className={`
              absolute -left-16 top-0 w-14 text-right pr-2 text-sm
              ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-500'}
            `}>
              {timeLabel}
            </div>

            {/* 时间格子内容 */}
            <div className="flex-1 p-1">
              {/* 显示当前小时的事件 */}
              <div className="space-y-1">
                {hourEvents.map(event => (
                  <CalendarEvent
                    key={event.id}
                    event={event}
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发时间槽点击
                      onEventClick?.(event);
                    }}
                  />
                ))}
              </div>

              {/* 添加新事件的提示 */}
              {hourEvents.length === 0 && (
                <div className={`
                  hidden group-hover:block text-xs text-center pt-4
                  ${isSelected ? 'text-blue-600' : 'text-gray-400'}
                `}>
                  Click to add event
                </div>
              )}
            </div>

            {/* 当前时间指示器 */}
            {isSameHour(new Date(), addHours(startOfDay(date), hour)) && (
              <div className="absolute left-0 right-0 border-t-2 border-red-400 top-1/2 transform -translate-y-1/2" />
            )}

            {/* 选中状态指示器 */}
            {isSelected && (
              <div className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const DayView: React.FC<DayGridProps> = (props) => {
  return (
    <div className="flex flex-col h-full">
      {/* 日期头部 */}
      <div className="text-center py-4 border-b">
        <div className="text-lg font-semibold">
          {format(props.date, 'EEEE')}
        </div>
        <div className="text-gray-500">
          {format(props.date, 'MMMM d, yyyy')}
        </div>
      </div>

      {/* 时间格子部分 */}
      <div className="flex-1 overflow-y-auto pl-16 relative">
        <DayGrid {...props} />
      </div>
    </div>
  );
};