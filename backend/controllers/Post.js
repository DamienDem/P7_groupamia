const express = require("express");
const { Post, User, Comment, Like } = require("../db/sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.createPost = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }

      const imageURL = req.file
        ? {
            ...req.body,
            userId: req.params.id,
            attachement: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body, userId: req.params.id };

      console.log(req.params.id, imageURL);
      Post.create(imageURL).then((newPost) => {
        const message = `La publication est postée`;
        return res.json({ message, data: newPost });
      });
    })
    .catch((err) => {
      const message = `Impossible de créer la publication, veuillez réessayer ultérieurement .`;
      res.status(500).json({ message, err });
    });
};

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((posts) => {
      const message = `la liste des publications a bien été récupérée . `;
      res.json({ message, data: posts });
    })
    .catch((err) => {
      const message = `La liste des publications n'a pas pu être récupérée. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: err });
    });
};

exports.getOnePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message = `La publication demandé n'existe pas .`;
        return res.status(404).json({ message });
      }
      const message = `La publication a bien été trouvée .`;
      res.json({ message, data: post });
    })
    .catch((error) => {
      const message = `La publication n'a pas pu être récupéré. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.updatePost = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;

  const postObject = req.file
    ? {
        ...req.body,
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas .";
        return res.status(404).json({ message });
      } else {
        Post.findByPk(req.params.id).then((post) => {
          if (!post) {
            const message = `La publication demandé n'existe pas .`;
            return res.status(404).json({ message });
          }
          if (post.attachement) {
            const filename = post.attachement.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              post.update(postObject, {
                where: { id: req.params.id },
              });
              const message = `La publication :"${post.title}" a bien été modifié.`;
              res.json({ message, data: postObject });
            });
          } else {
            post.update(postObject, {
              where: { id: req.params.id },
            });
            const message = `La publication :"${post.title}" a bien été modifié.`;
            res.json({ message, data: postObject });
          }
        });
      }
    })
    .catch((err) => {
      const message = `Impossible de modifier le profil, veuillez réessayer ultérieurement. `;
      res.status(500).json({ message, err });
    });
};

exports.deletePost = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;
  const isAdmin = decodedToken.isAdmin;

  Post.findByPk(req.params.id).then((post) => {
    if (post === null) {
      const message = `La publication demandé n'existe pas .`;
      return res.status(404).json({ message });
    }
    if (post.userId === userId || isAdmin === true) {
      if (post.attachement !== null) {
        const filename = post.attachement.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Like.destroy({
            where: { postId: req.params.id },
          })
            .then(() => {
              console.log(" Le like a été supprimé ");
            })
            .catch((err) => {
              const message = "Impossible de supprimer le like";
              res.status(400).json({ message, err });
            });
          Comment.destroy({
            where: { postId: req.params.id },
          })
            .then((_) => {
              console.log("Les commentaires ont été supprimés");
            })
            .catch((err) => {
              const message = "Impossible de supprimer les messages";
              res.status(400).json({ message }, err);
            });
          Post.destroy({
            where: { id: req.params.id },
          })
            .then((_) => {
              const message = `La publication avec l'id:"${req.params.id}" a bien été supprimé.`;
              res.json({ message });
            })
            .catch((error) => {
              const message = `La publication n'a pas pu être supprimé . Réessayez dans quelques instants.`;
              res.status(500).json({ message, data: error });
            });
        });
      } else {
        Like.destroy({
          where: { postId: req.params.id },
        })
          .then(() => {
            console.log(" Le like a été supprimé ");
          })
          .catch((err) => {
            const message = "Impossible de supprimer le like";
            res.status(400).json({ message, err });
          });
        Comment.destroy({
          where: { postId: req.params.id },
        })
          .then((_) => {
            console.log("Les commentaires ont été supprimés");
          })
          .catch((err) => {
            const message = "Impossible de supprimer les messages";
            res.status(400).json({ message }, err);
          });
        Post.destroy({
          where: { id: req.params.id },
        })
          .then((_) => {
            const message = `La publication avec l'id:"${req.params.id}" a bien été supprimé.`;
            res.json({ message });
          })
          .catch((error) => {
            const message = `La publication n'a pas pu être supprimé . Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
          });
      }
    }
  });
};
