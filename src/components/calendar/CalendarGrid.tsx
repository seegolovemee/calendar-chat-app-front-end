// components/calendar/CalendarGrid.tsx
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent, CalendarViewType } from '../../types/calendar';

interface CalendarGridProps {
  days: Date[];
  events: CalendarEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  view: CalendarViewType;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  events,
  selectedDate,
  onSelectDate,
  view
}) => {
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.start, day));
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day, index) => (
        <div key={index} className={`text-center ${view === 'month' ? 'min-h-[120px]' : ''}`}>
          <div className="text-sm text-gray-500 mb-2">
            {format(day, 'EEE')}
          </div>
          <div
            onClick={() => onSelectDate(day)}
            className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm cursor-pointer
              ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
          >
            {format(day, 'd')}
          </div>
          {view === 'month' && (
            <div className="mt-2">
              {getEventsForDay(day).map(event => (
                <div
                  key={event.id}
                  className="text-xs bg-blue-100 text-blue-600 p-1 mb-1 rounded truncate text-left mx-1"
                >
                  {format(event.start, 'HH:mm')} - {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};