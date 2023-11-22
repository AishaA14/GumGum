import React, { useState } from 'react';
import Modal from 'react-modal';

const AddGoalModal = ({ isOpen, onRequestClose, onAddGoal }) => {
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    timeframe: '',
    start_date: '',
    end_date: '',
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
    if (newGoal.name.trim() === '' || newGoal.timeframe.trim() === '') {
      alert('Name and Timeframe are required fields.');
      return;
    }

    // Add the new goal and close the modal
    onAddGoal(newGoal);
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
            {/* You can use an SVG or any other close icon here */}
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
            <label className="block text-sm font-semibold mb-1">Timeframe:</label>
            <input
              type="text"
              name="timeframe"
              value={newGoal.timeframe}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Start Date:</label>
            <input
              type="date"
              name="start_date"
              value={newGoal.start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">End Date:</label>
            <input
              type="date"
              name="end_date"
              value={newGoal.end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="button"
            className="btn w-full bg-blue-500 text-pink px-4 py-2 rounded-md"
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
