import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, FileSearch, Calendar, Briefcase } from 'lucide-react'

// Mock data - in real app, this would come from API
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
        coverLetterLink: null,
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
        jobAnalyzedResumeLink: null,
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
        coverLetterLink: null,
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
]

function JobAnalysisDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  
  const user = mockUserData.find(u => u.userId === userId)
  
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-500">User not found</p>
          <button
            onClick={() => navigate('/job-analysis')}
            className="mt-4 text-[#2F279C] hover:text-[#766EE4] transition-colors cursor-pointer"
          >
            ← Back to Job Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/job-analysis')}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Analysis Details</h2>
            <p className="text-gray-600 mt-1">{user.name} - {user.email}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Analyses</p>
              <p className="text-xl font-bold text-gray-900">{user.totalAnalyses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Job Positions</p>
              <p className="text-xl font-bold text-gray-900">{user.analyses.length}</p>
            </div>
          </div>
        </div>
      
      </div>

      {/* Detailed Analyses Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Detailed Job Analyses</h3>
              <p className="text-sm text-gray-600 mt-1">Complete job analysis history for this user</p>
            </div>
            {/* Legend */}
           
          </div>
        </div>

        {user.analyses.length > 0 ? (
          <div className="space-y-4">
            {user.analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date Created</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(analysis.dateCreated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Title</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{analysis.jobTitle}</p>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileSearch className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Analysis</p>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{analysis.analysis}</p>
                  </div>
                  <div className="col-span-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documents</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Original Resume - Purple */}
                      <a
                        href={analysis.originalResumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all cursor-pointer border border-purple-200"
                        title="View Original Resume"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Original</span>
                      </a>
                      {/* Analyzed Resume - Blue */}
                      {analysis.jobAnalyzedResumeLink ? (
                        <a
                          href={analysis.jobAnalyzedResumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all cursor-pointer border border-blue-200"
                          title="View Analyzed Resume"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Analyzed</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">N/A</span>
                        </div>
                      )}
                      {/* Cover Letter - Green */}
                      {analysis.coverLetterLink ? (
                        <a
                          href={analysis.coverLetterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all cursor-pointer border border-green-200"
                          title="View Cover Letter"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Cover Letter</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">No Letter</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">No detailed analyses available for this user.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobAnalysisDetails

