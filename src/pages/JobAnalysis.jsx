import { useEffect } from 'react'
import { FileSearch, Briefcase } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import { SummaryCardSkeleton, TableSkeleton } from '../components/global/Skeleton'
import JobAnalysisTable from '../components/job-analysis/JobAnalysisTable'
import ErrorState from '../components/global/ErrorState'
import useJobAnalysisStore from '../store/jobAnalysisStore'

function JobAnalysis() {
  const {
    stats,
    isLoadingStats,
    statsError,
    fetchStats,
  } = useJobAnalysisStore()

  useEffect(() => {
    fetchStats()
  }, [])

  if (isLoadingStats && !stats) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCardSkeleton /> 
          <SummaryCardSkeleton />
        </div>
        <TableSkeleton rows={8} cols={4} />
      </div>
    )
  }

  if (statsError) {
    return (
      <ErrorState
        title="Failed to load job analysis"
        message={statsError}
        onRetry={fetchStats}
      />
    )
  }

  if (!stats) {
    return (
      <ErrorState
        title="No data available"
        message="Unable to load job analysis statistics"
        onRetry={fetchStats}
      />
    )
  }

  const { totalAnalyses, averageJobAnalysisPerUser } = stats

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
        <SummaryCard
          icon={Briefcase}
          title="Avg Job Analysis"
          value={averageJobAnalysisPerUser}
          subtitle="Average job analysis per user"
          iconColor="text-teal-600"
        />
      </div>
      
      {/* Job Analysis Per User */}
      <JobAnalysisTable />
    </div>
  )
}

export default JobAnalysis
