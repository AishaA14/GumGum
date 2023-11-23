import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Fetch the task details based on the ID
    console.log('Task ID:', id);
    axios.get(`${backendUrl}/task/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    // Handle input changes for all fields except 'user'
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    // Use axios.put to send a PUT request to update the task
    axios.put(`${backendUrl}/task/${id}/`, task, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Task updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
    // Use axios.delete to send a DELETE request to delete the task
    axios.delete(`${backendUrl}/task/${id}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        navigate('/'); // Navigate to the home page or any other page
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
    }
  };


  return (
    <div>
      <h1>Edit:{task.title}</h1>
      <form>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <button type="button" className="btn" onClick={handleUpdate}>
          Update Task
        </button>
        <button type="button" className="btn" onClick={handleDelete}>
          Delete Task
        </button>
      </form>
    </div>
  );
};

