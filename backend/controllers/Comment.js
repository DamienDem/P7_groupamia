const express = require("express");
const { Post, Comment, User } = require("../db/sequelize");
const fs = require("fs");
const jwt = require("jsonwebtoken");


exports.createComment = (req, res) => {
  let postId = req.params.postId;
  let content = req.body.content;
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;

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
        post.update({comments: post.comments +1})
        
        Comment.create({
          userId: userId,
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
      });
    })
    .catch((err) => {
      const message = "Erreur serveur, veuillez réessayer dans un instant";
      res.status(500).json({ message, err });
    });
};

exports.updateComment = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas .";
        return res.status(404).json({ message });
      } else {
        Comment.findByPk(req.params.id)
          .then((comment) => {
            if (!comment) {
              const message = `La publication demandé n'existe pas .`;
              return res.status(404).json({ message });
            }
             else 
              Comment.update(req.body, {
                where: { id: req.params.id },
              });
              const message = `La publication a bien été modifié.`;
              res.json({ message, data: req.body });
          })
          .catch((error) => {
            const message = `La publication n'a pas pu être modifié. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
          });
      }
    })
    .catch((err) => {
      const message = "Utilisateur inexistant";
      res.status(400).json({ message, err });
    });
};

exports.deleteComment = (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;
  const isAdmin =decodedToken.isAdmin

  User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur est introuvable`;
        return res.status(400).json({ message });
      }
      Comment.findByPk(req.params.id).then((comment) => {
        if (!comment) {
          const message = `Le commentaire demandé n'existe pas`;
          return res.status(400).json({ message });
        } 
        Post.findOne({
          where: {id: comment.postId}
        })
        .then((post) => {
          if (post){
            post.update({comments: post.comments -1})
          }
        })
          if (userId == comment.userId || isAdmin) {
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
    })
    .catch((error) => {
      const message = `Le commentaire n'a pas pu être récupéré. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
})
};

exports.getAllComments = (req, res) => {
  Comment.findAll()
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
  Comment.findOne({
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
