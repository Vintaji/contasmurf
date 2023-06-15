const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB Atlas:", error);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
