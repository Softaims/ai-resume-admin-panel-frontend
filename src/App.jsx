import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Dashboard from './pages/Dashboard'
import ResumeAnalysis from './pages/ResumeAnalysis'
import ResumeAnalysisDetails from './pages/ResumeAnalysisDetails'
import JobAnalysis from './pages/JobAnalysis'
import JobAnalysisDetails from './pages/JobAnalysisDetails'
import ProtectedRoute from './global/ProtectedRoute'
import { useUserStore } from './store/userStore'

function App() {
  const navigate = useNavigate()
  const { clearUser } = useUserStore()

  const handleLogout = () => {
    clearUser()
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<AdminLayout onLogout={handleLogout} />}>
        <Route
          path="/"
          element={<ProtectedRoute children={<Navigate to="/dashboard" replace />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute children={<Dashboard />} />}
        />
        <Route
          path="/user-overview"
          element={<ProtectedRoute children={<Overview />} />}
        />
        <Route
          path="/resume-analysis"
          element={<ProtectedRoute children={<ResumeAnalysis />} />}
        />
        <Route
          path="/resume-analysis/:userId"
          element={<ProtectedRoute children={<ResumeAnalysisDetails />} />}
        />
        <Route
          path="/job-analysis"
          element={<ProtectedRoute children={<JobAnalysis />} />}
        />
        <Route
          path="/job-analysis/:userId"
          element={<ProtectedRoute children={<JobAnalysisDetails />} />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
