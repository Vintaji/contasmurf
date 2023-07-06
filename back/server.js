const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sgMail = require("@sendgrid/mail");
app.use(cors());
app.use(bodyParser.json());

// Dados sensiveis
require("dotenv").config();
const chaveSecreta = process.env.TOKEN_JWT;
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Middlewares
const verifyToken = require("./middlewares/verifyToken");

// Models
const User = require("./models/user");
const Cart = require("./models/cart");
const Stock = require("./models/stock");
const StockElo = require("./models/stockElo");
const StockPBE = require("./models/stockPBE");

// Rota de registro de Estoque
app.post("/api/stock", verifyToken, async (req, res) => {
  const { login, senha, ea, skins, nivel, servidor } = req.body;
  // Verificar se o conta já existe no banco de dados
  const existingStock = await Stock.findOne({
    $or: [{ login }],
  });
  if (existingStock) {
    return res.status(400).json({ message: "Estoque já registrado" });
  }
  // Criar a nova conta no banco de dados
  const newStock = new Stock({ login, senha, ea, skins, nivel, servidor });
  await newStock.save();

  res.json({ message: "Estoque adicionado com sucesso" });
});

// Rota de exclusão de Estoque
app.delete("/api/stock", verifyToken, async (req, res) => {
  const stockId = req.query.stockId;

  try {
    // Verificar se o estoque existe no banco de dados
    const existingStock = await Stock.findById(stockId);
    if (!existingStock) {
      return res.status(404).json({ message: "Estoque não encontrado" });
    }

    // Remover o estoque do banco de dados
    await Stock.findByIdAndDelete(stockId);

    res.json({ message: "Estoque removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover o estoque" });
  }
});

// Rota de autenticação de usuário
app.get("/api/stock", verifyToken, async (req, res) => {
  const listStock = await Stock.find();
  res.send(listStock);
});

app.post("/api/stockPBE", verifyToken, async (req, res) => {
  const { servidor, login, senha } = req.body;
  // Verificar se o conta já existe no banco de dados
  const existingStockPBE = await StockPBE.findOne({
    $or: [{ login }],
  });
  if (existingStockPBE) {
    return res.status(400).json({ message: "Estoque já registrado" });
  }
  // Criar a nova conta no banco de dados
  const newStockPBE = new StockPBE({
    servidor,
    login,
    senha,
  });
  await newStockPBE.save();

  res.json({ message: "Estoque adicionado com sucesso" });
});

// Rota de exclusão de Estoque
app.delete("/api/stockPBE", verifyToken, async (req, res) => {
  const stockId = req.query.stockId;

  try {
    // Verificar se o estoque existe no banco de dados
    const existingStockPBE = await StockPBE.findById(stockId);
    if (!existingStockPBE) {
      return res.status(404).json({ message: "Estoque não encontrado" });
    }

    // Remover o estoque do banco de dados
    await StockPBE.findByIdAndDelete(stockId);

    res.json({ message: "Estoque removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover o estoque" });
  }
});

// Rota de autenticação de usuário
app.get("/api/stockPBE", verifyToken, async (req, res) => {
  const listStockPBE = await StockPBE.find();
  res.send(listStockPBE);
});

app.post("/api/stockElo", verifyToken, async (req, res) => {
  const {
    login,
    senha,
    ea,
    skins,
    nivel,
    servidor,
    elo,
    divisao,
    imagem,
    preco,
  } = req.body;
  // Verificar se o conta já existe no banco de dados
  const existingStockElo = await StockElo.findOne({
    $or: [{ login }],
  });
  if (existingStockElo) {
    return res.status(400).json({ message: "Estoque já registrado" });
  }
  // Criar a nova conta no banco de dados
  const newStockElo = new StockElo({
    login,
    senha,
    ea,
    skins,
    nivel,
    servidor,
    elo,
    divisao,
    imagem,
    preco,
  });
  await newStockElo.save();

  res.json({ message: "Estoque adicionado com sucesso" });
});

app.delete("/api/stockElo", verifyToken, async (req, res) => {
  const stockId = req.query.stockId;

  try {
    // Verificar se o estoque existe no banco de dados
    const existingStockElo = await StockElo.findById(stockId);
    if (!existingStockElo) {
      return res.status(404).json({ message: "Estoque Elo não encontrado" });
    }

    // Remover o estoque do banco de dados
    await StockElo.findByIdAndDelete(stockId);

    res.json({ message: "Estoque Elo removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover o estoque Elo" });
  }
});

// Rota de autenticação de usuário
app.get("/api/stockElo", verifyToken, async (req, res) => {
  const listStockElo = await StockElo.find();
  res.send(listStockElo);
});

// Rota de registro de usuário
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar se o usuário já existe no banco de dados
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ message: "E-mail ou usuario já registrado" });
  }

  // Criptografar a senha antes de salvar no banco de dados
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o novo usuário no banco de dados
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  res.json({ message: "Usuário registrado com sucesso" });
});

// Rota de autenticação de usuário
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Verificar as credenciais do usuário

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  // Função para gerar o token JWT
  function generateToken(user) {
    return jwt.sign({ userId: user._id }, chaveSecreta, {
      expiresIn: "24h",
    });
  }

  res.json({ userId: user._id, token: generateToken(user) });
});

// Rota de listagem de usuários
app.get("/api/accounts", verifyToken, async (req, res) => {
  const listAcoounts = await User.find();
  res.send(listAcoounts);
});

app.post("/api/recuperarnome", verifyToken, (req, res) => {
  const { to, from, subject, text } = req.body;

  // Crie o objeto de e-mail
  const email = {
    to,
    from,
    subject,
    text,
  };

  // Envie o e-mail
  sgMail
    .send(email)
    .then(() => {
      console.log("E-mail enviado com sucesso");
      res.status(200).json({ message: "E-mail enviado com sucesso" });
    })
    .catch((error) => {
      console.error("Erro ao enviar o e-mail", error);
      res.status(500).json({ error: "Erro ao enviar o e-mail" });
    });
});

app.post("/api/recuperarsenha", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, chaveSecreta, { expiresIn: "1h" });

  if (!email) {
    return res.status(400).json({ error: "Endereço de e-mail não fornecido" });
  }

  const mailOptions = {
    from: "recuperar@contasmurf.com",
    to: email,
    subject: "Conta Smurf - Recuperação de senha",
    text: `Olá, você solicitou a recuperação de senha do e-mail ${email}.\n\nClique no link abaixo para redefinir sua senha:\n\nRedefinir senha`,
    html: `<p>Olá, você solicitou a recuperação de senha do e-mail <b>${email}</b>.</p><p>Clique no link abaixo para redefinir sua senha:</p><p><a href="http://localhost:4200/redefinirsenha?token=${token}">Redefinir senha</a></p>`,
  };

  // Envie o e-mail
  sgMail
    .send(mailOptions)
    .then(() => {
      console.log("E-mail enviado com sucesso");
      res.status(200).json({ token, message: "E-mail enviado com sucesso" });
    })
    .catch((error) => {
      console.error("Erro ao enviar o e-mail", error);
      res.status(500).json({ error: "Erro ao enviar o e-mail" });
    });
});

app.post("/api/redefinirsenha", (req, res) => {
  const { token, novaSenha, email } = req.body;

  // Verificar a validade do token
  try {
    jwt.verify(token, chaveSecreta);
    // O token é válido
    // Prossiga com o restante do código

    // Encontre o usuário correspondente no banco de dados usando o token
    User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Token inválido ou expirado" });
        }

        // Atualizar a senha do usuário
        user.password = novaSenha;

        // Limpar os campos de redefinição de senha do usuário
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        // Salvar as alterações no banco de dados
        return user
          .save()
          .then(() => {
            // Verificar se a senha foi alterada
            if (user.password === novaSenha) {
              // Envio do e-mail de confirmação de senha alterada
              const mailOptions = {
                from: "recuperar@contasmurf.com",
                to: email, // Usando o valor do e-mail fornecido no corpo da requisição
                subject: "Conta Smurf - Senha alterada",
                html: "<p>Sua senha foi alterada com sucesso.</p>",
              };

              return sgMail
                .send(mailOptions)
                .then(() => {
                  console.log("E-mail enviado com sucesso");
                  return res
                    .status(200)
                    .json({ message: "Senha alterada com sucesso." });
                })
                .catch((error) => {
                  console.error("Erro ao enviar o e-mail", error);
                  return res.status(500).json({
                    error:
                      "A senha foi alterada, mas ocorreu um erro ao enviar o e-mail",
                  });
                });
            } else {
              // A senha não foi alterada com sucesso
              return res
                .status(500)
                .json({ error: "A senha não foi alterada" });
            }
          })
          .catch((error) => {
            console.error(
              "Erro ao salvar as alterações no banco de dados",
              error
            );
            return res.status(500).json({
              error: "Erro ao salvar as alterações no banco de dados",
            });
          });
      })
      .catch((error) => {
        console.error("Erro ao encontrar o usuário no banco de dados", error);
        return res
          .status(500)
          .json({ error: "Erro ao encontrar o usuário no banco de dados" });
      });
  } catch (error) {
    // O token é inválido ou expirou
    console.error("Token inválido ou expirado", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

// Rota para adicionar um item ao carrinho
app.post("/api/cart", verifyToken, async (req, res) => {
  const { userId, quantity, price, name } = req.body;

  try {
    const cartItem = new Cart({
      userId: userId,
      price: price,
      name: name,
      quantity: quantity,
    });

    await cartItem.save();

    const itemId = cartItem._id; // Obtém o _id gerado pelo MongoDB

    const response = {
      itemId: itemId,
      ...cartItem.toObject(),
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao adicionar o item ao carrinho" });
  }
});

app.get("/api/cart", verifyToken, async (req, res) => {
  const userId = req.query.userId;

  try {
    const cart = await Cart.find({ userId: userId });
    if (!cart || cart.length === 0) {
      res
        .status(404)
        .json({ message: "O carrinho não foi encontrado para esse userId" });
      return;
    }

    res.status(200).json(cart); // Retorna todos os objetos do carrinho para o userId fornecido
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao obter o carrinho" });
  }
});

app.delete("/api/cart", verifyToken, async (req, res) => {
  const userId = req.query.userId;
  const itemId = req.query.itemId;

  try {
    const result = await Cart.deleteOne({ userId: userId, _id: itemId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Esse itemId não foi encontrado" });
      return;
    }
    res.status(200).json({ message: "Item removido do carrinho com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao remover o item do carrinho" });
  }
});

app.put("/api/cart", verifyToken, async (req, res) => {
  const itemId = req.query.itemId;
  const userId = req.query.userId;
  const { quantity, price, name } = req.body;

  try {
    const updatedCartItem = await Cart.findOneAndUpdate(
      { _id: itemId, userId: userId },
      { quantity: quantity, price: price, name: name },
      { new: true }
    );

    if (!updatedCartItem) {
      res.status(404).json({ message: "Esse itemId não foi encontrado" });
      return;
    }

    const response = {
      itemId: updatedCartItem._id,
      ...updatedCartItem.toObject(),
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao atualizar o item do carrinho" });
  }
});

app.get("/api/cartlist", verifyToken, async (req, res) => {
  try {
    const cartList = await Cart.find();
    if (cartList.length === 0) {
      res
        .status(404)
        .json({ message: "Nenhum item no carrinho foi encontrado" });
      return;
    }
    res.send(cartList);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao obter a lista do carrinho" });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
