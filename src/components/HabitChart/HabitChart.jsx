
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// export default function HabitChart() {
//     const [comlpletedHabits, setCompletedHabits] = useState([]);
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     const { habitId } = useParams();
//     console.log(useParams())

//     const fetchCompletedHabits = async () => {
//         try {
//           const response = await fetch(`${backendUrl}/completed_habit/habit/${habitId}/`, {
//             method: 'GET',
//             headers: new Headers({ 
//               'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//               'Content-Type': 'application/x-www-form-urlencoded',
//             }),
//           });
    
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
    
//           const data = await response.json();
//           console.log('API Response:', data); // Log the entire API response
//           setCompletedHabits(data);
//         } catch (error) {
//           console.error('Error fetching goals:', error);
//         }
//       };
    
//       useEffect(() => {
//         fetchCompletedHabits();
//       }, [fetchCompletedHabits]); // Run only once when the component mounts
// function getDays(num) {

// }
//   return (
//     <div></div>
//     // <div>
//     // <div>HabitChart</div>
//     // {completed_habit.map((completed_habit) => (
//     //           <li
//     //             key={completed_habit.id} >
//     //             <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//     //              Habit{completed_habit.habit}
//     //             </p>
                
//     // </div>
//   )
// }


