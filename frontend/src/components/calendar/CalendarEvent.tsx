// components/calendar/CalendarEvent.tsx
import React from 'react';
import type { CalendarEvent as ICalendarEvent } from '../../types/calendar';

interface CalendarEventProps {
  event: ICalendarEvent;
  onClick?: (event: ICalendarEvent) => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(event)}
      className={`
        px-2 py-1 rounded text-sm cursor-pointer
        ${event.color || 'bg-blue-100 text-blue-600'}
        hover:opacity-90
      `}
    >
      <div className="font-medium truncate">{event.title}</div>
      {!event.isAllDay && (
        <div className="text-xs opacity-75">
          {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};