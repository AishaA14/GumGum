import React, { useState } from 'react';
import Modal from 'react-modal';

const AddHabitModal = ({ isOpen, onRequestClose, onAddHabit }) => {
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const handleAddHabit = () => {
    // Validate the new habit before adding
    if (newHabit.name.trim() === '') {
      alert('Name is a required field.');
      return;
    }

    // Add the new habit and close the modal
    onAddHabit(newHabit);
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
          <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onRequestClose}>
            X
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={newHabit.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              value={newHabit.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="button"
            className="btn w-full bg-blue-500 text-pink px-4 py-2 rounded-md"
            onClick={handleAddHabit}
          >
            Add Habit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddHabitModal;
