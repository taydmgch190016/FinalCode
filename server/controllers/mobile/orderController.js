const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice, user, paymentMethod } =
      req.body;

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
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    const customer = await Customer.findById(user);
    let emailCustomer = customer.email;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "taydmgch190016@fpt.edu.vn",
        pass: "ycec ixbo vbwk pzlj",
      },
      tls: { rejectUnauthorized: false },
    });
    let content = "";
    content += `
                            <div style="padding: 10px; background-color: #003375">
                                <div style="padding: 10px; background-color: white;">    
                        `;
    content += '<h4 style="color: #0085ff"> New Account </h4> <hr>';
    content +=
      '<span style="color: black">Hello: ' +
      customer.username.toString() +
      "!</span><br>";
    content +=
      '<span style="color: black"> You have a new order from Minh Tay Store! ';
    ("</span><br>");
    content += "</div> </div>";
    let mainOptions = {
      from: "Final Store",
      to: emailCustomer,
      subject: "New Account ",
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

module.exports = {
  createOrder,
};
