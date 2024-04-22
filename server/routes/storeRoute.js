const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Định nghĩa route để lấy danh sách cửa hàng
router.get("/listStore", storeController.getStores);

module.exports = router;
