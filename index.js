const express = require('express')
const nunjucks = require('nunjucks')

// criando servidor node
const app = express()

// primeiro parametro nome da pasta que estarão nossas views
nunjucks.configure('views', {
  autoescape: true, // para manipular o nome dos arquivos
  express: app, // passa a variavel do nosso express
  watch: true // toda vez que alterar 1 arquivo não precisa restart server
})

// informa para o express para ele saber como lidar com informações provenientes de um formulario html
app.use(express.urlencoded({ extended: true }))

// informar a extensão que será utiliza nos arquivos
app.set('view engine', 'njk')

const users = ['Douglas', 'Lari', 'Diego', 'Rodrigo']

// Rota
app.get('/', (req, res) => {
  res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

// inicia o servidor na porta 3000
app.listen(3000)
