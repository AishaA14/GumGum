import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


const AddGoalModal = ({ isOpen, onRequestClose, onAddGoal }) => {
  const navigate = useNavigate();
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    goal_duration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleAddGoal = () => {
    // Validate the new goal before adding
    if (newGoal.name.trim() === '' ) {
      alert('Name and Goal duration are required fields.');
      return;
    }

    // Add the new goal and close the modal
    onAddGoal(newGoal);
    navigate('/goals');
    window.location.reload();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Goal</h2>
        <button
        className="text-gray-600 hover:text-gray-800"
            onClick={onRequestClose}
          >
            X
        </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={newGoal.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              value={newGoal.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Goal Duration:</label>
            <select
              name="goal_duration"
              value={newGoal.goal_duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select an option</option>
              <option value="One Time">One Time</option>
              <option value="Continuous">Continuous</option>
            </select>
          </div>
          <button
            type="button"
            className="btn-pink bg-pink"
            onClick={handleAddGoal}
          >
            Add Goal
          </button>
        </form>
      </div>
    </Modal>
  );
};


export default AddGoalModal;
