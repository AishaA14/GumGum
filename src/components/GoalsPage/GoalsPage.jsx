import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:8000/goal/', {
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
  return (
    <div>
      <h1>Your goals Page</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <p>Name: {goal.name} - <Link to={`/edit-goal/${goal.id}`}>Edit</Link> </p>
            <p>Description: {goal.description}</p>
            <p>Timeframe: {goal.timeframe}</p>
            <p>Start Date: {goal.start_date}</p>
            <p>End Date: {goal.end_date}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}
