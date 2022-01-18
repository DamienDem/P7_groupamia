const express = require('express');
const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');

exports.signup = (req,res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let newUser = User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        description: req.body.description,
        picture: req.body.picture,
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
    const message = `L'utilisateur a été connecté avec succès`;
    return res.json({ message, data: user })
  })
};

exports.deleteUser = (req,res) => {
  User.findByPk(req.params.id)
  .then(user => {
    User.destroy({ where: {id:user.id} })
    const message = `L'utilisateur ${user.userName} a bien été supprimé .`
    res.json({message, data: user})
  })

};