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
  const { goalId } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${backendUrl}/habits/${goalId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
    
          if (response.ok) {
            // Update the habit list with the updated habit
            setHabits((prevHabits) =>
              prevHabits.map((habit) =>
                habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
              )
            );
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
    
          if (response.ok) {
            // Remove the deleted habit from the habit list
            setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
          } else {
            console.error('Failed to delete habit:', response);
          }
        } catch (error) {
          console.error('Error deleting habit:', error);
        }
      };
  

  return (
    <div>
      <h2>Habits for Goal {goalId}</h2>
      {habits.length === 0 ? (
      <p>No habits found for this goal.</p>
      ) : (
      <ul>
        {habits.map((habit) => (
            <div key={habit.id}>
                <h2>{habit.name}</h2>
                <p>{habit.description}</p>
                <p>Frequency: {habit.frequency_amount} {habit.frequency_unit}</p>
                <button className="btn" onClick={() => handleEditHabit(habit)}>Edit</button>
                <button className="btn" onClick={() => handleDeleteHabit(habit.id)}>Delete</button>
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

