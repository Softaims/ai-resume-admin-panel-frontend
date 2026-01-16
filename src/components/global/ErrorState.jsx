import { AlertCircle, RefreshCw } from 'lucide-react'

function ErrorState({ 
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  colSpan = 1,
  isTableRow = false
}) {
  const content = (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-sm text-gray-500 max-w-md mb-4 text-center">{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#2F279C] text-white rounded-lg hover:opacity-90 transition-all cursor-pointer font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )

  if (isTableRow) {
    return (
      <tr>
        <td colSpan={colSpan} className="text-center">
          {content}
        </td>
      </tr>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {content}
    </div>
  )
}

export default ErrorState

