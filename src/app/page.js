'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';
import { setTasks } from '../redux/tasksSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => { 
      try {
        const response = await axios.get('http://localhost:5000/task');
        dispatch(setTasks(response.data.response));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6">
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900">
            Task Management App
          </h1>
        </div>
        <div>
          <TaskForm />
        </div>
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Home;
