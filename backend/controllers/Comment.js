const express = require("express");
const { Post, Comment, User } = require("../db/sequelize");
const fs = require("fs");

exports.createComment = (req, res) => {
  let postId = req.params.postId;
  let content = req.body.content;
  let userId = req.body.userId;
  let imageURL = req.file
    ? {
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { attachement: null };

  User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur est introuvable`;
        return res.status(400).json({ message });
      }
      Post.findOne({
        where: { id: postId },
      }).then((post) => {
        if (!post) {
          const message = `La publication n'existe pas .`;
          return res.status(404).json({ message });
        }
        Comment.create({
          userId: userId,
          postId: post.id,
          imageURL,
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
      });
    })
    .catch((err) => {
      const message = "Erreur serveur, veuillez réessayer dans un instant";
      res.status(500).hson({ message, err });
    });
};

exports.updateComment = (req, res) => {
  const commentObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (!comment) {
        const message = `La publication demandé n'existe pas .`;
        return res.status(404).json({ message });
      }
    
      const filename = comment.attachement.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
      Comment.update(commentObject, {
        where: { id: req.params.id },
      });
      const message = `La publication a bien été modifié.`;
      res.json({ message, data: commentObject });
    })
  })
    .catch((error) => {
      const message = `La publication n'a pas pu être modifié. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    })

};

exports.deleteComment = (req, res) => {
  const userId = req.params.userId;
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        const message = `Le commentaire demandé n'existe pas`;
        return res.status(400).json({ message });
      }
      User.findOne({
        where: { id: userId },
      }).then((user) => {
        if (userId == comment.userId || user.isAdmin) {
          const commentDeleted = comment;
          return Comment.destroy({
            where: { id: comment.id },
          }).then((_) => {
            const message = `Le commentaire avec l'ID n°${commentDeleted.id} a bien été supprimé .`;
            res.json({ message, data: commentDeleted });
          });
        } else {
          const message = `Vous n'avez pas les droits pour supprimer ce commentaire .`;
          res.status(401).json({ message });
        }
      });
    })
    .catch((error) => {
      const message = `Le commentaire n'a pas pu être récupéré. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.getAllComments = (req, res) => {
  Comment.findAll({
    where: { postId: req.params.id },
  })
    .then((comments) => {
      const message = `la liste des commentaires a bien été récupérée . `;
      res.json({ message, data: comments });
    })
    .catch((err) => {
      const message = `La liste des commentaires n'a pas pu être récupérée. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: err });
    });
};

exports.getOneComment = (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
  }).then((comment) => {
    if (comment === null) {
      const message = `Le commentaire n'existe pas `;
      return res.status(400).json({ message });
    }
    const message = `Le commentaire a bien été trouvé `;
    res.json({ message, data: comment });
  });
};
