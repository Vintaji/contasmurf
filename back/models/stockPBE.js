const mongoose = require("../database/index.js");

// Definição do modelo do usuário
const StockPbeSchema = new mongoose.Schema({
  login: {
    type: String,
  },
  senha: {
    type: String,
  },
  servidor: {
    type: String,
  },
});

const StockPbe = mongoose.model("StockPbe", StockPbeSchema);

module.exports = StockPbe;
