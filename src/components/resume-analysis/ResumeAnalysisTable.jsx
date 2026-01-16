import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { TableRowSkeleton } from '../global/Skeleton'
import EmptyState from '../global/EmptyState'
import ErrorState from '../global/ErrorState'

function ResumeAnalysisTable({ users, itemsPerPage = 10 }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltering, setIsFiltering] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate potential error when users prop changes
    if (users && users.length > 0) {
      setError(null)
    } else if (users && users.length === 0) {
      // Only set error if we explicitly have an empty array (not just loading)
      // This would be handled by empty state instead
    }
  }, [users])

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    )
  })

  // Paginate filtered users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
    setIsFiltering(true)
    // Simulate API call delay
    setTimeout(() => {
      setIsFiltering(false)
    }, 500)
  }

  const handleRowClick = (userId) => {
    navigate(`/resume-analysis/${userId}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Resume Analysis Per User</h3>
        <p className="text-sm text-gray-600">View detailed analysis records for each user</p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-80 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Total Analyses
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Optimized Generated
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <ErrorState
                title="Failed to load data"
                message={error}
                colSpan={5}
                isTableRow={true}
              />
            ) : isFiltering ? (
              // Show skeleton rows while filtering
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))
            ) : paginatedUsers.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No resume analyses found"
                message="No users match your search criteria. Try adjusting your search term."
                colSpan={5}
              />
            ) : (
              paginatedUsers.map((user) => (
                <tr 
                  key={user.userId} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.totalAnalyses}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.optimizedGenerated}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(user.userId)
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-all cursor-pointer hover:opacity-90"
                      style={{ background: '#2F279C' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of{' '}
            <span className="font-medium">{filteredUsers.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentPage === page
                          ? 'text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                      style={currentPage === page ? { background: '#2F279C' } : {}}
                    >
                      {page}
                    </button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>
                }
                return null
              })}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeAnalysisTable

