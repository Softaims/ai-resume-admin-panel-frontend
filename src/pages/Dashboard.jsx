import { useEffect } from "react";
import { Users, FileText, MousePointerClick, UserPlus, ExternalLink, Briefcase, FileSearch, UserCheck, BarChart3, FileCheck, TrendingUp } from "lucide-react";
import SummaryCard from "../components/global/SummaryCard";
import { SummaryCardSkeleton } from "../components/global/Skeleton";
import ErrorState from "../components/global/ErrorState";
import useVisitorStore from "../store/visitorStore";

function UserTrendGraph({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const graphData = data;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Growth (Last 12 Months)</h3>
          <p className="text-sm text-gray-600 mt-1">Cumulative total users over the past 12 months</p>
        </div>
      </div>
      <div className="h-80 relative pl-12 pb-8">
        {graphData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-sm">No graph data available</div>
          </div>
        ) : (
          <>
            <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-600">
              {(() => {
                const values = graphData.map((d) => d.value);
                const maxValue = Math.max(...values);
                const minValue = Math.min(...values);
                const step = (maxValue - minValue) / 4 || 0;
                return [
                  <span key="4" className="text-right w-10">
                    {Math.round(maxValue).toLocaleString()}
                  </span>,
                  <span key="3" className="text-right w-10">
                    {Math.round(maxValue - step).toLocaleString()}
                  </span>,
                  <span key="2" className="text-right w-10">
                    {Math.round(maxValue - 2 * step).toLocaleString()}
                  </span>,
                  <span key="1" className="text-right w-10">
                    {Math.round(maxValue - 3 * step).toLocaleString()}
                  </span>,
                  <span key="0" className="text-right w-10">
                    {Math.round(minValue).toLocaleString()}
                  </span>,
                ];
              })()}
            </div>

            <svg className="w-full h-64" viewBox="0 0 800 256" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2F279C" />
                  <stop offset="100%" stopColor="#615ab9ff" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#766EE4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2F279C" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <line x1="0" y1="64" x2="800" y2="64" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="128" x2="800" y2="128" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="192" x2="800" y2="192" stroke="#e5e7eb" strokeWidth="1" />

              {(() => {
                const values = graphData.map((d) => d.value);
                const maxValue = Math.max(...values);
                const minValue = Math.min(...values);
                const range = maxValue - minValue || 1;
                const padding = 10;

                const points = values
                  .map((value, index) => {
                    const x = values.length === 1 ? 400 : (index / (values.length - 1)) * 800;
                    const y = 256 - padding - ((value - minValue) / range) * (256 - 2 * padding);
                    return `${x},${y}`;
                  })
                  .join(" ");

                const areaPath = `M 0,256 L ${values
                  .map((value, index) => {
                    const x = values.length === 1 ? 400 : (index / (values.length - 1)) * 800;
                    const y = 256 - padding - ((value - minValue) / range) * (256 - 2 * padding);
                    return `${x},${y}`;
                  })
                  .join(" L ")} L 800,256 Z`;

                return (
                  <>
                    <path d={areaPath} fill="url(#areaGradient)" />

                    <polyline points={points} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                    {values.map((value, index) => {
                      const x = values.length === 1 ? 400 : (index / (values.length - 1)) * 800;
                      const y = 256 - padding - ((value - minValue) / range) * (256 - 2 * padding);
                      return (
                        <g key={index}>
                          <circle cx={x} cy={y} r="5" fill="#2F279C" stroke="white" strokeWidth="2" />
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>

            <div className="absolute top-0 left-12 w-[calc(100%-3rem)] h-64 pointer-events-none">
              {graphData.map((item, index) => {
                const values = graphData.map((d) => d.value);
                const maxValue = Math.max(...values);
                const minValue = Math.min(...values);
                const range = maxValue - minValue || 1;
                const padding = 10;
                const x = graphData.length === 1 ? 50 : (index / (graphData.length - 1)) * 100;
                const y = 100 - padding - ((item.value - minValue) / range) * (100 - 2 * padding);

                return (
                  <div
                    key={index}
                    className="absolute text-xs font-semibold text-gray-900 bg-white px-1 rounded"
                    style={{
                      left: `${x}%`,
                      top: `${y - 5}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    {item.value.toLocaleString()}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-600">
              {graphData.map((item, index) => (
                <span key={index}>{item.label}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const { stats, isLoading, error, fetchStats } = useVisitorStore();

  useEffect(() => {
    if (!stats) {
      fetchStats(false);
    }
  }, []);

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
    );
  }

  if (error) {
    return <ErrorState title="Failed to load dashboard" message={error} onRetry={fetchStats} />;
  }

  if (!stats) {
    return <ErrorState title="No data available" message="Unable to load dashboard statistics" onRetry={fetchStats} />;
  }

  const {
    totalAppVisits,
    totalGuestResumeAnalysis,
    fixAtsOrCustomizedClicked,
    signupButtonClicked,
    totalSignedUpUsers,
    totalConsiliariClicks,
    activeUsersYesterday,
    activeUsersLast7Days,
    activeUsersLast30Days,
    totalJobAnalyses,
    averageJobAnalysisPerUser,
    totalResumeAnalyses,
    averageResumeAnalysisPerUser,
    userGrowthLast12Months,
  } = stats;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of platform statistics</p>
      </div>

      <UserTrendGraph data={userGrowthLast12Months} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard icon={Users} title="Total App Visits" value={totalAppVisits.toString()} subtitle="Total website visits" iconColor="text-blue-600" />
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
        {/* <SummaryCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${conversionRate.toFixed(2)}%`}
          subtitle="Guest to signed-up users conversion"
          iconColor="text-emerald-600"
        /> */}
        <SummaryCard
          icon={ExternalLink}
          title="Consiliari Clicks"
          value={totalConsiliariClicks.toString()}
          subtitle="Logged-in users who clicked Consiliari button"
          iconColor="text-indigo-600"
        />
        <SummaryCard
          icon={ExternalLink}
          title="Active Users"
          value={activeUsersYesterday.toString()}
          subtitle="Active Users Yesterday"
          iconColor="text-indigo-600"
        />
        <SummaryCard
          icon={ExternalLink}
          title="Active Users"
          value={activeUsersLast7Days.toString()}
          subtitle="Active Users in Last 7 days"
          iconColor="text-indigo-600"
        />
        <SummaryCard
          icon={ExternalLink}
          title="Active Users"
          value={activeUsersLast30Days.toString()}
          subtitle="Active Users in Last 30 days"
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
  );
}

export default Dashboard;
