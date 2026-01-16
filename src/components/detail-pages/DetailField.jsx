function DetailField({ icon: Icon, label, value, colSpan = 2 }) {
  const colSpanClasses = {
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5'
  }
  
  return (
    <div className={colSpanClasses[colSpan] || 'col-span-2'}>
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-5 h-5 rounded flex items-center justify-center"
          style={{ background: 'rgba(47,39,156,0.1)' }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: '#2F279C' }} />
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  )
}

export default DetailField

