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
    timeframe: '',
    // other fields 
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
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
        navigate('/'); // Navigate to the home page or any other page
      })
      .catch(error => {
        console.error('Error deleting goal:', error);
      });
  };


  return (
    <div>
      <h1>Edit:{goal.name}</h1>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={goal.name}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={goal.description}
          onChange={handleChange}
        />

        {/* Add other fields */}

        <label>Timeframe:</label>
        <input
          type="text"
          name="timeframe"
          value={goal.timeframe}
          onChange={handleChange}
        />

        <button type="button" className="btn" onClick={handleUpdate}>
          Update Goal
        </button>
        <button type="button" onClick={handleDelete}>
          Delete Goal
        </button>
      </form>
    </div>
  );
};

