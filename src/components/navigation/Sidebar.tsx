// src/components/navigation/Sidebar.tsx
import React from 'react';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { Logo } from '../common/Logo/Logo';

interface SidebarProps {
  onChatOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onChatOpen }) => {
  return (
    <div className="w-48 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      {/* Logo */}
      <div className="mb-8">
        <Logo variant="light" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <button
          onClick={onChatOpen}
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Agent</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">
          <Calendar className="h-5 w-5" />
          <span>Calendar</span>
        </button>
      </nav>

      {/* Profile */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <button className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};