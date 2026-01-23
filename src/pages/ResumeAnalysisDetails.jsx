import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, CheckCircle } from 'lucide-react'
import { DetailPageSkeleton } from '../components/global/Skeleton'
import ErrorState from '../components/global/ErrorState'
import DetailPageHeader from '../components/detail-pages/DetailPageHeader'
import SummaryStatCard from '../components/detail-pages/SummaryStatCard'
import AnalysisCard from '../components/detail-pages/AnalysisCard'
import BackButton from '../components/detail-pages/BackButton'
import useResumeAnalysisStore from '../store/resumeAnalysisStore'

function ResumeAnalysisDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const {
    userDetails,
    isLoadingDetails,
    detailsError,
    fetchUserDetails,
  } = useResumeAnalysisStore()
  
  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId, false)
    }
  }, [userId, fetchUserDetails])

  if (isLoadingDetails && (!userDetails || userDetails.userId !== userId)) {
    return <DetailPageSkeleton />
  }

  if (detailsError) {
    return (
      <div className="space-y-6">
        <BackButton onClick={() => navigate('/resume-analysis')} />
        <ErrorState
          title="Failed to load details"
          message={detailsError}
          onRetry={() => fetchUserDetails(userId)}
        />
      </div>
    )
  }
  
  if (!userDetails) {
    return (
      <div className="space-y-6">
        <BackButton onClick={() => navigate('/resume-analysis')} />
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User not found</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4 text-center">
              The requested user could not be found. Please check the user ID and try again.
            </p>
            <button
              onClick={() => navigate('/resume-analysis')}
              className="px-4 py-2 bg-[#2F279C] text-white rounded-lg hover:opacity-90 transition-all cursor-pointer font-medium"
            >
              Back to Resume Analysis
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DetailPageHeader
        title="Resume Analysis Details"
        subtitle={`${userDetails.name} - ${userDetails.email}`}
        onBack={() => navigate('/resume-analysis')}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryStatCard
          icon={FileText}
          label="Total Analyses"
          value={userDetails.totalAnalyses}
        />
        <SummaryStatCard
          icon={CheckCircle}
          label="Optimized"
          value={userDetails.optimizedGenerated}
        />
      </div>

      {/* Detailed Analyses Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Detailed Resume Analyses</h3>
            <p className="text-sm text-gray-600 mt-1">Complete analysis history for this user</p>
          </div>
        </div>

        {userDetails.analyses && userDetails.analyses.length > 0 ? (
          <div className="space-y-4">
            {userDetails.analyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} type="resume" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No detailed analyses available</h3>
              <p className="text-sm text-gray-500 max-w-md">
                This user hasn't generated any resume analyses yet. Analyses will appear here once they are created.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalysisDetails

