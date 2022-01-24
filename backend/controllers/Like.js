const express = require("express");
const { Post, User, Like } = require("../db/sequelize");
const { post } = require("../routes/Like");

exports.likePost = (req, res) => {
  let postId = parseInt(req.params.postId);
  let userId = parseInt(req.body.userId);

  if (postId <= 0) {
    Post.findOne({
      where: { id: postId },
    });
  }
  if (userId) {
    Post.findOne({
      where: { id: postId },
    }).then((post) => {
      if (post) {
        Like.findOne({
          where: {
            postId: postId,
            userId: userId,
          },
        }).then((like) => {
          if (!like) {
            let newLike = Like.create({
              postId: postId,
              userId: userId,
              isLike: 1,
            }).then(_ => {
              post.update({
                likes: post.likes + 1,
              })
              const message = `L'utilisateur avec l'Id: ${userId} a liké la publication`;
              res.json({ message });
            });
          }
        });
      }
    });
  }
};
