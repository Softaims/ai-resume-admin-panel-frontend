import { useEffect } from 'react'
import { Users } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import UserOverviewTable from '../components/user-overview/UserOverviewTable'
import { PageSkeleton } from '../components/global/Skeleton'
import ErrorState from '../components/global/ErrorState'
import useUserOverviewStore from '../store/userOverviewStore'

function Overview() {
  const {
    overviewStats,
    isLoadingStats,
    statsError,
    fetchOverviewStats,
  } = useUserOverviewStore()

  useEffect(() => {
    if (!overviewStats) {
      fetchOverviewStats(false)
    }
  }, [])

  if (isLoadingStats && !overviewStats) {
    return <PageSkeleton />
  }

  if (statsError) {
    return (
      <ErrorState
        title="Failed to load overview"
        message={statsError}
        onRetry={fetchOverviewStats}
      />
    )
  }

  if (!overviewStats) {
    return (
      <ErrorState
        title="No data available"
        message="Unable to load overview statistics"
        onRetry={fetchOverviewStats}
      />
    )
  }

  const { totalUsers } = overviewStats

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Overview</h2>
        <p className="text-gray-600 mt-1">Track user metrics and activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={Users}
          title="Total Users"
          value={totalUsers.toString()}
          subtitle="Registered users"
          iconColor="text-blue-600"
        />
      </div>
      
      <UserOverviewTable />
    </div>
  )
}

export default Overview
