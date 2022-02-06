const express = require("express");
const { Post, User } = require("../db/sequelize");
const fs = require("fs");

exports.createPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageURL = req.file
  ? {
      attachement: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
  : { attachement: null };


  if (title == null || content == null) {
    const message = `Paramétre manquant . `;
    return res.status(404).json({ message });
  }
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur n'existe pas`;
        return res.status(404).json({ message });
      }
      Post.create({
        userId: req.params.id,
        title: title,
        content: content,
        imageURL,
        likes: 0,
      });
      const message = `La publication est postée`;
      return res.json({ message, data: user });
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
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  User.findByPk(req.body.UserId)
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
          const filename = post.attachement.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            post.update(postObject, {
              where: { id: req.params.id },
            });
            const message = `La publication :"${post.title}" a bien été modifié.`;
            res.json({ message, data: postObject });
          });
        });
      }
    })
    .catch((err) => {
      const message = `Impossible de modifier le profil, veuillez réessayer ultérieurement. `;
      res.status(500).json({ message, err });
    });
};

exports.deletePost = (req, res) => {
  User.findByPk(req.body.userId)
  .then(user => {
    if (!user) {
      const message = "L'utilisateur demandé n'existe pas .";
      return res.status(404).json({ message });
    } else {
      Post.findByPk(req.params.id)
        .then((post) => {
          if (post === null) {
            const message = `La publication demandé n'existe pas .`;
            return res.status(404).json({ message });
          }
        })
        const filename = user.picture.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({
            where: { id: req.params.id },
          })
          .then(_ => {
            const message = `La publication avec l'id:"${req.params.id}" a bien été supprimé.`;
            res.json({ message });  
          })
        .catch((error) => {
          const message = `La publication n'a pas pu être supprimé . Réessayez dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    })
  }
})
};
