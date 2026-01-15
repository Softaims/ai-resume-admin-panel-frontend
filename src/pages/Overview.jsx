import { Users, TrendingUp } from 'lucide-react'
import SummaryCard from '../components/SummaryCard'
import PieChart from '../components/PieChart'
import UserOverviewTable from '../components/UserOverviewTable'

function Overview() {
  const subscriptionData = [
    { label: 'Subscribed', value: 45, color: '#766EE4' },
    { label: 'Non-Subscribed', value: 74, color: '#9F97FF' },
  ]

  const totalUsers = 119
  const subscribedUsers = 45
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
