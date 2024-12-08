// src/types/index.ts
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color?: string;
  }
  
  export interface Message {
    id: string;
    text: string;
    isAgent: boolean;
    timestamp: Date;
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  }