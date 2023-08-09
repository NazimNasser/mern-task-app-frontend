import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, queryCache } from '@rtk-incubator/query';
import axios from 'axios';
import { tasksSlice } from '../redux/tasksSlice';

const API_BASE_URL = 'http://localhost:5000/api';

const TaskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due date is required'),
});

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  // Fetch tasks
  const fetchTasks = useQuery('tasks', async () => {
    const { data } = await axios.get(`${API_BASE_URL}/tasks`);
    return data;
  });

  // Add task
  const addTaskMutation = useMutation(
    (newTask) => axios.post(`${API_BASE_URL}/tasks`, newTask),
    {
      onSuccess: (newTask) => {
        queryCache.invalidateQueries('tasks');
        dispatch(tasksSlice.actions.addTask(newTask));
      },
    }
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
    },
    validationSchema: TaskSchema,
    onSubmit: (values, { resetForm }) => {
      addTaskMutation.mutate(values);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Task Management App</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border rounded w-full"
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="mt-1 p-2 border rounded w-full"
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="mt-1 p-2 border rounded w-full"
              {...formik.getFieldProps('dueDate')}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <div className="text-red-500">{formik.errors.dueDate}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          <ul>
            {fetchTasks.isSuccess &&
              fetchTasks.data.map((task) => (
                <li
                  key={task._id}
                  className="border p-2 mb-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <button
                    className={`${
                      task.completed ? 'bg-green-500' : 'bg-gray-500'
                    } text-white p-2 rounded`}
                  >
                    {task.completed ? 'Completed' : 'Mark as Completed'}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
