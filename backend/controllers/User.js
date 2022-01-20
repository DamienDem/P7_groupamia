const express = require('express');
const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req,res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let newUser = User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        description: 'Ma description',
        picture: 'Mon Url',
        isAdmin: false
    })
  })
  .then((newUser) => { 
    const message = `L'utilisateur ${req.body.userName} a bien été créé .`
    res.json({message, data: newUser})
  })
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    if(!user) {
      const message = `L'utilisateur demandé n'existe pas.`
      return res.status(404).json({ message })
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid) {
        const message = 'Mot de passe est incorrect ! '
        return res.status(401).json({ message })
      }
      const token = jwt.sign(
        { userId: user._id },
        'TOKEN_KEY',
        { expiresIn: '24h' }
      )
      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ message, data: user, token })
    })
  })
};

exports.updateProfil = (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id }
  })
  .then(_ => {
    return User.findByPk(req.params.id).then(user => {
      if(user === null) {
        const message = "L'utilisateur demandé n'existe pas ."
        return res.status(404).json({ message })
      }
      const message = `L'utilisateur ${user.userName} a bien été modifié`
      res.json({ message, data: user})
    })  
  })
}

exports.deleteUser = (req,res) => {
  User.findByPk(req.params.id)
  .then(user => {
    User.destroy({ where: {id:user.id} })
    const message = `L'utilisateur ${user.userName} a bien été supprimé .`
    res.json({message, data: user})
  })
};