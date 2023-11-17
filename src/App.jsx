import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './components/AboutPage/AboutPage';
import GoalsPage from './components/GoalsPage/GoalsPage';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
