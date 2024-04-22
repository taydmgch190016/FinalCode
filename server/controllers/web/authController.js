const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const Admin = require("../../models/Admin");

exports.webLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm kiếm người dùng trong bảng Employee
    let user = await Employee.findOne({ email });
    let role = "employee"; // Mặc định là employee

    // Nếu không tìm thấy người dùng trong bảng Employee, thì tìm kiếm trong bảng Admin
    if (!user) {
      user = await Admin.findOne({ email });
      role = "admin"; // Nếu là admin
    }

    if (!user) {
      // Không tìm thấy người dùng
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Sai mật khẩu
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, id: user._id, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng ký tài khoản nhân viên mới
exports.registerEmployee = async (req, res) => {
  const { email, password, storeId } = req.body;

  try {
    // Kiểm tra xem email đã được sử dụng chưa
    let existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản nhân viên mới
    const newEmployee = new Employee({
      email,
      password: hashedPassword,
      storeId,
    });
    await newEmployee.save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng xuất
exports.logout = async (req, res) => {
  // Xóa thông tin đăng nhập khỏi local storage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");

  res.json({ message: "Đăng xuất thành công" });
};
