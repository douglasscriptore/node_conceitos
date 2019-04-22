const express = require("express");

/* criando servidor node */
const app = express();

/* Um middleware é um interceptador que pdoe bloquear a requisição para um processamento e liberar ela em seguida pelo metodo next */
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host}`,
    `URL: ${req.url}`,
    `METHOD: ${req.method}`
  );

  // adicionar informações dentro da requisição para utilizar nas demais rotas
  req.appName = 'GoNode';

  return next()
};

// faz com que todas as rotas utilziem o middleware
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send(`Bem vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/nome/:name", (req, res) => {
  res.json({
    message: `Hi, ${req.params.name}`
  });
});

// inicia o servidor na porta 3000
app.listen(3000);
