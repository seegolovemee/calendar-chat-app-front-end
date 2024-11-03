

import React, { useState } from "react";
import { Sidebar } from "./components/navigation/Sidebar";
import { CalendarView } from "./components/calendar/CalendarView";
import { ChatSidebar } from "./components/chat/ChatSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";


const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onChatOpen={() => setIsChatOpen(true)} />
      <main
        className={`
    flex-1 min-w-0 
    transform transition-all duration-300 ease-in-out
    ${isChatOpen ? "mr-[320px]" : ""}
  `}
      >
        <CalendarView />
      </main>
      <div
        className={`
    fixed right-0 top-0 h-full w-[320px]
    transform transition-transform duration-300
    ${isChatOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <ChatSidebar onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
};

export default App;

