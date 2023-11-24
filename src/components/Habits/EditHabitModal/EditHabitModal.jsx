import React, { useState } from 'react';
import Modal from 'react-modal';

export default function EditHabitModal({ isOpen, onRequestClose, habit, onUpdateHabit, onDeleteHabit }) {
  const [editedHabit, setEditedHabit] = useState({ ...habit });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const handleUpdateHabit = () => {
    onUpdateHabit(editedHabit);
    onRequestClose();
  };

  const handleDeleteHabit = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this habit?');
    if (isConfirmed) {
      onDeleteHabit(habit.id);
      onRequestClose();
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <div className="bg-white w-full max-w-md p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Set a daily Habit</h2>
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
            value={editedHabit.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={editedHabit.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Frequency Unit:</label>
          <select
            name="frequency_unit"
            value={editedHabit.frequency_unit}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div> */}

        {/* <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Frequency Amount:</label>
          <input
            type="number"
            name="frequency_amount"
            value={editedHabit.frequency_amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div> */}

        {/* Repeat option field */}
        {/* <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Repeat Option:</label>
            <select
              name="repeat_option"
              value={editedHabit.repeat_option || 'daily'} // default to daily if not set
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
          </div> */}

          {/* Conditionally render custom repeat input */}
          {/* {editedHabit.repeat_option === 'custom' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Custom Repeat:</label>
              <input
                type="text"
                name="custom_repeat"
                value={editedHabit.custom_repeat || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          )} */}

          

          <button
            type="button"
            className="btn w-full bg-blue-500 text-pink px-4 py-2 rounded-md"
            onClick={handleUpdateHabit}
          >
            Update
          </button>

        <button
          type="button"
          className="btn w-full bg-red-500 text-white px-4 py-2 mt-2 rounded-md"
          onClick={handleDeleteHabit}
        >
          Delete
        </button>
      </form>
    </div>
  </Modal>
  );
}