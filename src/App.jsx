import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './components/AboutPage/AboutPage';
import GoalsPage from './components/GoalsPage/GoalsPage';
import SignupPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LogoutPage/LogoutPage';
import EditGoalPage from './components/EditGoalPage/EditGoalPage';
import HabitPage from './components/HabitPage/HabitPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/edit_goal/:id" element={<EditGoalPage />} />
        <Route path="/habits/:goalId" element={<HabitPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
