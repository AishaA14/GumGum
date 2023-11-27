import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTaskModal = ({ isOpen, onRequestClose, onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    // Validate the new task before adding
    if (newTask.title.trim() === '') {
      alert('title field required');
      return;
    }

    // Add the new task and close the modal
    onAddTask(newTask);
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
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
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
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="button"
            className="btn-pink bg-pink"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </form>
      </div>
    </Modal>
  );
};


export default AddTaskModal;
