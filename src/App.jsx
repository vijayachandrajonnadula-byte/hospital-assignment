import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Messages from "./pages/Messages";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<Dashboard />} />
        <Route path="/patients"          element={<Patients />} />
        <Route path="/patients/:id"      element={<PatientProfile />} />
        <Route path="/appointments"      element={<Appointments />} />
        <Route path="/medical-records"   element={<MedicalRecords />} />
        <Route path="/messages"          element={<Messages />} />
        <Route path="/tasks"             element={<Tasks />} />
        <Route path="/analytics"         element={<Analytics />} />
        <Route path="/settings"          element={<Settings />} />
        <Route path="*"                  element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
