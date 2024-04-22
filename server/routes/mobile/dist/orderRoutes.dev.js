"use strict";

var express = require("express");

var router = express.Router();

var order = require("../../controllers/mobile/orderController");

router.post("/create", order.createOrder);
module.exports = router;