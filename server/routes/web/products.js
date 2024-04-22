const express = require("express");
const router = express.Router();
const uploadImages = require("../../middleware/uploadImages");
const { addProduct } = require("./../../controllers/web/products");
const authMiddleware = require("../../middleware/authMiddleware");
const checkEmployee = require("../../middleware/web/checkEmployee");

// Route để xử lý yêu cầu thêm sản phẩm, sử dụng Multer
router.post(
  "/addProduct",
  authMiddleware,
  checkEmployee,
  uploadImages.single("image"),
  addProduct
);

module.exports = router;
