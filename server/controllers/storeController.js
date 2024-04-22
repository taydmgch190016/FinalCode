const Store = require("../models/Store");

// Controller để lấy danh sách cửa hàng từ cơ sở dữ liệu
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
