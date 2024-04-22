import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Vui lòng nhập email và mật khẩu.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/webLogin`,
        { email, password }
      );
      const message = response.data.message;
      if (message === "Login successful") {
        const token = response.data.token; // Đọc token từ response
        const role = response.data.role; // Đọc vai trò của người dùng từ response
        const userId = response.data.id; // Đọc ID của người dùng từ response
        console.log(
          `Đăng nhập thành công! Vai trò của bạn là: ${role}, ID: ${userId}`
        );

        // Lưu thông tin đăng nhập vào local storage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "employee") {
          navigate("/employee/dashboard");
        }
      } else {
        alert(
          "Đăng nhập không thành công! Vui lòng kiểm tra lại email và mật khẩu."
        );
      }
    } catch (error) {
      console.error("Đăng nhập không thành công!", error);
      alert(
        "Đăng nhập không thành công! Vui lòng kiểm tra lại email và mật khẩu."
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
