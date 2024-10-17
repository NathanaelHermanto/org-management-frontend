import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Members from './components/Members';
import AddMember from './components/AddMember';
import MemberDetail from './components/MemberDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
