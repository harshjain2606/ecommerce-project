import React, { useEffect, useState } from 'react';
import API from '../api/api.js';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get('/admin/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
