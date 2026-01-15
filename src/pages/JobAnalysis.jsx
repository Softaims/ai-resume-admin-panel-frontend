import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSearch } from 'lucide-react'
import SummaryCard from '../components/SummaryCard'

const mockUserData = [
  {
    userId: 'USR001',
    name: 'Katelyn Anderson',
    email: 'katelynanderson224@gmail.com',
    totalAnalyses: 12,
    analyses: [
      {
        id: 'JA-001',
        dateCreated: '2025-12-18',
        analysis: 'Job posting analysis for Senior Software Engineer role. Identified key required skills: React.js, Node.js, AWS, Docker. Analyzed salary range and company culture indicators. Recommended tailoring resume to emphasize cloud architecture experience.',
        jobTitle: 'Senior Software Engineer',
        originalResumeLink: 'https://example.com/resume/original/ja-001.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-001.pdf',
        coverLetterLink: 'https://example.com/coverletter/ja-001.pdf',
      },
      {
        id: 'JA-002',
        dateCreated: '2025-12-15',
        analysis: 'Analysis of Product Manager position. Key requirements include 5+ years experience, Agile methodology expertise, and strong stakeholder management skills. Competitive salary and remote work options identified.',
        jobTitle: 'Product Manager',
        originalResumeLink: 'https://example.com/resume/original/ja-002.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-002.pdf',
        coverLetterLink: null, // No cover letter
      },
      {
        id: 'JA-003',
        dateCreated: '2025-12-10',
        analysis: 'Entry-level Data Analyst role analysis. Focus on SQL, Python, and data visualization tools. Good learning opportunity with mentorship program mentioned.',
        jobTitle: 'Data Analyst',
        originalResumeLink: 'https://example.com/resume/original/ja-003.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-003.pdf',
        coverLetterLink: 'https://example.com/coverletter/ja-003.pdf',
      },
    ],
  },
  {
    userId: 'USR002',
    name: 'Zohaib Ahmad',
    email: 'zohaib@thesoftaims.com',
    totalAnalyses: 7,
    analyses: [
      {
        id: 'JA-004',
        dateCreated: '2025-12-14',
        analysis: 'Full Stack Developer position analysis. Required skills: React, Express.js, MongoDB, RESTful APIs. Hybrid work model with 3 days remote. Strong emphasis on team collaboration and code reviews.',
        jobTitle: 'Full Stack Developer',
        originalResumeLink: 'https://example.com/resume/original/ja-004.pdf',
        jobAnalyzedResumeLink: null, // No analyzed resume
        coverLetterLink: 'https://example.com/coverletter/ja-004.pdf',
      },
      {
        id: 'JA-005',
        dateCreated: '2025-12-08',
        analysis: 'Backend Engineer role with focus on microservices architecture. Key technologies: Java, Spring Boot, Kubernetes. Excellent benefits package and professional development budget.',
        jobTitle: 'Backend Engineer',
        originalResumeLink: 'https://example.com/resume/original/ja-005.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-005.pdf',
        coverLetterLink: 'https://example.com/coverletter/ja-005.pdf',
      },
    ],
  },
  {
    userId: 'USR003',
    name: 'Matthew Gampel',
    email: 'mattgampel@gmail.com',
    totalAnalyses: 18,
    analyses: [
      {
        id: 'JA-006',
        dateCreated: '2025-12-16',
        analysis: 'Executive-level CTO position analysis. Requires 15+ years experience, proven track record of scaling engineering teams, and strategic technology vision. Equity compensation and board participation included.',
        jobTitle: 'Chief Technology Officer',
        originalResumeLink: 'https://example.com/resume/original/ja-006.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-006.pdf',
        coverLetterLink: 'https://example.com/coverletter/ja-006.pdf',
      },
    ],
  },
  {
    userId: 'USR004',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    totalAnalyses: 9,
    analyses: [
      {
        id: 'JA-007',
        dateCreated: '2025-12-12',
        analysis: 'UX Designer role focused on mobile app design. Required portfolio showcasing user-centered design process. Tools: Figma, Sketch, Adobe Creative Suite. Collaborative environment with cross-functional teams.',
        jobTitle: 'UX Designer',
        originalResumeLink: 'https://example.com/resume/original/ja-007.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-007.pdf',
        coverLetterLink: null, // No cover letter
      },
      {
        id: 'JA-008',
        dateCreated: '2025-12-09',
        analysis: 'Marketing Manager position with emphasis on digital marketing strategies. SEO, SEM, social media, and content marketing expertise required. Fast-paced startup environment.',
        jobTitle: 'Marketing Manager',
        originalResumeLink: 'https://example.com/resume/original/ja-008.pdf',
        jobAnalyzedResumeLink: 'https://example.com/resume/analyzed/ja-008.pdf',
        coverLetterLink: 'https://example.com/coverletter/ja-008.pdf',
      },
    ],
  },
  {
    userId: 'USR005',
    name: 'David Park',
    email: 'david.park@example.com',
    totalAnalyses: 14,
    analyses: [],
  },
  {
    userId: 'USR006',
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    totalAnalyses: 6,
    analyses: [],
  },
]

function JobAnalysis() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate system-wide metrics
  const totalAnalyses = mockUserData.reduce((sum, user) => sum + user.totalAnalyses, 0)

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
    navigate(`/job-analysis/${userId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Job Analysis</h2>
        <p className="text-gray-600 mt-1">Track job posting analysis and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          icon={FileSearch}
          title="Total Job Analyses"
          value={totalAnalyses.toString()}
          subtitle="System-wide"
          iconColor="text-indigo-600"
        />
      </div>
      
      {/* Job Analysis Per User */}
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
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12">
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

export default JobAnalysis
