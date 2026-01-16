import { useState, useEffect } from 'react'
import { FileSearch } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import { mockJobAnalysisData, jobAnalysisStats } from '../data/mockJobAnalysis'
import { SummaryCardSkeleton, TableSkeleton } from '../components/global/Skeleton'
import JobAnalysisTable from '../components/job-analysis/JobAnalysisTable'
import ErrorState from '../components/global/ErrorState'

const mockUserData = mockJobAnalysisData

function JobAnalysis() {
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
  }, [])

  // System-wide metrics from backend (mock data for now)
  const { totalAnalyses } = jobAnalysisStats

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCardSkeleton />
        </div>
        <TableSkeleton rows={8} cols={4} />
      </div>
    )
  }

  if (error) {
    return <ErrorState title="Failed to load job analysis" message={error} onRetry={fetchData} />
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
      <JobAnalysisTable users={mockUserData} />
    </div>
  )
}

export default JobAnalysis
