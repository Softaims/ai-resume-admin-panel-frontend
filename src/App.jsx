import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Overview from './pages/Overview'
import ResumeAnalysis from './pages/ResumeAnalysis'
import ResumeAnalysisDetails from './pages/ResumeAnalysisDetails'
import JobAnalysis from './pages/JobAnalysis'
import JobAnalysisDetails from './pages/JobAnalysisDetails'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Check for existing auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
    navigate('/user-overview')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      {isAuthenticated ? (
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/user-overview" replace />} />
          <Route path="/user-overview" element={<Overview />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/resume-analysis/:userId" element={<ResumeAnalysisDetails />} />
          <Route path="/job-analysis" element={<JobAnalysis />} />
          <Route path="/job-analysis/:userId" element={<JobAnalysisDetails />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}

export default App
