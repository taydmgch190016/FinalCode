const express = require("express");
const router = express.Router();
const order = require("../../controllers/mobile/orderController");

router.post("/create", order.createOrder);
router.get("/orderByUserId", order.getOrders);
router.get("/:id", order.orderDetail);
module.exports = router;