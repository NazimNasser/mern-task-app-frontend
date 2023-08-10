import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { addTask } from '../redux/tasksSlice';
import TaskFormFields from './TaskFormFields';
import TaskFormButton from './TaskFormButton';

const TaskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due date is required'),
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [isTaskAdded, setIsTaskAdded] = useState(false); // State for success message

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      dueDate: '',
    },
    validationSchema: TaskSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://localhost:5000/task', values);
        resetForm();
        setIsFormVisible(false); // Hide the form
        setIsTaskAdded(true); // Show success message
        setTimeout(() => {
          setIsTaskAdded(false); // Hide the success message after 3 seconds
        }, 3000);
        dispatch(addTask(response.data.response));
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
  });

  return (
    <div className="max-w-[80%] mx-auto px-4">
      {isFormVisible ? (
        <form onSubmit={formik.handleSubmit} className="mt-4 max-w-md">
          <TaskFormFields formik={formik} />
          <TaskFormButton
            onCancel={() => setIsFormVisible(false)}
            isSubmitting={formik.isSubmitting}
          />
        </form>
      ) : (
        <TaskFormButton
          onClick={() => setIsFormVisible(true)}
          isSubmitting={formik.isSubmitting}
        />
      )}
      {isTaskAdded && (
        <p className="text-green-500 mt-2">Task added successfully!</p>
      )}
    </div>
  );
};

export default TaskForm;
