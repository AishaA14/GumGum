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

  useEffect(() => {
    // Fetch the goal details based on the ID
    axios.get(`http://localhost:8000/goal/${id}/`)
      .then(response => {
        setGoal(response.data);
      })
      .catch(error => {
        console.error('Error fetching goal details:', error);
      });
  }, [id]);

  const handleUpdate = () => {
    // Implement the logic to update the goal
    // Use axios.put to send a PUT request to the API
    // Update the state or handle success 
  };

  const handleDelete = () => {
    // Use axios.delete to send a DELETE request
  };

  return (
    <div>
      <h1>Edit Goal</h1>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
        />
        <button type="button" onClick={handleUpdate}>Update Goal</button>
        <button type="button" onClick={handleDelete}>Delete Goal</button>
      </form>
    </div>
  );
};


