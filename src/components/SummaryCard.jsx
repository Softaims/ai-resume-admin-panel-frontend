function SummaryCard({ icon: Icon, title, value, subtitle, iconColor = 'text-blue-600' }) {
  const isComponent = typeof value === 'object' && value !== null && '$$typeof' in value
  
  const colorMap = {
    'text-blue-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-green-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-purple-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-orange-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-red-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-indigo-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-pink-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
    'text-teal-600': { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' },
  }
  
  const colors = colorMap[iconColor] || { bg: 'rgba(47,39,156,0.1)', color: '#2F279C' }
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {!isComponent && (
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" 
              style={{ background: colors.bg }}
            >
              <Icon className="w-6 h-6" style={{ color: colors.color }} />
            </div>
          )}
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      )}
      
      <div className={isComponent ? 'w-full' : ''}>
        <h3 className={`text-gray-600 text-sm font-medium ${isComponent ? 'mb-4' : 'mb-1'}`}>
          {title}
        </h3>
        {isComponent ? (
          <div className="w-full">{value}</div>
        ) : (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default SummaryCard
