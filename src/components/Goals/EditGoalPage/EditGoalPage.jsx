import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function EditGoalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState({
    name: '',
    description: '',
    goal_duration: ''
    // timeframe: '', 
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Fetch the goal details based on the ID
    console.log('Goal ID:', id);
    axios.get(`${backendUrl}/goal/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        setGoal(response.data);
      })
      .catch(error => {
        console.error('Error fetching goal details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    // Handle input changes for all fields except 'user'
    const { name, value } = e.target;
    setGoal(prevGoal => ({
      ...prevGoal,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    // Use axios.put to send a PUT request to update the goal
    axios.put(`${backendUrl}/goal/${id}/`, goal, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Goal updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating goal:', error);
      });
  };

  const handleDelete = () => {
    // Use axios.delete to send a DELETE request to delete the goal
    axios.delete(`${backendUrl}/goal/${id}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Goal deleted successfully:', response.data);
        navigate('/goals'); // Navigate to goals page
      })
      .catch(error => {
        console.error('Error deleting goal:', error);
      });
  };

  return (
    <div>
      <h1>Edit: {goal.name}</h1>
      <form className="bg-white w-full max-w-md p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={goal.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={goal.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Goal Duration:</label>
          <select
            name="goal_duration"
            value={goal.goal_duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="continuous">Continuous</option>
            <option value="onetime">One Time</option>
          </select>
        </div>

        <button
          type="button"
          className="btn w-full bg-blue-500 text-pink px-4 py-2 rounded-md"
          onClick={handleUpdate}
        >
          Update Goal
        </button>

        <button
          type="button"
          className="btn w-full bg-red-500 text-white px-4 py-2 mt-2 rounded-md"
          onClick={handleDelete}
        >
          Delete Goal
        </button>
      </form>
    </div>
  );
};

