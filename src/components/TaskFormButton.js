import React from 'react';

const TaskFormButton = ({ onClick, onCancel, isSubmitting }) => {
    if (isSubmitting) {
        return <p>Submitting...</p>;
    }

    return (
        <div className="flex items-center justify-end mt-4">
            {onCancel && (
                <button
                    onClick={onCancel}
                    className="bg-red-600 border border-transparent rounded-md py-2 px-8 inline-flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Cancel
                </button>
            )}
            <button
                onClick={onClick}
                className="ml-3 bg-indigo-600 border border-transparent rounded-md py-2 px-8 inline-flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {onCancel ? 'Add Task' : 'Add Task'}
            </button>
        </div>
    );
};

export default TaskFormButton;
