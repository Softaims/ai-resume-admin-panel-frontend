import { useState, useEffect, useRef } from 'react'
import { Calendar, ChevronDown, Users, Search } from 'lucide-react'
import { TableSkeleton, TableRowSkeleton } from '../global/Skeleton'
import EmptyState from '../global/EmptyState'
import ErrorState from '../global/ErrorState'
import useUserOverviewStore from '../../store/userOverviewStore'

function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    currentPage === page
                      ? 'text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                  style={currentPage === page ? { background: '#2F279C' } : {}}
                >
                  {page}
                </button>
              )
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-2 text-gray-400">...</span>
            }
            return null
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function UserOverviewTable() {
  const {
    users,
    pagination,
    filters,
    isLoadingUsers,
    usersError,
    fetchUsers,
    setFilters,
  } = useUserOverviewStore()

  const [searchTerm, setSearchTerm] = useState(filters.search)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(filters.search)
  const [activeTab, setActiveTab] = useState(filters.tab)
  const [timeRange, setTimeRange] = useState(filters.timeRange)
  const [monthFilter, setMonthFilter] = useState(filters.monthFilter)
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [subscriptionFilter, setSubscriptionFilter] = useState(
    filters.subscriptionFilter
  )
  const [isSubscriptionDropdownOpen, setIsSubscriptionDropdownOpen] =
    useState(false)

  useEffect(() => {
    setSearchTerm(filters.search)
    setDebouncedSearchTerm(filters.search)
    setActiveTab(filters.tab)
    setTimeRange(filters.timeRange)
    setMonthFilter(filters.monthFilter)
    setSubscriptionFilter(filters.subscriptionFilter)
  }, [filters])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const [hasMounted, setHasMounted] = useState(false)
  const isInitialMountRef = useRef(true)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) {
      return
    }

    fetchUsers({
      page: pagination.currentPage,
      search: filters.search,
      tab: filters.tab,
      timeRange: filters.timeRange,
      monthFilter: filters.monthFilter,
      subscriptionFilter: filters.subscriptionFilter,
    }, false)
    
    isInitialMountRef.current = false
  }, [hasMounted])

  useEffect(() => {
    if (isInitialMountRef.current) {
      return
    }

    fetchUsers({
      page: 1,
      search: debouncedSearchTerm,
      tab: activeTab,
      timeRange,
      monthFilter,
      subscriptionFilter,
    }, false)
  }, [
    debouncedSearchTerm,
    activeTab,
    timeRange,
    monthFilter,
    subscriptionFilter,
  ])

  const generateMonthOptions = () => {
    const options = []
    const today = new Date()
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      options.push({ value, label })
    }
    return options
  }

  const monthOptions = generateMonthOptions()

  const paginatedUsers = users

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setTimeRange('7days')
    setMonthFilter('')
    setSubscriptionFilter('all')
  }

  const handleSubscriptionFilterChange = (filter) => {
    setSubscriptionFilter(filter)
    setIsSubscriptionDropdownOpen(false)
  }

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange)
    setMonthFilter('')
  }

  const handleMonthFilterChange = (filter) => {
    setMonthFilter(filter)
    setTimeRange('7days')
    setIsMonthDropdownOpen(false)
  }

  const handlePageChange = (page) => {
    fetchUsers({ 
      page, 
      tab: activeTab,
      search: debouncedSearchTerm,
      timeRange,
      monthFilter,
      subscriptionFilter 
    }, false)
  }

  if (usersError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <ErrorState 
          title="Failed to load users" 
          message={usersError}
          onRetry={() => fetchUsers({
            page: pagination.currentPage,
            search: debouncedSearchTerm,
            tab: activeTab,
            timeRange,
            monthFilter,
            subscriptionFilter,
          }, false)}
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">User Details</h3>
        <p className="text-sm text-gray-600">Comprehensive user information and activity</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex gap-6">
          <button
            onClick={() => handleTabChange('all')}
            className={`pb-3 px-1 text-sm font-medium transition-all cursor-pointer relative ${
              activeTab === 'all'
                ? 'text-[#2F279C]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Users
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2F279C]"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange('new')}
            className={`pb-3 px-1 text-sm font-medium transition-all cursor-pointer relative ${
              activeTab === 'new'
                ? 'text-[#2F279C]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            New Sign Ups
            {activeTab === 'new' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2F279C]"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange('active')}
            className={`pb-3 px-1 text-sm font-medium transition-all cursor-pointer relative ${
              activeTab === 'active'
                ? 'text-[#2F279C]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Users
            {activeTab === 'active' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2F279C]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Time Filters - Only show for New Sign Ups and Active Users */}
      {(activeTab === 'new' || activeTab === 'active') && (
        <div className="flex gap-2 mb-4 justify-end">
          {/* Month Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                monthFilter !== ''
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={monthFilter !== '' ? { background: '#2F279C' } : {}}
            >
              <Calendar className="w-3 h-3" />
              {monthFilter ? monthOptions.find(opt => opt.value === monthFilter)?.label || 'Select Month' : 'Select Month'}
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {isMonthDropdownOpen && (
              <>
                {/* Overlay to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMonthDropdownOpen(false)}
                ></div>
                
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleMonthFilterChange('')}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer ${
                      monthFilter === '' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    All Time
                  </button>
                  {monthOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleMonthFilterChange(option.value)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                        monthFilter === option.value 
                          ? 'bg-[#2F279C] text-white hover:bg-[#2F279C]' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Time Range Buttons */}
          <button
            onClick={() => handleTimeRangeChange('yesterday')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              timeRange === 'yesterday' && monthFilter === ''
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={timeRange === 'yesterday' && monthFilter === '' ? { background: '#2F279C' } : {}}
          >
            Yesterday
          </button>
          <button
            onClick={() => handleTimeRangeChange('7days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              timeRange === '7days' && monthFilter === ''
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={timeRange === '7days' && monthFilter === '' ? { background: '#2F279C' } : {}}
          >
            7 Days
          </button>
          <button
            onClick={() => handleTimeRangeChange('30days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              timeRange === '30days' && monthFilter === ''
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={timeRange === '30days' && monthFilter === '' ? { background: '#2F279C' } : {}}
          >
            30 Days
          </button>
        </div>
      )}

      {/* Filters Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-80 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        {/* Subscription Filter - Available for all tabs */}
        <div className="relative">
          <button
            onClick={() => setIsSubscriptionDropdownOpen(!isSubscriptionDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              subscriptionFilter !== 'all'
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={subscriptionFilter !== 'all' ? { background: '#2F279C' } : {}}
          >
            <Users className="w-3 h-3" />
            {subscriptionFilter === 'all' ? 'All Users' : subscriptionFilter === 'subscribed' ? 'Subscribed' : 'Non-Subscribed'}
            <ChevronDown className="w-3 h-3" />
          </button>
          
          {isSubscriptionDropdownOpen && (
            <>
              {/* Overlay to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsSubscriptionDropdownOpen(false)}
              ></div>
              
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <button
                  onClick={() => handleSubscriptionFilterChange('all')}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer ${
                    subscriptionFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  All Users
                </button>
                <button
                  onClick={() => handleSubscriptionFilterChange('subscribed')}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                    subscriptionFilter === 'subscribed' 
                      ? 'bg-[#2F279C] text-white hover:bg-[#2F279C]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Subscribed
                </button>
                <button
                  onClick={() => handleSubscriptionFilterChange('non-subscribed')}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                    subscriptionFilter === 'non-subscribed' 
                      ? 'bg-[#2F279C] text-white hover:bg-[#2F279C]' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Non-Subscribed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[140px]">
                {activeTab === 'active' ? 'Last Login Date' : 'Signup Date'}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Total Resumes
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                General Optimized Resumes
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Job Optimized Resumes
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Subscription Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingUsers ? (
              Array.from({ length: 4 }).map((_, index) => (
                <TableRowSkeleton key={index} cols={7} />
              ))
            ) : paginatedUsers.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No users found"
                message="Try adjusting your search or filter criteria to find users."
                colSpan={7}
              />
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(activeTab === 'active' ? user.lastActivityDate : user.signupDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.totalResumes}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.generalOptimized}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {user.jobOptimized}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        user.subscriptionStatus === 'Subscribed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {user.subscriptionStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalItems > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}
    </div>
  )
}

export default UserOverviewTable
