import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import WelcomePage from "./pages/welcome/Welcome";
import CalendarPage from "./pages/calendar/Calendar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
