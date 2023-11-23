import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddHabitModal from '../AddHabitModal/AddHabitModal';
import EditHabitModal from '../EditHabitModal/EditHabitModal';
import axios from 'axios';

const HabitPage = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null); // Track the habit being edited
  const [completedFrequencies, setCompletedFrequencies] = useState({}); // Track completed frequencies

  const { goalId } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const fetchHabits = async () => {
        try {
          const response = await axios.get(`${backendUrl}/habits/goal/${goalId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

        // Initialize completed frequencies for each habit
        const initialCompletedFrequencies = {};
        response.data.forEach((habit) => {
          initialCompletedFrequencies[habit.id] = 0;
      });

        setCompletedFrequencies(initialCompletedFrequencies);
        setHabits(response.data);
          } catch (error) {
        console.error('Error fetching habits:', error);
          }
      };

    fetchHabits();
  }, [goalId]);
    
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
    const handleAddHabit = async (newHabit) => {
      try {
        // Make a POST request to create a new goal
        const response = await axios.post(
          `${backendUrl}/habits/${goalId}/`, newHabit,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          }
          );
          
          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          // If the goal is successfully created, fetch the updated list of goals
          // fetchHabits();
          
          setCompletedFrequencies((prevCompletedFrequencies) => ({
            ...prevCompletedFrequencies,
            [response.data.id]: 0,
          }));
          // onRequestClose();
        } catch (error) {
          console.error('Error adding habit:', error);
          // Handle error (e.g., show an alert to the user)
        }
      };

      const handleEditHabit = (habit) => {
        setSelectedHabit(habit);
        setEditModalOpen(true);
      };
    
      const handleUpdateHabit = async (updatedHabit) => {
        try {
          console.log(updatedHabit.id)
          const response = await axios.put(
            `${backendUrl}/habits/${updatedHabit.id}/`,
            updatedHabit,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            // Update the habit list with the updated habit
            setHabits((prevHabits) =>
              prevHabits.map((habit) =>
                habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
              )
            );
            // Reset completed frequencies when updating a habit
               setCompletedFrequencies((prevCompletedFrequencies) => ({
                 ...prevCompletedFrequencies,
                 [updatedHabit.id]: 0,
               }));
          } else {
            console.error('Failed to update habit:', response);
          }
        } catch (error) {
          console.error('Error updating habit:', error);
        }
      };

    
      const handleDeleteHabit = async (habitId) => {
        try {
          const response = await axios.delete(`${backendUrl}/habits/${habitId}/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
    
          if (response.status === 204) {
            // Remove the deleted habit from the habit list
            setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
          } else {
            console.error('Failed to delete habit:', response);
          }
        } catch (error) {
          console.error('Error deleting habit:', error);
        }
      };
      const handleCompleteFrequency = (habitId) => {
        // Update completed frequencies when a frequency is marked as completed
        setCompletedFrequencies((prevCompletedFrequencies) => ({
          ...prevCompletedFrequencies,
          [habitId]: prevCompletedFrequencies[habitId] + 1,
        }));
      };
      const handleToggleCircle = (habitId, frequencyIndex) => {
        // Update the completion status of the clicked circle
        setCompletedFrequencies((prevCompletedFrequencies) => {
          const updatedFrequencies = { ...prevCompletedFrequencies };
          updatedFrequencies[habitId] = frequencyIndex + 1; // 0-based index
          return updatedFrequencies;
        });
      };

  return (
    <div>
      <h2>Habits to achieve your goal</h2>
      {habits.length === 0 ? (
      <p>No habits found for this goal.</p>
      ) : (
      <ul>
        {habits.map((habit) => (
            <div key={habit.id}>
              <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{habit.name}</h2>
                <p className='font-normal text-gray-700 dark:text-gray-400'>{habit.description}</p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>Frequency: {habit.frequency_amount} {habit.frequency_unit}</p>
                <button className="bg-blue1 btn-teal" onClick={() => handleEditHabit(habit)}>Edit</button>
                <button className="bg-light-purple btn-pink" onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
                {/* Render circles based on the frequency amount */}
                {[...Array(habit.frequency_amount)].map((_, index) => (
                  <span
                    key={index}
                    className={`absolute circle ${
                      completedFrequencies[habit.id] > index
                        ? "completed-circle"
                        : "incomplete-circle"
                    }`}
                    onClick={() => handleToggleCircle(habit.id, index)}
                  ></span>
                ))}
                <button className="btn-purple" onClick={() => handleCompleteFrequency(habit.id)}>
                Complete Frequency
                </button>
                {completedFrequencies[habit.id] === habit.frequency_amount && (
                <p>Well done! Habit completed.</p>
                )}
              </a>
            </div>
        ))}
      </ul>
      )}
      {selectedHabit && (
      <EditHabitModal
        isOpen={editModalOpen}
        onRequestClose={() => {
          setEditModalOpen(false);
          setSelectedHabit(null);
        }}
        habit={selectedHabit}
        onUpdateHabit={handleUpdateHabit}
        onDeleteHabit={handleDeleteHabit}
      />
    )}
        {/* Add Habit Button */}
      <button className='btn mx-2' onClick={handleOpenModal}>
          Add Habit
      </button> 
       <AddHabitModal
       isOpen={isModalOpen}
       onRequestClose={handleCloseModal}
       onAddHabit={handleAddHabit}
      />
      </div>
  );
};
export default HabitPage;

