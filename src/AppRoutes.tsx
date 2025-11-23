// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import Study from "./pages/Study";
// import Dashboard from "./pages/Dashboard";
// import Settings from "./pages/Settings";
// import JournalPage from "./pages/JournalPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      {/* <Route path="/study" element={<Study></Study>} />
      <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      <Route path="/settings" element={<Settings></Settings>} />
      <Route path="/journal" element={<JournalPage></JournalPage>} /> */}
    </Routes>
  );
}
