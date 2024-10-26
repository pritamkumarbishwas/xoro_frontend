import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import List from './Components/List';
import Add from './Components/Add';
import Edit from './Components/Edit';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/task/add" element={<Add />} />
          <Route path="/task/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
