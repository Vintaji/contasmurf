const jwt = require("jsonwebtoken");
const chaveSecreta = process.env.TOKEN_JWT;
// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  jwt.verify(token, chaveSecreta, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    req.username = decoded; // Dados do usuário decodificados do token
    next();
  });
}

module.exports = verifyToken;
