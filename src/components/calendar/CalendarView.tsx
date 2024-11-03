// src/components/calendar/CalendarView.tsx
import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { format } from 'date-fns';

export const CalendarView: React.FC = () => {
  const { weekDays } = useCalendar();

  return (
    <div className="h-full w-full max-w-4xl mx-auto p-4 overflow-auto">
      {/* 日历头部 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">September</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-1 bg-blue-100 text-blue-600 font-medium rounded-md">
            Week
          </button>
        </div>
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              {format(day, 'EEE')}
            </div>
            <div
              className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm
                ${index === 3 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* 时间轴 */}
      <div className="mt-8">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-16 text-sm text-gray-500">
              {`${i} am`}
            </div>
            <div className="flex-1 h-16 border-t border-gray-200">
              {i === 3 && (
                <div className="ml-4 w-32 h-12 bg-red-200 rounded p-2">
                  <span className="text-sm">Meeting</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};