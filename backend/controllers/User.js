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
          User.create({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hash,
            picture: `http://localhost:3000/images/default_profil_picture`,
            isAdmin: false,
          });
        })
        .then((_) => {
          const message = `L'utilisateur ${req.body.name} ${req.body.firstName} a bien été créé .`;
          res.json({ message });
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
          const message = "Mot de passe ou email est incorrect ! ";
          return res.status(401).json({ message });
        }
        const token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          `Mon_token_secret`,
          {
            expiresIn: "86400000",
          }
        );
        const userData = {
          email: user.email,
          firstName: user.firstName,
          name: user.name,
          email: user.email,
          description: user.description,
          isAdmin: user.isAdmin,
          token,
        };
        const message = `L'utilisateur a été connecté avec succès`;
        res.cookie("jwt", token, { httpOnly: true, maxAge: "86400000" });
        res.json({ message, userData });
      })
      .catch((err) => {
        const message = `Impossible de se connecter, veuillez réessayer ultérieurement. `;
        res.status(500).json({ message, err });
      });
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll({
    attributes : ['name',"firstName", 'description', 'picture']
  })
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
    const userData = {
      email: user.email,
      firstName: user.firstName,
      name: user.name,
      email: user.email,
      description: user.description,
      isAdmin: user.isAdmin,
      token,
    };
    const message = `L'utilisateur ${user.name} ${user.firstName} a bien été trouvé `;
    res.json({ message, data: userData });
  });
};

exports.updateProfil = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;

  const userObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  User.findByPk(userId).then((user) => {
    if (!user) {
      const message = "L'utilisateur demandé n'existe pas .";
      return res.status(404).json({ message });
    } else {
      const filename = user.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        user
          .update(userObject, {
            where: { id: userId },
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
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;
  const adminId = decodedToken.isAdmin;

  console.log(decodedToken);
  if (userId == req.params.id || adminId == true) {
    User.findByPk(req.params.id).then((user) => {
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas .";
        return res.status(404).json({ message });
      }
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
  } else {
    const message = `Vous n'êtes pas autorisés à faire cette action`;
    res.status(401).json({ message });
  }
};
