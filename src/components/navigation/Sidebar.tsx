// components/common/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import { Calendar, MessageSquare, User, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Logo } from '../common/Logo/Logo';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onChatOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onChatOpen }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main sidebar */}
      <div
        className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out bg-white border-r border-gray-200 ${
          isExpanded ? 'w-48' : 'w-16'
        }`}
      >
        <div className="p-4 flex flex-col h-full relative">
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-3 top-20 transform bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-gray-50 z-10"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )}
          </button>

          {/* Logo */}
          <div className={`mb-8 ${isExpanded ? '' : 'flex justify-center'}`}>
            {isExpanded ? (
              <Logo variant="light" />
            ) : (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0" />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <button
              onClick={onChatOpen}
              className={`flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full transition-all ${
                isExpanded ? 'text-left gap-3' : 'justify-center'
              }`}
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              {isExpanded && <span className="truncate">Agent</span>}
            </button>

            <button
              onClick={handleCalendarClick}
              className={`flex items-center px-3 py-2 rounded-lg w-full transition-all ${
                isExpanded ? 'text-left gap-3' : 'justify-center'
              } ${
                isActive('/calendar') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-5 w-5 flex-shrink-0" />
              {isExpanded && <span className="truncate">Calendar</span>}
            </button>

            <button
              onClick={handleSettingsClick}
              className={`flex items-center px-3 py-2 rounded-lg w-full transition-all ${
                isExpanded ? 'text-left gap-3' : 'justify-center'
              } ${
                isActive('/settings') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {isExpanded && <span className="truncate">Settings</span>}
            </button>
          </nav>

          {/* Profile */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <button
              onClick={handleProfileClick}
              className={`flex items-center px-3 py-2 rounded-lg w-full transition-all ${
                isExpanded ? 'text-left gap-3' : 'justify-center'
              } ${
                isActive('/profile') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isActive('/profile') ? 'bg-blue-100' : 'bg-gray-200'
              }`}>
                <User className={`h-4 w-4 ${
                  isActive('/profile') ? 'text-blue-600' : 'text-gray-500'
                }`} />
              </div>
              {isExpanded && <span className="truncate">Profile</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className={`flex-shrink-0 ${isExpanded ? 'w-48' : 'w-16'}`} />
    </>
  );
};

export default Sidebar;