// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from "./components/navigation/Sidebar";
import { CalendarView } from "./components/calendar/CalendarView";
import { ChatSidebar } from "./components/chat/ChatSidebar";
import ProfilePage from "./components/profile/ProfilePage";
import SettingsPage from "./components/settings/SettingsPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

// 创建需要认证的布局组件
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen flex">
      <Sidebar onChatOpen={() => setIsChatOpen(true)} />
      <div className="flex-1 ml-16 transition-all duration-300 ease-in-out">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100} minSize={50}>
            <div className="h-screen overflow-auto relative z-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
              </div>
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

// 认证路由包装器
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? (
    <AuthenticatedLayout>{element}</AuthenticatedLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

// 公共路由包装器（已登录用户不能访问登录和注册页面）
const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return !isAuthenticated ? (
    element
  ) : (
    <Navigate to="/calendar" replace />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 公共路由 */}
        <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
        
        {/* 需要认证的路由 */}
        <Route path="/calendar" element={<PrivateRoute element={<CalendarView />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
        
        {/* 默认路由重定向到日历 */}
        <Route path="/" element={<PrivateRoute element={<CalendarView />} />} />
        
        {/* 404 路由重定向到日历 */}
        <Route path="*" element={<Navigate to="/calendar" replace />} />
      </Routes>
    </Router>
  );
};

export default App;