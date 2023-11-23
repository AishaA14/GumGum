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
  }, [goalId, backendUrl]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddHabit = async (newHabit) => {
    try {
      const response = await axios.post(
        `${backendUrl}/habits/goal/${goalId}/`,
        newHabit,
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

      setCompletedFrequencies((prevCompletedFrequencies) => ({
        ...prevCompletedFrequencies,
        [response.data.id]: 0,
      }));
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleEditHabit = (habit) => {
    setSelectedHabit(habit);
    setEditModalOpen(true);
  };

  const handleUpdateHabit = async (updatedHabit) => {
    try {
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
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
          )
        );

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
        setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
      } else {
        console.error('Failed to delete habit:', response);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleCompleteFrequency = async (habitId) => {
    try {
      const updatedHabits = await Promise.all(
        habits.map(async (habit) => {
          if (habit.id === habitId) {
            const completedFrequency = completedFrequencies[habitId] + 1;
  
            if (completedFrequency >= habit.frequency_amount) {
              try {
                // Check the repeat_option and reset is_completed accordingly
                if (habit.repeat_option === 'daily' || habit.repeat_option === 'weekly' || habit.repeat_option === 'monthly') {
                  await axios.patch(
                    `${backendUrl}/habits/${habitId}/`,
                    { is_completed: false },  // Reset is_completed to false
                    {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                      },
                    }
                  );
  
                  setCompletedFrequencies((prevCompletedFrequencies) => ({
                    ...prevCompletedFrequencies,
                    [habitId]: 0,  // Reset completed frequency
                  }));
  
                  return { ...habit, is_completed: false };
                } else {
                  // Handle custom repeat logic if needed
                }
              } catch (error) {
                console.error('Error completing frequency:', error);
                return habit;
              }
            } else {
              setCompletedFrequencies((prevCompletedFrequencies) => ({
                ...prevCompletedFrequencies,
                [habitId]: completedFrequency,
              }));
              return habit;
            }
          } else {
            return habit;
          }
        })
      );
  
      setHabits(updatedHabits);
    } catch (error) {
      console.error('Error completing frequency:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Habits to achieve your goal</h2>
      {habits.length === 0 ? (
        <p>No habits found for this goal.</p>
      ) : (
        <ul>
          {habits
          .filter((habit) => !habit.is_completed)
          .map((habit) => (
            <div key={habit.id}>
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {habit.name}
                </h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{habit.description}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Frequency: {habit.frequency_amount} {habit.frequency_unit}
                </p>
                <div className="mb-2 text-base font-medium text-purple-700 dark:text-purple-500">
                  Progress
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500"
                    style={{ width: `${(completedFrequencies[habit.id] / habit.frequency_amount) * 100}%` }}
                  ></div>
                </div>
                {completedFrequencies[habit.id] === habit.frequency_amount && (
                  <p className="mt-2 text-green-500 dark:text-green-400">
                    Well done! Frequency completed.
                  </p>
                )}
                <button
                  className="bg-blue1 btn-teal"
                  onClick={() => handleEditHabit(habit)}
                >
                  Edit
                </button>
                <button
                  className="bg-light-purple btn-pink"
                  onClick={() => handleDeleteHabit(habit.id)}
                >
                  Delete
                </button>
                <button
                  className="btn-purple"
                  onClick={() => handleCompleteFrequency(habit.id)}
                >
                  Complete Frequency
                </button>
              </div>
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
