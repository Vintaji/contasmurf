const mongoose = require("../database/index.js");

// Definição do modelo do usuário
const StockPBESchema = new mongoose.Schema({
  login: {
    type: String,
  },
  senha: {
    type: String,
  },
  ea: {
    type: Number,
  },
  nivel: {
    type: Number,
  },
  skins: {
    type: String,
  },
  servidor: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StockPBE = mongoose.model("StockPBE", StockPBESchema);

module.exports = StockPBE;
