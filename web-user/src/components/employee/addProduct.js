import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/listCategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("categoryId", selectedCategory._id);

    try {
      const token = localStorage.getItem("token"); // Lấy token từ local storage
      const response = await axios.post(
        "http://localhost:5000/api/products/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Sử dụng token trong header
          },
        }
      );
      console.log("Product added successfully:", response.data);
      // Điều hướng hoặc hiển thị thông báo thành công
      message.success("Product added successfully");
      //refresh page
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
      // Xử lý lỗi và hiển thị thông báo cho người dùng
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
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
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={selectedCategory ? selectedCategory._id : ""}
            onChange={(e) =>
              setSelectedCategory(
                categories.find((category) => category._id === e.target.value)
              )
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
