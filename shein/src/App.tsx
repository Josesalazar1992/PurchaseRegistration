import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Loginpage';
import MainPage from './Components/MainPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;