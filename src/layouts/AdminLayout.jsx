import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/global/Sidebar'

function AdminLayout({ onLogout }) {
  const location = useLocation()
  
  // Map paths to menu item IDs for active state
  const getActiveItem = () => {
    const path = location.pathname
    
    // Check if path starts with the base routes (handles detail pages too)
    if (path.startsWith('/dashboard')) {
        return 'dashboard'
    }
    if (path.startsWith('/resume-analysis')) {
        return 'resume-analysis'
    }
    if (path.startsWith('/job-analysis')) {
        return 'job-analysis'
    }
    if (path.startsWith('/user-overview')) {
        return 'user-overview'
    }
    
    // Default fallback
    return 'dashboard'
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        activeItem={getActiveItem()} 
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
