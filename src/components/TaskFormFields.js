import React from 'react';

const TaskFormFields = ({ formik }) => {
    return (
        <div className="grid grid-cols-1 gap-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        className="shadow-sm focus:ring-indigo-500 py-1 px-2 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                    )}
                </div>
            </div>

            {/* Description Field */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <div className="mt-1">
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className="shadow-sm focus:ring-indigo-500 px-2 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                    )}
                </div>
            </div>

            {/* Due Date Field */}
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Due Date
                </label>
                <div className="mt-1">
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dueDate}
                        className="shadow-sm focus:ring-indigo-500 py-1 px-2 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {formik.touched.dueDate && formik.errors.dueDate && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.dueDate}</div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default TaskFormFields;
