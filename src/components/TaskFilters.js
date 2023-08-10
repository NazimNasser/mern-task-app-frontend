import React from 'react';

const TaskFilters = ({
  sortOrder,
  showCompleted,
  dueDateFilter,
  onSort,
  onToggleCompleted,
  onFilterByDueDate,
}) => {
  return (
    <div className="flex sm:flex-col flex-row  items-center justify-between mb-4">
      <div className="flex items-center mb-2 sm:mb-0">
        <button
          onClick={onSort}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
        <button
          onClick={onToggleCompleted}
          className="bg-blue-500 hover:bg-blue-600 ml-2 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </button>
      </div>
      <div className="flex items-center">
        <label htmlFor="dueDateFilter" className="font-medium mr-2 text-gray-700">
          Filter by Due Date:
        </label>
        <input
          type="date"
          id="dueDateFilter"
          value={dueDateFilter}
          onChange={onFilterByDueDate}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
    </div>
  );
};

export default TaskFilters;
