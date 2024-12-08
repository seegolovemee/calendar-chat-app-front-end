import React, { useState } from "react";
import { Sidebar } from "../../components/navigation/Sidebar";
import { CalendarView } from "../../components/calendar/CalendarView";
import { ChatSidebar } from "../../components/chat/ChatSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";

const CalendarPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar onChatOpen={() => setIsChatOpen(true)} />

      {/* Main content area */}
      <div className="flex-1 ml-16 transition-all duration-300 ease-in-out">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100} minSize={50}>
            <div className="h-screen overflow-auto relative z-50">
              <CalendarView />
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="w-2 bg-gray-100 hover:bg-gray-200 transition-colors"
            onDoubleClick={() => setIsChatOpen(true)}
          />

          {isChatOpen && (
            <ResizablePanel
              defaultSize={30}
              minSize={20}
              maxSize={50}
              className="relative z-50"
            >
              <ChatSidebar onClose={() => setIsChatOpen(false)} />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CalendarPage;
