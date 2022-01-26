const express = require('express');
const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req,res) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        let newUser = User.create({
            name: req.body.name,
            firstName:req.body.firstName,
            email: req.body.email,
            password: hash,
            isAdmin: false
        })
      })
      .then((newUser) => { 
        const message = `L'utilisateur ${req.body.name} ${req.body.firstName} a bien été créé .`
        res.json({message, data: newUser})
      })
      .catch((err => {
        const message = `impossible de créer l'utilisateur:"${req.body.name} ${req.body.firstName}" `
        res.status(400).json({ message, err})
      }))
    } else {
      const message = `L'utilisateur avec l'email:"${req.body.email}" existe déja. `
      return res.status(400).json({ message})
    }
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
        { userId: user.id },
        `Mon_token_secret`,
        { expiresIn: '24h' }
      )
      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ message, data: user, token })
    })
    .catch(err => {
      const message = `Impossible de se connecter, veuillez réessayer ultérieurement. `
      res.status(500).json({message ,err})
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
    .catch(err => {
      const message = `Impossible de modifier le profil, veuillez réessayer ultérieurement. `
      res.status(500).json({message ,err})
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
  .catch(err => {
    const message = `Impossible de supprimer le profil, veuillez réessayer ultérieurement. `
    res.status(500).json({message ,err})
  })
};