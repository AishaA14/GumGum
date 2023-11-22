// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function HabitPage({ match }) {
//   const goalId = match.params.goalId;
//   const [habits, setHabits] = useState([]);
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
//   useEffect(() => {
//     const fetchHabits = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/habit/goal/${goalId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Habits for Goal:', data);
//         setHabits(data);
//       } catch (error) {
//         console.error('Error fetching habits:', error);
//       }
//     };

//     fetchHabits();
//   }, [goalId]);

//   return (
//     <div>
//       <h1>Habits for Goal {goalId}</h1>
//       {/* Display habits here */}
//       {habits.map((habit) => (
//         <div key={habit.id}>
//           <h2>{habit.name}</h2>
//           <p>{habit.description}</p>
//           <p>Frequency: {habit.frequency_amount} {habit.frequency_unit}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default HabitPage;
