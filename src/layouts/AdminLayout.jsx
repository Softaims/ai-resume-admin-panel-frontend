import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function AdminLayout({ onLogout }) {
  const location = useLocation()
  
  // Map paths to menu item IDs for active state
  const getActiveItem = () => {
    const path = location.pathname
    switch (path) {
      case '/user-overview':
        return 'user-overview'
      case '/resume-analysis':
        return 'resume-analysis'
      case '/job-analysis':
        return 'job-analysis'
   
      default:
        return 'user-overview'
    }
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
