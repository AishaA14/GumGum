import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './components/AboutPage/AboutPage';
import GoalsPage from './components/Goals/GoalsPage/GoalsPage';
import SignupPage from './components/Authentication/SignUpPage/SignUpPage';
import LoginPage from './components/Authentication/LoginPage/LoginPage';
import LogoutPage from './components/Authentication/LogoutPage/LogoutPage';
import EditGoalPage from './components/Goals/EditGoalPage/EditGoalPage';
import HabitPage from './components/Habits/HabitPage/HabitPage';
import TaskPage from './components/Tasks/TaskPage/TaskPage'
import EditTaskPage from './components/Tasks/EditTaskPage/EditTaskPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/edit_goal/:id" element={<EditGoalPage />} />
        <Route path="/habits/:goalId" element={<HabitPage/>} />
        <Route path="/tasks" element={<TaskPage/>} />
        <Route path="/edit_task/:id" element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
