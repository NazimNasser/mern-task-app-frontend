import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTask, updateTask } from '../redux/tasksSlice'; // Import the deleteTask and updateTask actions
import TaskFilters from './TaskFilters';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState(null); // Track the edited task itself
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order: 'asc' or 'desc'
  const [showCompleted, setShowCompleted] = useState(true); // Show completed tasks
  const [dueDateFilter, setDueDateFilter] = useState(''); // State to hold the due date filter

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`);
      dispatch(deleteTask(taskId)); // Update Redux store by removing the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCompleteTask = async (taskId, isCompleted) => {
    try {
      const response = await axios.put(`http://localhost:5000/task/${taskId}`, {
        completed: isCompleted,
      });
      dispatch(updateTask(response.data.task)); // Update Redux store with the updated task
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = (tasks) => {
    setEditedTask(tasks);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/task/${editedTask._id}`, editedTask);
      dispatch(updateTask(response.data.task)); // Update Redux store with the edited task
      setEditedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleFilterByDueDate = (event) => {
    setDueDateFilter(event.target.value);
  };

  if (!tasks) {
    return <p>Loading tasks...</p>; // Handle the loading state
  }

  return (
    <div className="max-w-[80%] mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <TaskFilters
        sortOrder={sortOrder}
        showCompleted={showCompleted}
        dueDateFilter={dueDateFilter}
        onSort={handleSort}
        onToggleCompleted={handleToggleCompleted}
        onFilterByDueDate={handleFilterByDueDate}
      />
      <div className="flex flex-wrap -mx-2">
        {tasks
          .filter((task) => (showCompleted ? true : !task.completed))
          .filter((task) => (dueDateFilter ? task.dueDate === dueDateFilter : true))
          .sort((a, b) => {
            const aValue = new Date(a.dueDate).getTime();
            const bValue = new Date(b.dueDate).getTime();
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
          }).map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              editedTask={editedTask}
              onEdit={handleEditTask}
              onSaveEdit={handleSaveEdit}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
              onCancelEdit={setEditedTask}
              isEditing={editedTask && editedTask._id === task._id}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskList;
