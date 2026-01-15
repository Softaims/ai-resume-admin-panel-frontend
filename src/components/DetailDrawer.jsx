import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'

function DetailDrawer({ isOpen, onClose, title, data, type }) {
  const [expandedItem, setExpandedItem] = useState(null)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[200] transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-[201] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {data.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(47, 39, 156, 0.1)' }}>
                <svg className="w-8 h-8" style={{ color: '#2F279C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">No data available</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.id}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.dateCreated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span 
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.optimizedGenerated 
                          ? 'text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={item.optimizedGenerated ? { background: '#766EE4' } : {}}
                    >
                      {item.optimizedGenerated ? 'Optimized Generated' : 'Analysis Only'}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Analysis Details</h4>
                      <button
                        onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                        className="text-xs font-medium transition-colors px-3 py-1.5 rounded-lg cursor-pointer"
                        style={{ 
                          background: expandedItem === index ? 'linear-gradient(to right, #2F279C, #766EE4)' : 'transparent',
                          color: expandedItem === index ? 'white' : '#2F279C'
                        }}
                      >
                        {expandedItem === index ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                    <p className={`text-sm text-gray-600 ${
                      expandedItem === index ? '' : 'line-clamp-2'
                    }`}>
                      {item.analysis}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-gray-100">
                    <a
                      href={item.originalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
                      style={{ color: '#2F279C' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Original
                    </a>
                    {item.optimizedGenerated && (
                      <a
                        href={item.optimizedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white font-medium transition-all px-3 py-1.5 rounded-lg shadow-sm"
                        style={{ background: 'linear-gradient(to right, #2F279C, #766EE4)' }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Optimized
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailDrawer
