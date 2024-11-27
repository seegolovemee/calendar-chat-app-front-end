// components/calendar/CalendarHeader.tsx
import React from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarViewType } from "../../types/calendar";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onAddEvent,
}) => {
  // 根据视图类型获取显示的日期格式
  const getHeaderDate = () => {
    switch (view) {
      case 'month':
        return format(currentDate, "MMMM yyyy");
      case 'week': {
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        
        // 如果开始日期和结束日期在同一个月
        if (format(weekStart, 'MMM') === format(weekEnd, 'MMM')) {
          return `${format(weekStart, "MMM d")} - ${format(weekEnd, "d")}, ${format(weekStart, "yyyy")}`;
        }
        // 如果开始日期和结束日期在不同月份
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d")}, ${format(weekStart, "yyyy")}`;
      }
      case 'day':
        return format(currentDate, "MMMM d, yyyy");
      default:
        return format(currentDate, "MMMM yyyy");
    }
  };

  // 获取导航按钮的提示文本
  const getNavigationLabel = () => {
    switch (view) {
      case 'month':
        return { prev: 'Previous Month', next: 'Next Month' };
      case 'week':
        return { prev: 'Previous Week', next: 'Next Week' };
      case 'day':
        return { prev: 'Previous Day', next: 'Next Day' };
    }
  };

  const navigationLabel = getNavigationLabel();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {getHeaderDate()}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label={navigationLabel.prev}
            title={navigationLabel.prev}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label={navigationLabel.next}
            title={navigationLabel.next}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onViewChange("day")}
          className={`px-4 py-2 rounded-md ${
            view === "day"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => onViewChange("week")}
          className={`px-4 py-2 rounded-md ${
            view === "week"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange("month")}
          className={`px-4 py-2 rounded-md ${
            view === "month"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Month
        </button>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>
    </div>
  );
};