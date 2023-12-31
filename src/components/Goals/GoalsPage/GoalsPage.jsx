import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddGoalModal from '../AddGoalModal/AddGoalModal';
import axios from 'axios';

export default function GoalsPage() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  
  useEffect(()  => {
        async function fetchGoals() {
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
        }
    fetchGoals()
  }, [backendUrl]); // Run only once when the component mounts

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

    // Check if the status code indicates success (2xx range)
    if (response.status === 201) {
      // Successful response, redirect or do whatever you need
      navigate('/goals');
    } else {
      // Handle unsuccessful response
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
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
              { completed: !goals.find(goal => goal.id === goalId)?.completed }, // Toggle the completion status
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json',
                },
              }
            );
          // Check if the status code indicates success (2xx range)
          if (response.status === 200) {
            // Successful response, redirect or do whatever you need
            navigate('/goals');
          } else {
            // Handle unsuccessful response
            throw new Error(`HTTP error! Status: ${response.status}`);
          }   
      // If the goal is successfully marked as completed, update the state
      setGoals((prevGoals) => {
          const updatedGoals = prevGoals.map(goal => {
              if (goal.id === goalId) {
                return { ...goal, completed: !goal.completed }; // Toggle the completion status
              }
              return goal;
            });
            return updatedGoals;
      });
      } catch (error) {
          console.error('Error marking goal as completed:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Your Goals Page</h1>
      <button className="bg-pink btn-pink" onClick={handleOpenModal}>
        Add a Goal?
      </button>

      <AddGoalModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onAddGoal={handleAddGoal}
      />
      <div className="w-full max-w-screen-lg">
        <ul>
        {goals
          .sort((a, b) => {
            // Sort tasks with completed ones at the bottom
            if (a.completed && !b.completed) {
              return 1;
            } else if (!a.completed && b.completed) {
              return -1;
            }
            return 0;
          })
          .map((goal) => (
              <li
                key={goal.id}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 p-6"
              >
                <p className={`mb-2 text-2xl font-bold tracking-tight ${goal.completed ? 'line-through' : ''} text-gray-900 dark:text-white`}>
                  {goal.completed ? (
                    <>
                      <span className="text-green-500">&#10004;</span> {/** Checkmark icon */}
                      <span className="ml-2">{goal.name}</span>
                    </>
                  ) : (
                    goal.name
                  )}
                </p>

                {expandedGoals.includes(goal.id) && (
                  <>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Description: {goal.description}
                    </p>
                    <p>Goal duration: {goal.goal_duration}</p>
                    <button className='bg-blue1 btn-teal'>
                      <Link to={`/edit_goal/${goal.id}`}>Edit Goal</Link>
                    </button>
                    <button
                      className="btn-purple"
                      onClick={() => handleMarkAsCompleted(goal.id, goal.completed)}
                      >
                      {goal.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
                    </button>

                    {/* View Habit Button */}
                    <button className='bg-blue2 btn-cyan'>
                      <Link to={`/habits/${goal.id}`}>View Habit</Link>
                    </button>
                    
                  </>
                )}
                <div>
                  <div
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleMoreDetails(goal.id)}
                  >
                    {expandedGoals.includes(goal.id) ? 'less details' : 'More details'}
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
