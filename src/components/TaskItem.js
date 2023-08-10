import React from 'react';

const TaskItem = ({
    task,
    editedTask,
    onEdit,
    onSaveEdit,
    onComplete,
    onDelete,
    onCancelEdit,
    isEditing,
}) => {
    return (
        <div key={task._id} className="w-1/4 md:w-1/2 sm:w-full px-2 mb-4">
            <div className="border p-4 rounded-lg bg-gray-100">

                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => onCancelEdit({ ...editedTask, title: e.target.value })}
                            className="mb-2 w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                        />
                        <textarea
                            value={editedTask.description}
                            onChange={(e) => onCancelEdit({ ...editedTask, description: e.target.value })}
                            className="mb-2 w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                        />
                        <input
                            type="text"
                            value={editedTask.dueDate}
                            onChange={(e) => onCancelEdit({ ...editedTask, dueDate: e.target.value })}
                            className="mb-2 w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                        />
                        <button
                            onClick={onSaveEdit}
                            className="bg-blue-600 w-full border border-transparent rounded-md py-1 px-2 inline-block text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                        <p className="text-gray-700 mb-2">{task.description}</p>
                        <p className="text-gray-500">Due: {task.dueDate}</p>
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onComplete(task._id, !task.completed)} // Toggle completed status
                                className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-300"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">
                                {task.completed ? 'Completed' : 'Mark as Completed'}
                            </span>
                        </label>
                    </>
                )}
                {!editedTask && (
                    <div className='mt-2 w-full flex'>
                        <button
                            onClick={() => onEdit(task)} // Enable editing mode for the task
                            className="bg-yellow-500 border w-full border-transparent rounded-md py-1 px-2 inline-block text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task._id)} // Call handleDeleteTask with task ID
                            className="bg-red-600 border w-full border-transparent rounded-md py-1 px-2 inline-block ml-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default TaskItem;
