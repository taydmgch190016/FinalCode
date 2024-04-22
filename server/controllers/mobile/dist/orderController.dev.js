"use strict";

var express = require("express");

var router = express.Router();

var Order = require("../../models/Order");

var Product = require("../../models/Product");

var Customer = require("../../models/Customer");

var createOrder = function createOrder(req, res) {
  var _req$body, orderItems, shippingAddress, totalPrice, user, paymentMethod, productIds, products, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, newOrder, savedOrder, customer, emailCustomer, transporter, content, mainOptions;

  return regeneratorRuntime.async(function createOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, orderItems = _req$body.orderItems, shippingAddress = _req$body.shippingAddress, totalPrice = _req$body.totalPrice, user = _req$body.user, paymentMethod = _req$body.paymentMethod;
          productIds = orderItems.map(function (item) {
            return item.product;
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(Product.find({
            _id: {
              $in: productIds
            }
          }));

        case 5:
          products = _context2.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 9;

          _loop = function _loop() {
            var orderItem, product;
            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    orderItem = _step.value;
                    product = products.find(function (p) {
                      return p._id.toString() === orderItem.product;
                    });

                    if (!product) {
                      _context.next = 6;
                      break;
                    }

                    // Deduct the quantity of the product
                    product.quantity -= orderItem.quanlity; // Save the updated product

                    _context.next = 6;
                    return regeneratorRuntime.awrap(product.save());

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          _iterator = orderItems[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 18;
            break;
          }

          _context2.next = 15;
          return regeneratorRuntime.awrap(_loop());

        case 15:
          _iteratorNormalCompletion = true;
          _context2.next = 12;
          break;

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 24:
          _context2.prev = 24;
          _context2.prev = 25;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 27:
          _context2.prev = 27;

          if (!_didIteratorError) {
            _context2.next = 30;
            break;
          }

          throw _iteratorError;

        case 30:
          return _context2.finish(27);

        case 31:
          return _context2.finish(24);

        case 32:
          newOrder = new Order({
            orderItems: orderItems,
            shippingAddress: shippingAddress,
            totalPrice: totalPrice,
            user: user,
            paymentMethod: paymentMethod
          });
          _context2.next = 35;
          return regeneratorRuntime.awrap(newOrder.save());

        case 35:
          savedOrder = _context2.sent;
          _context2.next = 38;
          return regeneratorRuntime.awrap(Customer.findById(user));

        case 38:
          customer = _context2.sent;
          emailCustomer = customer.email;
          transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "taydmgch190016@fpt.edu.vn",
              pass: "ycec ixbo vbwk pzlj"
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          content = "";
          content += "\n                            <div style=\"padding: 10px; background-color: #003375\">\n                                <div style=\"padding: 10px; background-color: white;\">    \n                        ";
          content += '<h4 style="color: #0085ff"> New Account </h4> <hr>';
          content += '<span style="color: black">Hello: ' + customer.username.toString() + "!</span><br>";
          content += '<span style="color: black"> You have a new order from Minh Tay Store! ';
          "</span><br>";
          content += "</div> </div>";
          mainOptions = {
            from: "Final Store",
            to: emailCustomer,
            subject: "New Account ",
            text: "abc",
            html: content
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) console.error("Error: ", err);else console.log("Message sent: ", info.response);
          });
          res.status(201).json(savedOrder);
          _context2.next = 57;
          break;

        case 53:
          _context2.prev = 53;
          _context2.t1 = _context2["catch"](0);
          console.error("Error creating order:", _context2.t1.message);
          res.status(500).json({
            error: "Server error"
          });

        case 57:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 53], [9, 20, 24, 32], [25,, 27, 31]]);
};

module.exports = {
  createOrder: createOrder
};