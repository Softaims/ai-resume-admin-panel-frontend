import { useState, useEffect } from 'react'
import { Users, TrendingUp } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import PieChart from '../components/global/PieChart'
import UserOverviewTable from '../components/user-overview/UserOverviewTable'
import { mockSubscriptionData, mockOverviewStats } from '../data/mockOverview'
import { PageSkeleton } from '../components/global/Skeleton'
import ErrorState from '../components/global/ErrorState'

function Overview() {
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

  if (isLoading) {
    return <PageSkeleton />
  }

  if (error) {
    return <ErrorState title="Failed to load overview" message={error} onRetry={fetchData} />
  }

  const subscriptionData = mockSubscriptionData
  const { totalUsers, subscribedUsers } = mockOverviewStats
  const conversionRate = ((subscribedUsers / totalUsers) * 100).toFixed(1)

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
