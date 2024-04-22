import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/admin/add-employee">Add an employee</Link>
          </li>
          <li>
            <Link to="/admin/add-store">Add a store</Link>
          </li>
          <li>
            <Link to="/admin/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h2>Welcome to Admin Dashboard</h2>
        {/* Nội dung của trang admin dashboard */}
      </div>
    </div>
  );
};

export default AdminDashboard;
