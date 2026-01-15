import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, FileText, Calendar, CheckCircle } from 'lucide-react'

// Mock data - in real app, this would come from API
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
]

function ResumeAnalysisDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  
  const user = mockUserData.find(u => u.userId === userId)
  
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-500">User not found</p>
          <button
            onClick={() => navigate('/resume-analysis')}
            className="mt-4 text-[#2F279C] hover:text-[#766EE4] transition-colors cursor-pointer"
          >
            ← Back to Resume Analysis
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
            onClick={() => navigate('/resume-analysis')}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Details</h2>
            <p className="text-gray-600 mt-1">{user.name} - {user.email}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Analyses</p>
              <p className="text-xl font-bold text-gray-900">{user.totalAnalyses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Optimized</p>
              <p className="text-xl font-bold text-gray-900">{user.optimizedGenerated}</p>
            </div>
          </div>
        </div>
      
      </div>

      {/* Detailed Analyses Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Detailed Resume Analyses</h3>
              <p className="text-sm text-gray-600 mt-1">Complete analysis history for this user</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-purple-600" />
                <span className="font-medium">Original Resume</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-green-600" />
                <span className="font-medium">Optimized Resume</span>
              </div>
            </div>
          </div>
        </div>

        {user.analyses.length > 0 ? (
          <div className="space-y-4">
            {user.analyses.map((analysis, index) => (
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
                  <div className="col-span-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What Was Generated</p>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{analysis.analysis}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</p>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-sm ${
                      analysis.optimizedGenerated
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {analysis.optimizedGenerated ? 'Optimized' : 'Not Optimized'}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Documents</p>
                    <div className="flex items-center gap-3">
                      {/* Original Resume - Purple */}
                      <a
                        href={analysis.originalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all cursor-pointer border border-purple-200"
                        title="View Original Resume"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Original</span>
                      </a>
                      {/* Optimized Resume - Green */}
                      {analysis.optimizedGenerated && analysis.optimizedLink ? (
                        <a
                          href={analysis.optimizedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all cursor-pointer border border-green-200"
                          title="View Optimized Resume"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Optimized</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">N/A</span>
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
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">No detailed analyses available for this user.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalysisDetails

