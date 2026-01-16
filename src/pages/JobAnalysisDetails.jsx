import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileSearch } from 'lucide-react'
import { mockJobAnalysisData } from '../data/mockJobAnalysis'
import { DetailPageSkeleton } from '../components/global/Skeleton'
import ErrorState from '../components/global/ErrorState'
import DetailPageHeader from '../components/detail-pages/DetailPageHeader'
import SummaryStatCard from '../components/detail-pages/SummaryStatCard'
import AnalysisCard from '../components/detail-pages/AnalysisCard'
import BackButton from '../components/detail-pages/BackButton'

const mockUserData = mockJobAnalysisData

function JobAnalysisDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate data fetching
      // TODO: Replace with actual API call
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      setIsLoading(false)
    } catch (err) {
      setError(err.message || 'An error occurred while loading data')
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [userId])
  
  const user = mockUserData.find(u => u.userId === userId)
  
  if (isLoading) {
    return <DetailPageSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <BackButton onClick={() => navigate('/job-analysis')} />
        <ErrorState title="Failed to load details" message={error} onRetry={fetchData} />
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="space-y-6">
        <BackButton onClick={() => navigate('/job-analysis')} />
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FileSearch className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User not found</h3>
            <p className="text-sm text-gray-500 max-w-md mb-4 text-center">
              The requested user could not be found. Please check the user ID and try again.
            </p>
            <button
              onClick={() => navigate('/job-analysis')}
              className="px-4 py-2 bg-[#2F279C] text-white rounded-lg hover:opacity-90 transition-all cursor-pointer font-medium"
            >
              Back to Job Analysis
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DetailPageHeader
        title="Job Analysis Details"
        subtitle={`${user.name} - ${user.email}`}
        onBack={() => navigate('/job-analysis')}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryStatCard
          icon={FileSearch}
          label="Total Analyses"
          value={user.totalAnalyses}
        />
      </div>

      {/* Detailed Analyses Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Detailed Job Analyses</h3>
            <p className="text-sm text-gray-600 mt-1">Complete job analysis history for this user</p>
          </div>
        </div>

        {user.analyses.length > 0 ? (
          <div className="space-y-4">
            {user.analyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} type="job" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No detailed analyses available</h3>
              <p className="text-sm text-gray-500 max-w-md">
                This user hasn't generated any job analyses yet. Analyses will appear here once they are created.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobAnalysisDetails

