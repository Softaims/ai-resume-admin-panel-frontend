function EmptyState({ 
  icon: Icon, 
  title, 
  message, 
  action,
  colSpan = 1 
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-16">
        <div className="flex flex-col items-center justify-center">
          {Icon && (
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {message && (
            <p className="text-sm text-gray-500 max-w-md mb-4">{message}</p>
          )}
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}

export default EmptyState

