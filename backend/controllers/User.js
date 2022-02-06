const express = require("express");
const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.signup = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          let newUser = User.create({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hash,
            picture: `http://localhost:3000/images/default_profil_picture`,
            isAdmin: false,
          });
        })
        .then((newUser) => {
          const message = `L'utilisateur ${req.body.name} ${req.body.firstName} a bien été créé .`;
          res.json({ message, data: newUser });
        })
        .catch((err) => {
          const message = `impossible de créer l'utilisateur:"${req.body.name} ${req.body.firstName}" `;
          res.status(400).json({ message, err });
        });
    } else {
      const message = `L'utilisateur avec l'email:"${req.body.email}" existe déja. `;
      return res.status(400).json({ message });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      const message = `L'utilisateur demandé n'existe pas.`;
      return res.status(404).json({ message });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          const message = "Mot de passe est incorrect ! ";
          return res.status(401).json({ message });
        }
        const token = jwt.sign({ userId: user.id }, `Mon_token_secret`, {
          expiresIn: "24h",
        });
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token });
      })
      .catch((err) => {
        const message = `Impossible de se connecter, veuillez réessayer ultérieurement. `;
        res.status(500).json({ message, err });
      });
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      const message = `la liste des utilisateurs a bien été récupérée . `;
      res.json({ message, data: users });
    })
    .catch((err) => {
      const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: err });
    });
};

exports.getOneUser = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    if (user === null) {
      const message = `L'utilisateur n'existe pas `;
      return res.status(400).json({ message });
    }
    const message = `L'utilisateur a bien été trouvé `;
    res.json({ message, data: user });
  });
};

exports.updateProfil = (req, res) => {
  const userObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  User.findByPk(req.params.id).then((user) => {
    if (!user) {
      const message = "L'utilisateur demandé n'existe pas .";
      return res.status(404).json({ message });
    } else {
      const filename = user.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        user
          .update(userObject, {
            where: { id: req.params.id },
          })
          .catch((err) => {
            const message = `Impossible de modifier le profil, veuillez réessayer ultérieurement. `;
            res.status(500).json({ message, err });
          });
      });
      const message = `L'utilisateur ${user.name} ${user.firstName} a bien été modifié`;
      res.json({ message, data: userObject });
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    const filename = user.picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      User.destroy({ where: { id: user.id } })
        .then((_) => {
          const message = `L'utilisateur ${user.name} ${user.firstName} a bien été supprimé .`;
          res.json({ message, data: user });
        })
        .catch((err) => {
          const message = `Impossible de supprimer le profil, veuillez réessayer ultérieurement. `;
          res.status(500).json({ message, err });
        });
    });
  });
};
