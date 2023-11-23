import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddGoalModal from '../AddGoalModal/AddGoalModal';
import axios from 'axios';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchGoals = async (goalId) => {
    try {
      const response = await fetch(`${backendUrl}/goal`, {
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
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []); // Run only once when the component mounts

  const [expandedGoals, setExpandedGoals] = useState([]);

  const handleMoreDetails = (goalId) => {
    setExpandedGoals((prevExpandedGoals) => {
      const isGoalExpanded = prevExpandedGoals.includes(goalId);
      return isGoalExpanded
        ? prevExpandedGoals.filter((id) => id !== goalId)
        : [...prevExpandedGoals, goalId];
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const handleAddGoal = async (newGoal) => {
  try {
    // Make a POST request to create a new goal
    const response = await axios.post(
      `${backendUrl}/goal/create/`, newGoal,
      
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

    // If the goal is successfully created, fetch the updated list of goals
    fetchGoals();

    // onRequestClose();
  } catch (error) {
    console.error('Error adding goal:', error);
    // Handle error (e.g., show an alert to the user)
  }
};

const handleMarkAsCompleted = async (goalId) => {
    const confirmMarkCompleted = window.confirm('Are you sure you want to mark this goal as completed?');

    if (confirmMarkCompleted) {
      try {
        // Make a PATCH request to update the goal's completed status
        const response = await axios.patch(
          `${backendUrl}/goal/${goalId}/`, // Update the URL to include the goal ID
          { completed: true },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If the goal is successfully marked as completed, fetch the updated list of goals
        fetchGoals();
      } catch (error) {
        console.error('Error marking goal as completed:', error.message);
        // Handle error (e.g., show an alert to the user)
      }
    }
  };

  return (
    <div>
      <h1>Your goals Page</h1>
      <button className="bg-pink btn-pink" onClick={handleOpenModal}>
        Add a Goal?
      </button>

      <AddGoalModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onAddGoal={handleAddGoal}
      />
      <div>
      <ul>
      {goals.filter((goal) => !goal.completed) // Filter out completed goals
          .map((goal) => (
          <li key={goal.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name: {goal.name}</p>
            <p>Timeframe: {goal.timeframe}</p>
            {expandedGoals.includes(goal.id) && (
                <>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Description: {goal.description}</p>
                  <p>Start Date: {new Date(goal.start_date).toLocaleDateString()}</p>
                  <p>End Date: {new Date(goal.end_date).toLocaleDateString()}</p>
                  <button className='bg-blue1 btn-teal'>
                    <Link to={`/edit_goal/${goal.id}`}>Edit Goal</Link>
                  </button>
                  {/* View Habit Button */}
                  <button className='bg-blue2 btn-cyan'>
                    <Link to={`/habits/${goal.id}`}>View Habit</Link>
                  </button>

                  {/* Mark as Completed Button */}
                  <button className='bg-purple btn-purple' onClick={() => handleMarkAsCompleted(goal.id)}>
                    Mark as Completed
                 </button>
                </>
              ) 
            }
            <div>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => handleMoreDetails(goal.id)}
            >
              {expandedGoals.includes(goal.id) ? 'less details' : 'More details'}
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



