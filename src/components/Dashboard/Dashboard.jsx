import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/home/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          },
        });
        setMessage(data.message);
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
  }, []);

  return (
    <div>
      <h1>Hi {message}</h1>
    </div>
  );
};

