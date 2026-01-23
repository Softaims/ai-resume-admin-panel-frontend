import { useEffect } from 'react'
import { Users, TrendingUp } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import PieChart from '../components/global/PieChart'
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

  const { totalUsers, subscribedUsers, nonSubscribedUsers, conversionRate } =
    overviewStats

  const subscriptionData = [
    { label: 'Subscribed', value: subscribedUsers, color: '#766EE4' },
    { label: 'Non-Subscribed', value: nonSubscribedUsers, color: '#9F97FF' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Overview</h2>
        <p className="text-gray-600 mt-1">Track user metrics, subscriptions, and activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={Users}
          title="Total Users"
          value={totalUsers.toString()}
          subtitle="Registered users"
          iconColor="text-blue-600"
        />
        <SummaryCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Subscription conversion"
          iconColor="text-green-600"
        />
        <SummaryCard
          title="Subscribed vs Non-Subscribed"
          value={
            <PieChart data={subscriptionData} />
          }
        />
      </div>
      
      <UserOverviewTable />
    </div>
  )
}

export default Overview
