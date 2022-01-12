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
    

app.get('/', (req,res) => res.send('Hello express !'))

app.use(express.json())
module.exports = app;