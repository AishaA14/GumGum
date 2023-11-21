import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './components/AboutPage/AboutPage';
import GoalsPage from './components/GoalsPage/GoalsPage';
import SignupPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LogoutPage/LogoutPage';
import EditGoalPage from './components/EditGoalPage/EditGoalPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/edit-goal/:id" element={<EditGoalPage />} />
      </Routes>
    </div>
  );
}

export default App;
