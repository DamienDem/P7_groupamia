const express = require("express");
const { Post, Comment, User } = require("../db/sequelize");

exports.createComment = (req, res) => {
  let postId = req.params.postId;
  let content = req.body.content;
  let userId = req.body.userId;

  if (userId) {
    User.findOne({
      where: { id: userId },
    }).then((user) => {
      if (user) {
        Post.findOne({
          where: { id: postId },
        }).then((post) => {
          if (post) {
            Comment.create({
              userId: userId,
              userName: user.userName,
              postId: post.id,
              content: content,
            })
              .then((comment) => {
                const message = `L'utilisateur avec l'id: ${userId} a ajouté un commentaire `;
                res.json({ message, data: comment });
              })
              .catch((err) => {
                const message = `Impossible d'ajouter le commentaire .`;
                res.status(400).json({ message, err });
              });
          } else {
            const message = `La publication n'existe pas .`;
            return res.status(404).json({ message });
          }
        });
      }
    });
  }
};

/*exports.updateComment = (req, res) => {
  const commentId = req.params.id;
  Comment.findOne(commentId)
    .then((comment) => {
      if (comment === null) {
        const message = `La publication demandé n'existe pas .`;
        return res.status(404).json({ message });
      }
    })
    .then((comment) => {
      Comment.update(req.body, {
        where: { id: 1 },
      });
      const message = `La publication :"${commentId}" a bien été modifié.`;
      res.json({ message, data: comment });
    })
    .catch((error) => {
      const message = `La publication n'a pas pu être modifié. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};*/

exports.updateComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        const message = `La publication demandé n'existe pas .`;
        return res.status(404).json({ message });
      }
    })
    .then((comment) => {
      Comment.update(req.body, {
        where: { id: req.params.id },
      });
      const message = `La publication a bien été modifié.`;
      res.json({ message, data: comment });
    })
    .catch((error) => {
      const message = `La publication n'a pas pu être modifié. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};
