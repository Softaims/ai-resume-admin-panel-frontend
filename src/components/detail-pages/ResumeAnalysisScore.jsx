function ResumeAnalysisScore({ overallScore, atsCompatibility, keywordOptimization, achievementFocus }) {
  if (!overallScore) return null

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Resume Analysis Score</p>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold" style={{ color: '#2F279C' }}>
            {overallScore}%
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ATS Compatibility */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">ATS Compatibility</span>
            <span className="text-xs font-semibold" style={{ color: '#2F279C' }}>
              {atsCompatibility}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${atsCompatibility}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
        
        {/* Keyword Optimization */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Keyword Optimization</span>
            <span className="text-xs font-semibold" style={{ color: '#2F279C' }}>
              {keywordOptimization}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${keywordOptimization}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
        
        {/* Achievement Focus */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600">Achievement Focus</span>
            <span className="text-xs font-semibold" style={{ color: '#2F279C' }}>
              {achievementFocus}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: `${achievementFocus}%`,
                background: '#2F279C'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeAnalysisScore

