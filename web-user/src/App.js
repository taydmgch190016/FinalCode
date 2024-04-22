// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import AdminDashboard from "./components/admin/dashboard";
import EmployeeDashboard from "./components/employee/dashboard";
import AddProduct from "./components/employee/addProduct";
import AddCategory from "./components/employee/addCategory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/add-product" element={<AddProduct />} />
        <Route path="/employee/add-category" element={<AddCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
