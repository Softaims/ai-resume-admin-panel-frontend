function FilterBar({ onFilterChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by name, email or user ID..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
            onChange={(e) => onFilterChange?.({ search: e.target.value })}
          />
        </div>
        
        <div className="min-w-[150px]">
          <select 
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
            onChange={(e) => onFilterChange?.({ subscription: e.target.value })}
          >
            <option value="">All Users</option>
            <option value="subscribed">Subscribed</option>
            <option value="non-subscribed">Non-Subscribed</option>
          </select>
        </div>
        
        <div className="min-w-[150px]">
          <input
            type="date"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
            onChange={(e) => onFilterChange?.({ dateFrom: e.target.value })}
            placeholder="From date"
          />
        </div>
        
        <div className="min-w-[150px]">
          <input
            type="date"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
            onChange={(e) => onFilterChange?.({ dateTo: e.target.value })}
            placeholder="To date"
          />
        </div>
        
        <button 
          className="px-6 py-2.5 text-white rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md cursor-pointer"
          style={{ background: 'linear-gradient(to right, #2F279C, #766EE4)' }}
          onClick={() => onFilterChange?.({ reset: true })}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default FilterBar
