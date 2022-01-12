const express = require('express');
const Sequelize = require('sequelize')

const app = express();

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

app.get('/', (req,res) => res.send('Hello express !'))

app.use(express.json())
module.exports = app;