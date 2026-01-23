import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSearch } from 'lucide-react'
import { TableRowSkeleton } from '../global/Skeleton'
import EmptyState from '../global/EmptyState'
import ErrorState from '../global/ErrorState'
import useJobAnalysisStore from '../../store/jobAnalysisStore'

function JobAnalysisTable() {
  const navigate = useNavigate()
  const {
    users,
    pagination,
    search,
    isLoadingList,
    listError,
    fetchList,
  } = useJobAnalysisStore()

  const [searchTerm, setSearchTerm] = useState(search)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
      if (users.length === 0) {
        const page = debouncedSearchTerm !== search ? 1 : pagination.currentPage
        fetchList({ page, search: debouncedSearchTerm }, false)
      }
      return
    }

    const page = debouncedSearchTerm !== search ? 1 : pagination.currentPage
    fetchList({ page, search: debouncedSearchTerm }, false)
  }, [pagination.currentPage, debouncedSearchTerm])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handlePageChange = (page) => {
    fetchList({ page, search: debouncedSearchTerm })
  }

  const handleRowClick = (userId) => {
    navigate(`/job-analysis/${userId}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Job Analysis Per User</h3>
        <p className="text-sm text-gray-600">View detailed job analysis records for each user</p>
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
                Total Job Analyses
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listError ? (
              <ErrorState
                title="Failed to load data"
                message={listError}
                colSpan={4}
                isTableRow={true}
                onRetry={() => fetchList({ page: pagination.currentPage, search: debouncedSearchTerm })}
              />
            ) : isLoadingList && users.length === 0 ? (
              Array.from({ length: pagination.itemsPerPage-5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={4} />
              ))
            ) : users.length === 0 ? (
              <EmptyState
                icon={FileSearch}
                title="No job analyses found"
                message="No users match your search criteria. Try adjusting your search term."
                colSpan={4}
              />
            ) : (
              users.map((user) => (
                <tr 
                  key={user.userId} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(user.userId)}
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
      {pagination.totalItems > 0 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}</span> of{' '}
            <span className="font-medium">{pagination.totalItems}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                pagination.currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        pagination.currentPage === page
                          ? 'text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                      style={pagination.currentPage === page ? { background: '#2F279C' } : {}}
                    >
                      {page}
                    </button>
                  )
                } else if (page === pagination.currentPage - 2 || page === pagination.currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>
                }
                return null
              })}
            </div>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                pagination.currentPage === pagination.totalPages
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

export default JobAnalysisTable

