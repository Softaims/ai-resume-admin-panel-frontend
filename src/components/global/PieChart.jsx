function PieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  let currentAngle = 0
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    currentAngle += angle
    
    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      angle,
    }
  })

  return (
    <div className="flex items-center gap-6">
      <div className="w-[120px] h-[120px] flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {segments.map((segment, index) => {
            const largeArc = segment.angle > 180 ? 1 : 0
            const x1 = 50 + 50 * Math.cos((segment.startAngle) * (Math.PI / 180))
            const y1 = 50 + 50 * Math.sin((segment.startAngle) * (Math.PI / 180))
            const x2 = 50 + 50 * Math.cos((segment.startAngle + segment.angle) * (Math.PI / 180))
            const y2 = 50 + 50 * Math.sin((segment.startAngle + segment.angle) * (Math.PI / 180))
            
            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={segment.color}
                className="transition-opacity hover:opacity-80"
              />
            )
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: segment.color }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-gray-700">{segment.label}</span>
              <span className="text-xs text-gray-500">
                {segment.value} ({segment.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PieChart
