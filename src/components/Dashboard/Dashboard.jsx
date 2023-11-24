import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTasks, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { Bar } from 'react-chartjs-2';

export default function Dashboard({user}) {
  const [randomQuote, setRandomQuote] = useState(null);
  // const [completedHabitsData, setCompletedHabitsData] = useState({});
  // const [goals, setGoals] = useState([]);
  
 

  
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const checkAuthentication = async () => {
      try {
        await axios.get(`${backendUrl}/home/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
        });
        // setMessage(data.message);
      } catch (e) {
        console.log("not auth");
        // Redirect to the login page if not authenticated
        window.location.href = "/login";
      }
    };

    // Check authentication status
    if (localStorage.getItem("access_token") === null) {
      // Redirect to the login page if not authenticated
      window.location.href = "/login";
    } else {
      checkAuthentication();
    }

    const fetchRandomQuote = async () => {
      try {
        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }

        const data = await response.json();

        // Select a random quote from the fetched quotes array
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuote = data[randomIndex];

        // Process the author's name to remove ', type.fit'
        const processedAuthor = selectedQuote.author.split(',')[0].trim();

        // Update the quote with the processed author
        setRandomQuote({
          text: selectedQuote.text,
          author: processedAuthor,
        });
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    fetchRandomQuote();

  //  // Fetch goals along with associated habits
  //  const fetchGoalsAndHabits = async () => {
  //   try {
  //     const response = await axios.get(`${backendUrl}/goal/`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Set goals along with their associated habits
  //     setGoals(response.data);
  //   } catch (error) {
  //     console.error('Error fetching goals:', error);
  //   }
  // };

  // fetchGoalsAndHabits();
}, []);

  // useEffect(() => {
  //   // Fetch and update completed habits data here
  //   const fetchCompletedHabits = async () => {
  //     try {
  //       // Fetch completed habits data from your backend
  //       const response = await axios.get(`${backendUrl}/completed_habits/`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  //         },
  //       });

  //       const completedHabitsData = response.data.reduce((acc, habit) => {
  //         acc[habit.habit] = {
  //           count: habit.count,
  //         };
  //         return acc;
  //       }, {});

  //       setCompletedHabitsData(completedHabitsData);

  //     } catch (error) {
  //       console.error('Error fetching completed habits:', error);
  //     }
  //   };

  //   fetchCompletedHabits();
  // }, []); // This effect runs only once on component mount

//  // Prepare data for the chart
//  const data = {
//   labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
//   datasets: goals.flatMap((goal) =>
//     goal.habits.map((habit) => ({
//       label: habit.name,
//       backgroundColor: 'rgba(75,192,192,0.2)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(75,192,192,0.4)',
//       data: Array.from({ length: 7 }, (_, index) =>
//         completedHabitsData[habit.id]?.count || 0
//       ),
//     }))
//   ),
// };
// const fetchGoals = async () => {
//   try {
//     const response = await fetch(`${backendUrl}/goal`, {
//       method: 'GET',
//       headers: new Headers({ 
//         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     setGoals(data);
//   } catch (error) {
//     console.error('Error fetching goals:', error);
//   }
// };
// useEffect(() => {
//   fetchGoals();
// }, []);

// const getChartData = () => {
//   const goalNames = goals.map(goal => goal.name);
//   const progressData = goals.map(goal => (goal.completed ? 100 : 0));

//   return {
//     labels: goalNames,
//     datasets: [
//       {
//         label: 'Progress',
//         data: progressData,
//         backgroundColor: goals.map(goal => (goal.completed ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)')),
//         borderColor: goals.map(goal => (goal.completed ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)')),
//         borderWidth: 1,
//       },
//     ],
//   };
// };
  return (
   
<div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {randomQuote && (
        <div className="mb-6">
          <p className="text-lg italic">"{randomQuote.text}"</p>
          <p className="text-sm">- {randomQuote.author}</p>
        </div>
      )}
       <div className="flex items-center justify-between mb-8">
        <p className="text-lg">Ready to tackle some tasks?</p>
        <Link to="/tasks">
          <button className="bg-purple text-white py-2 px-6 rounded-full transition duration-300 hover:bg-pink">
            Get Started <FaTasks className="inline ml-2" />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-lg">Ready to set some goals?</p>
        <Link to="/goals">
          <button className="bg-pink text-white py-2 px-6 rounded-full transition duration-300 hover:bg-purple">
            Get Started <FaBullseye className="inline ml-2" />
          </button>
        </Link>
      </div>
  
     <div>
      {/* <h1>Goal Progress Dashboard</h1>
      <Bar data={getChartData()} /> */}
     </div>
      <div>
      {/* <h3>Habit Completion Chart</h3>
      <Bar data={data} /> */}

      </div>
    </div>
  );
};
