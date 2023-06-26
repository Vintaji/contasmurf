const mongoose = require("../database/index.js");

// Definição do modelo do usuário
const StockEloSchema = new mongoose.Schema({
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
  elo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StockElo = mongoose.model("StockElo", StockEloSchema);

module.exports = StockElo;
