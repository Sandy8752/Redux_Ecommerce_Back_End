const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
  },
  userid: {
    type: mongoose.Types.ObjectId,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", cartSchema);