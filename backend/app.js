const express = require('express');
const morgan = require('morgan');
const res = require('express/lib/response');
const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./models/user');
const user = require('./models/user');

const app = express();

app
.use(express.json())
.use(morgan('dev'));

const sequelize = new Sequelize('groupamia', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
 
sequelize.authenticate()
.then(_=>console.log('La connexion à la BDD a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la BDD ${error}`))

const User = UserModel(sequelize, DataTypes)

sequelize.sync({force:true})
.then(_=> console.log('la BDD a bien été synchronisée'))


app.post('/signup', (req,res) => {
  User.create(req.body)
  .then(user => {
    const message = `L'utilisateur ${req.body.userName} a bien été créé .`
    res.json({message, data: user})
  })
})

app.post('/login', (req, res) => {

  User.findOne({ where: { email: req.body.email } }).then(user => {
    if(!user) {
      const message = `L'utilisateur demandé n'existe pas.`
      return res.status(404).json({ message })
    }
    const message = `L'utilisateur a été connecté avec succès`;
    return res.json({ message, data: user })
  })
})

app.get('/', (req,res) => res.send('Hello express !'))



module.exports = app;