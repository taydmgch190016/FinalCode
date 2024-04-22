const express = require("express");
const router = express.Router();
const order = require("../../controllers/mobile/orderController");

router.post("/create", order.createOrder);
module.exports = router;