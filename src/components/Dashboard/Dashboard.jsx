import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTasks, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Dashboard({user}) {
  const [randomQuote, setRandomQuote] = useState(null);

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
}, []);
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
    </div>
  );
};
