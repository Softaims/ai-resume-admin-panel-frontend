function MatchRateWidget({ matchRate }) {
  if (!matchRate) return null

  // Calculate total sum of all 4 numbers
  const totalSum = matchRate.searchability.issues + 
                  matchRate.skills.missing + 
                  matchRate.formatting.issues + 
                  matchRate.recruiterTips.tips
  
  // Calculate individual progress percentages based on each value's proportion of total
  const searchabilityProgress = totalSum > 0 ? (matchRate.searchability.issues / totalSum) * 100 : 0
  const skillsProgress = totalSum > 0 ? (matchRate.skills.missing / totalSum) * 100 : 0
  const formattingProgress = totalSum > 0 ? (matchRate.formatting.issues / totalSum) * 100 : 0
  const recruiterTipsProgress = totalSum > 0 ? (matchRate.recruiterTips.tips / totalSum) * 100 : 0

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Match Rate</p>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold" style={{ color: '#2F279C' }}>
            {matchRate.overall}%
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Searchability */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Searchability</span>
            <span className="text-xs font-semibold text-red-600">
              {matchRate.searchability.issues} issues
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${searchabilityProgress}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Skills</span>
            <span className="text-xs font-semibold text-red-600">
              {matchRate.skills.missing} missing
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${skillsProgress}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
        
        {/* Formatting */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Formatting</span>
            <span className="text-xs font-semibold text-red-600">
              {matchRate.formatting.issues} issues
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${formattingProgress}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
        
        {/* Recruiter Tips */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Recruiter Tips</span>
            <span className="text-xs font-semibold text-gray-600">
              {matchRate.recruiterTips.tips} tips
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${recruiterTipsProgress}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchRateWidget

