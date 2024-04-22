import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name: name,
    };

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        "http://localhost:5000/api/categories/addCategory",
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category added successfully:", response.data);
      // Redirect or display success message
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error and display error message to the user
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
