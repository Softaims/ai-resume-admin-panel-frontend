import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  FileText, 
  FileSearch,
  LogOut,
  LayoutDashboard,
  X
} from 'lucide-react'

const menuItems = [
  { id: 'user-overview', label: 'User Overview', icon: Users, path: '/user-overview' },
  { id: 'resume-analysis', label: 'Resume Analysis', icon: FileText, path: '/resume-analysis' },
  { id: 'job-analysis', label: 'Job Analysis', icon: FileSearch, path: '/job-analysis' },
]

function Sidebar({ activeItem, onLogout }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false)
    onLogout()
  }

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false)
  }

  return (
    <>
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-[100] overflow-y-auto">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center" 
              style={{ background: 'linear-gradient(to bottom right, #2F279C, #766EE4)' }}
            >
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AI Resume Builder</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={isActive ? { background: 'linear-gradient(to right, #2F279C, #766EE4)' } : {}}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-[200]"
            onClick={handleLogoutCancel}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[201] pointer-events-none">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 pointer-events-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                  <button
                    onClick={handleLogoutCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout? You will need to sign in again to access the admin dashboard.
                </p>
                
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={handleLogoutCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogoutConfirm}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Sidebar
