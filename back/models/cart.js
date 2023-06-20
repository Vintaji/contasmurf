const mongoose = require("../database/index.js");

// Definição do modelo do usuário
const CartSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
