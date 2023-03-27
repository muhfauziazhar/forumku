import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import { URL } from './constant/Url';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreadDetail from './pages/ThreadDetail';
import Leaderboard from './pages/Leaderboard';
import ErrorPage from './pages/ErrorPage';
import ThreadInput from './pages/ThreadInput';

function App() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-5">
        <Routes>
          <Route path={URL.HOMEPAGE} element={<Homepage />} />
          <Route path={URL.LOGIN} element={<Login />} />
          <Route path={URL.REGISTER} element={<Register />} />
          <Route path={URL.THREAD_POST} element={<ThreadInput />} />
          <Route path={URL.THREAD_DETAIL} element={<ThreadDetail />} />
          <Route path={URL.LEADERBOARDS} element={<Leaderboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
