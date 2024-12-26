// components/calendar/EventModal.tsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarEvent } from '../../types/calendar';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  selectedDate: Date;
  selectedStartHour?: number | null;
  selectedEndHour?: number | null;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedStartHour = 9,
  selectedEndHour
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [isAllDay, setIsAllDay] = useState(false);

  // 重置表单
  const resetForm = () => {
    setTitle('');
    setIsAllDay(false);
    // 设置默认日期
    setDate(format(selectedDate, 'yyyy-MM-dd'));
    // 设置默认时间
    setStartTime(selectedStartHour 
      ? `${selectedStartHour.toString().padStart(2, '0')}:00`
      : '09:00'
    );
    setEndTime(selectedEndHour 
      ? `${selectedEndHour.toString().padStart(2, '0')}:00`
      : (selectedStartHour 
        ? `${(selectedStartHour + 1).toString().padStart(2, '0')}:00`
        : '10:00')
    );
  };

  // 当模态框打开或选中时间变化时重置表单
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, selectedStartHour, selectedEndHour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 从选择的日期和时间创建完整的日期对象
    const [year, month, day] = date.split('-').map(Number);
    const start = new Date(year, month - 1, day);
    const end = new Date(year, month - 1, day);
    
    if (!isAllDay) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      
      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);
    } else {
      // 全天事件设置为当天的0点到23:59
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    onSave({ 
      title, 
      start, 
      end,
      isAllDay 
    });
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">All Day Event</span>
            </label>
          </div>

          {!isAllDay && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};