import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

interface TimeGridProps {
  days: Date[];
  events: CalendarEvent[];
  timeSlots: number[];
  selectedDate: Date;
  selectedTime: number | null;
  onSelectDateTime: (date: Date, hour: number) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDuplicateEvent: (event: CalendarEvent, newStart: Date) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
  days,
  events,
  timeSlots,
  selectedDate,
  selectedTime,
  onSelectDateTime,
  onUpdateEvent,
  onDuplicateEvent
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  const getEventsForTimeSlot = (date: Date, hour: number) => {
    return events.filter(event => {
      const eventHour = event.start.getHours();
      return isSameDay(event.start, date) && eventHour === hour;
    });
  };

  const calculateEventStyle = (event: CalendarEvent, totalEvents: number, eventIndex: number) => {
    const width = 100 / totalEvents;
    const left = width * eventIndex;
    return {
      top: `${(event.start.getMinutes() / 60) * 100}%`,
      height: `${((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 100}%`,
      width: `${width}%`,
      left: `${left}%`,
      minHeight: '20px'
    };
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEventDragStart = (event: CalendarEvent, e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', event.id);
    setDraggedEvent(event);
  };

  const handleCellDrop = (date: Date, hour: number, e: React.DragEvent) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('text/plain');
    const event = events.find(e => e.id === eventId);
    
    if (event && draggedEvent) {
      const duration = event.end.getTime() - event.start.getTime();
      const newStart = new Date(date);
      newStart.setHours(hour);
      newStart.setMinutes(0);
      const newEnd = new Date(newStart.getTime() + duration);
      
      onDuplicateEvent(event, newStart);
    }
    setDraggedEvent(null);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    onUpdateEvent(updatedEvent);
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleTimeChange = (timeStr: string, isStart: boolean) => {
    if (!selectedEvent) return;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    const newDate = new Date(isStart ? selectedEvent.start : selectedEvent.end);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    const updatedEvent = {
      ...selectedEvent,
      [isStart ? 'start' : 'end']: newDate
    };
    handleEventUpdate(updatedEvent);
  };

  return (
    <div className="mt-4">
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
      <div className="grid grid-cols-8">
        <div className="border-r border-gray-200">
          {timeSlots.map(hour => (
            <div key={hour} className="h-16 p-2 text-right text-sm text-gray-500">
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="border-r border-gray-200">
            {timeSlots.map(hour => {
              const eventsInSlot = getEventsForTimeSlot(day, hour);
              return (
                <div
                  key={hour}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleCellDrop(day, hour, e)}
                  className="h-16 border-b border-gray-200 relative cursor-pointer hover:bg-gray-50"
                >
                  {eventsInSlot.map((event, index) => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleEventDragStart(event, e)}
                      onClick={(e) => handleEventClick(event, e)}
                      className="absolute bg-blue-100 text-blue-600 p-1 rounded text-sm truncate 
                               hover:z-10 hover:bg-blue-200 cursor-pointer"
                      style={calculateEventStyle(event, eventsInSlot.length, index)}
                    >
                      <div className="truncate text-xs">
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">编辑事件</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">标题</label>
                <input
                  type="text"
                  value={selectedEvent.title}
                  onChange={(e) => handleEventUpdate({
                    ...selectedEvent,
                    title: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">描述</label>
                <input
                  type="text"
                  value={selectedEvent.description || ''}
                  onChange={(e) => handleEventUpdate({
                    ...selectedEvent,
                    description: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">开始时间</label>
                  <input
                    type="time"
                    value={format(selectedEvent.start, 'HH:mm')}
                    onChange={(e) => handleTimeChange(e.target.value, true)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">结束时间</label>
                  <input
                    type="time"
                    value={format(selectedEvent.end, 'HH:mm')}
                    onChange={(e) => handleTimeChange(e.target.value, false)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};