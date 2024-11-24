import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/AddProduct';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/add-product"
          element={
            <PrivateRoute role="seller">
              <AddProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
