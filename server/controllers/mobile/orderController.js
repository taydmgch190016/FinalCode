const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
const nodemailer = require("nodemailer");

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
      user,
      storeId,
      paymentMethod,
    } = req.body;

    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    for (const orderItem of orderItems) {
      const product = products.find(
        (p) => p._id.toString() === orderItem.product
      );
      if (product) {
        // Deduct the quantity of the product
        product.quantity -= orderItem.quanlity;
        // Save the updated product
        await product.save();
      }
    }

    const newOrder = new Order({
      orderItems,
      shippingAddress,
      totalPrice,
      user,
      storeId,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    const customer = await Customer.findById(user);
    let amount = newOrder.totalPrice;
    let emailCustomer = customer.email;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "testnodemailer150601@gmail.com",
        pass: "lmiu qgdk kbux hwkx",
      },
      tls: { rejectUnauthorized: false },
    });
    let content = "";
    content += `
                            <div style="padding: 10px; background-color: #003375">
                                <div style="padding: 10px; background-color: white;">    
                        `;
    content += '<h4 style="color: #0085ff"> New Order! </h4> <hr>';
    content +=
      '<span style="color: black">Hello: ' +
      customer.username.toString() +
      "!</span><br>";
    content +=
      '<span style="color: black"> You have a new order from Minh Tay Store! ';
    ("</span><br>");
    content +=
      '<span style="color: black"> Total amount: ' + amount + "$</span><br>";
    content +=
      '<span style="color: black"> Payment method: ' +
      newOrder.paymentMethod +
      ".</span><br>";
    content += "</div> </div>";
    let mainOptions = {
      from: "Final Store",
      to: emailCustomer,
      subject: "New Order! ",
      text: "abc",
      html: content,
    };

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) console.error("Error: ", err);
      else console.log("Message sent: ", info.response);
    });
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const userID = req.query.userID;
    const orders = await Order.find({ user: userID });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const orderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order detail:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  orderDetail,
  getAllOrders,
};
