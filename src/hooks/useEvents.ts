// hooks/useEvents.ts
import { useState } from 'react';
import { CalendarEvent } from '../types/calendar';

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    setEvents(prev => [...prev, {
      ...event,
      id: Math.random().toString(36).substring(2)
    }]);
  };

  return {
    events,
    addEvent,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false)
  };
};