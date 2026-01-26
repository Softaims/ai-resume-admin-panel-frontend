import { useEffect } from 'react'
import { Users, FileText, MousePointerClick, UserPlus, ExternalLink, Briefcase, FileSearch, UserCheck, BarChart3, FileCheck, TrendingUp } from 'lucide-react'
import SummaryCard from '../components/global/SummaryCard'
import { SummaryCardSkeleton } from '../components/global/Skeleton'
import ErrorState from '../components/global/ErrorState'
import useVisitorStore from '../store/visitorStore'

function Dashboard() {
  const {
    stats,
    isLoading,
    error,
    fetchStats,
  } = useVisitorStore()

  useEffect(() => {
    if (!stats) {
      fetchStats(false)
    }
  }, [])

  if (isLoading && !stats) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 11 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        message={error}
        onRetry={fetchStats}
      />
    )
  }

  if (!stats) {
    return (
      <ErrorState
        title="No data available"
        message="Unable to load dashboard statistics"
        onRetry={fetchStats}
      />
    )
  }

  const { totalAppVisits, totalGuestResumeAnalysis, fixAtsOrCustomizedClicked, signupButtonClicked, totalSignedUpUsers, totalConsiliariClicks, totalJobAnalyses, averageJobAnalysisPerUser, totalResumeAnalyses, averageResumeAnalysisPerUser, conversionRate } = stats

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of platform statistics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={Users}
          title="Total App Visits"
          value={totalAppVisits.toString()}
          subtitle="Total website visits"
          iconColor="text-blue-600"
        />
        <SummaryCard
          icon={FileText}
          title="Guest Resume Analysis"
          value={totalGuestResumeAnalysis.toString()}
          subtitle="Guest users who analyzed resumes"
          iconColor="text-green-600"
        />
        <SummaryCard
          icon={MousePointerClick}
          title="Button Clicks"
          value={fixAtsOrCustomizedClicked.toString()}
          subtitle="Guest users who clicked Fix ATS or Customize Job"
          iconColor="text-purple-600"
        />
        <SummaryCard
          icon={UserPlus}
          title="Signup Clicks"
          value={signupButtonClicked.toString()}
          subtitle="Guest users who clicked signup button"
          iconColor="text-orange-600"
        />
        <SummaryCard
          icon={UserCheck}
          title="Total Signed Up Users"
          value={totalSignedUpUsers.toString()}
          subtitle="Total registered users"
          iconColor="text-pink-600"
        />
        <SummaryCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          subtitle="Guest to signed-up users conversion"
          iconColor="text-emerald-600"
        />
        <SummaryCard
          icon={ExternalLink}
          title="Consiliari Clicks"
          value={totalConsiliariClicks.toString()}
          subtitle="Logged-in users who clicked Consiliari button"
          iconColor="text-indigo-600"
        />
        <SummaryCard
          icon={FileSearch}
          title="Total Job Analyses"
          value={totalJobAnalyses.toString()}
          subtitle="Total job analyses in the system"
          iconColor="text-cyan-600"
        />
        <SummaryCard
          icon={Briefcase}
          title="Avg Job Analysis"
          value={averageJobAnalysisPerUser.toFixed(2)}
          subtitle="Average job analysis per user"
          iconColor="text-teal-600"
        />
        <SummaryCard
          icon={FileCheck}
          title="Total Resume Analysis"
          value={totalResumeAnalyses.toString()}
          subtitle="Total resume analyses in the system"
          iconColor="text-blue-600"
        />
        <SummaryCard
          icon={BarChart3}
          title="Avg Resume Analysis"
          value={averageResumeAnalysisPerUser.toFixed(2)}
          subtitle="Average resume analysis per user"
          iconColor="text-violet-600"
        />
        
      </div>
    </div>
  )
}

export default Dashboard
