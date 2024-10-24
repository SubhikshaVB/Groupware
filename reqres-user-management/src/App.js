import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;