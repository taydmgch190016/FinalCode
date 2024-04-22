const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/web/categories");
const authMiddleware = require("../../middleware/authMiddleware");
const checkEmployee = require("../../middleware/web/checkEmployee");

router.get("/listCategory", categoryController.getAllCategories);
router.post(
  "/addCategory",
  authMiddleware,
  checkEmployee,
  categoryController.addCategory
);

module.exports = router;
