import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, CheckCircle } from 'lucide-react'
import SummaryCard from '../components/SummaryCard'

const mockUserData = [
  {
    userId: 'USR001',
    name: 'Katelyn Anderson',
    email: 'katelynanderson224@gmail.com',
    totalAnalyses: 15,
    optimizedGenerated: 12,
    analyses: [
      {
        id: 'RA-001',
        dateCreated: '2025-12-15',
        analysis: 'Comprehensive resume analysis focusing on ATS optimization, keyword enhancement, and formatting improvements. Identified strong action verbs and quantifiable achievements. Recommended restructuring work experience section for better readability.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-001.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-001.pdf',
      },
      {
        id: 'RA-002',
        dateCreated: '2025-12-10',
        analysis: 'Analysis identified gaps in technical skills section and recommended improvements to project descriptions. Added relevant industry keywords and improved formatting consistency throughout the document.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-002.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-002.pdf',
      },
      {
        id: 'RA-003',
        dateCreated: '2025-12-05',
        analysis: 'Basic resume review focusing on grammar and spelling corrections. Identified several areas for improvement in the education section.',
        optimizedGenerated: false,
        originalLink: 'https://example.com/resume/original/ra-003.pdf',
        optimizedLink: null,
      },
    ],
  },
  {
    userId: 'USR002',
    name: 'Zohaib Ahmad',
    email: 'zohaib@thesoftaims.com',
    totalAnalyses: 8,
    optimizedGenerated: 5,
    analyses: [
      {
        id: 'RA-004',
        dateCreated: '2025-12-12',
        analysis: 'Detailed analysis of software engineering resume. Recommended adding more specific metrics and project outcomes. Suggested improvements to technical skills categorization.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-004.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-004.pdf',
      },
      {
        id: 'RA-005',
        dateCreated: '2025-12-08',
        analysis: 'Quick review for formatting consistency and ATS compatibility checks.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-005.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-005.pdf',
      },
    ],
  },
  {
    userId: 'USR003',
    name: 'Matthew Gampel',
    email: 'mattgampel@gmail.com',
    totalAnalyses: 22,
    optimizedGenerated: 18,
    analyses: [
      {
        id: 'RA-006',
        dateCreated: '2025-12-14',
        analysis: 'Comprehensive analysis for executive-level resume. Enhanced leadership accomplishments and strategic achievements. Restructured experience section for maximum impact.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-006.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-006.pdf',
      },
    ],
  },
  {
    userId: 'USR004',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    totalAnalyses: 5,
    optimizedGenerated: 4,
    analyses: [
      {
        id: 'RA-007',
        dateCreated: '2025-12-11',
        analysis: 'Resume analysis for career transition. Highlighted transferable skills and reframed experience to align with target industry.',
        optimizedGenerated: true,
        originalLink: 'https://example.com/resume/original/ra-007.pdf',
        optimizedLink: 'https://example.com/resume/optimized/ra-007.pdf',
      },
      {
        id: 'RA-008',
        dateCreated: '2025-12-09',
        analysis: 'Initial resume review identifying key areas for improvement.',
        optimizedGenerated: false,
        originalLink: 'https://example.com/resume/original/ra-008.pdf',
        optimizedLink: null,
      },
    ],
  },
  {
    userId: 'USR005',
    name: 'David Park',
    email: 'david.park@example.com',
    totalAnalyses: 12,
    optimizedGenerated: 10,
    analyses: [],
  },
  {
    userId: 'USR006',
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    totalAnalyses: 7,
    optimizedGenerated: 6,
    analyses: [],
  },
]

function ResumeAnalysis() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate system-wide metrics
  const totalAnalyses = mockUserData.reduce((sum, user) => sum + user.totalAnalyses, 0)
  const totalOptimized = mockUserData.reduce((sum, user) => sum + user.optimizedGenerated, 0)

  // Filter users based on search term
  const filteredUsers = mockUserData.filter((user) => {
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
  }

  const handleRowClick = (userId) => {
    navigate(`/resume-analysis/${userId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Statistics</h2>
        <p className="text-gray-600 mt-1">Track resume analysis usage and optimization conversion metrics</p>
      </div>
      
      {/* Resume Optimization Conversion Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          icon={FileText}
          title="Total Resume Analyses"
          value={totalAnalyses.toString()}
          subtitle="System-wide"
          iconColor="text-blue-600"
        />
        <SummaryCard
          icon={CheckCircle}
          title="Total Optimized Resumes"
          value={totalOptimized.toString()}
          subtitle="System-wide"
          iconColor="text-green-600"
        />
      </div>
      
      {/* Resume Analysis Per User */}
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
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
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
    </div>
  )
}

export default ResumeAnalysis
