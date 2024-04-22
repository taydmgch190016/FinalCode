import React from "react";
import { Link } from "react-router-dom";
const EmployeeDashboard = ({ storeId }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/employee/add-product">Add a product</Link>
          </li>
          <li>
            <Link to="/employee/add-category">Add a category</Link>
          </li>
          <li>
            <Link to="/employee/profile">Profile</Link>
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

export default EmployeeDashboard;
