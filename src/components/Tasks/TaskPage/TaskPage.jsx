import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import axios from 'axios';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
//   const { id } = useParams();

  const fetchTasks = async (taskId) => {
    try {
      const response = await fetch(`${backendUrl}/task`, {
        method: 'GET',
        headers: new Headers({ 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the entire API response
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Run only once when the component mounts

  const [expandedTasks, setExpandedTasks] = useState([]);

  const handleMoreDetails = (taskId) => {
    setExpandedTasks((prevExpandedTasks) => {
      const isTaskExpanded = prevExpandedTasks.includes(taskId);
      return isTaskExpanded
        ? prevExpandedTasks.filter((id) => id !== taskId)
        : [...prevExpandedTasks, taskId];
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const handleAddTask = async (newTask) => {
  try {
    // Make a POST request to create a new task
    const response = await axios.post(
      `${backendUrl}/task/create/`, newTask,
      
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If the task is successfully created, fetch the updated list of tasks
    fetchTasks();

    // onRequestClose();
  } catch (error) {
    console.error('Error adding task:', error);
    // Handle error (e.g., show an alert to the user)
  }
};

const handleMarkAsCompleted = async (taskId) => {
    const confirmMarkCompleted = window.confirm('Are you sure you want to mark this task as completed?');

    if (confirmMarkCompleted) {
      try {
        // Make a PATCH request to update the task's completed status
        const response = await axios.patch(
          `${backendUrl}/task/${taskId}/`, // Update the URL to include the task ID
          { is_completed: true },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If the task is successfully marked as completed, fetch the updated list of tasks
        fetchTasks();
      } catch (error) {
        console.error('Error marking task as completed:', error);
        // Handle error (e.g., show an alert to the user)
      }
    }
  };

  return (
    <div>
      <h1>Your tasks Page</h1>
      <button className="btn" onClick={handleOpenModal}>
        Add Task
      </button>

      <AddTaskModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onAddTask={handleAddTask}
      />
      <div>
      <ul>
      {tasks.filter((task) => !task.is_completed)
          .map((task) => (
          <li key={task.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name: {task.title}</p>
            {expandedTasks.includes(task.id) && (
                <>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Description: {task.description}</p>
                  <button className='btn'>
                    <Link to={`/edit_task/${task.id}`}>Edit</Link>
                  </button>

                  {/* Mark as Completed Button */}
                  <button className='btn mx-2' onClick={() => handleMarkAsCompleted(task.id)}>
                    Mark as Completed
                 </button>
                </>
              ) 
            }
            <div>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => handleMoreDetails(task.id)}
            >
              {expandedTasks.includes(task.id) ? 'less details' : 'More details'}
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}



