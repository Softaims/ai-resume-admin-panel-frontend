import { useEffect } from 'react'
import { FileText, CheckCircle } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import { SummaryCardSkeleton, TableSkeleton } from '../components/global/Skeleton'
import ResumeAnalysisTable from '../components/resume-analysis/ResumeAnalysisTable'
import ErrorState from '../components/global/ErrorState'
import useResumeAnalysisStore from '../store/resumeAnalysisStore'

function ResumeAnalysis() {
  const {
    stats,
    isLoadingStats,
    statsError,
    fetchStats,
  } = useResumeAnalysisStore()

  useEffect(() => {
    fetchStats()
  }, [])

  if (isLoadingStats && !stats) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
        </div>
        <TableSkeleton rows={8} cols={5} />
      </div>
    )
  }

  if (statsError) {
    return (
      <ErrorState
        title="Failed to load resume analysis"
        message={statsError}
        onRetry={fetchStats}
      />
    )
  }

  if (!stats) {
    return (
      <ErrorState
        title="No data available"
        message="Unable to load resume analysis statistics"
        onRetry={fetchStats}
      />
    )
  }

  const { totalAnalyses, totalOptimized } = stats

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
      <ResumeAnalysisTable />
    </div>
  )
}

export default ResumeAnalysis
