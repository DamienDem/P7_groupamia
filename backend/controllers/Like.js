const express = require("express");
const { Post, Like } = require("../db/sequelize");
const jwt = require("jsonwebtoken");

exports.likePost = (req,res) => {
  const postId = parseInt(req.params.postId);
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, `Mon_token_secret`);
  const userId = decodedToken.id;
  const like = parseInt(req.body.like);

  Like.findOne({
    where: {
      postId: postId,
      userId: userId,
    },
  }).then(userAlreadyVote => {
    switch(like){
      case 1: 
      if(!userAlreadyVote) {
        Like.create({
          postId: postId,
          userId: userId,
          isLike: 1
        })
       .then(_ => {
        Post.findOne({
          where:{id: postId}
        })
        .then(post => {
          post.update({
            likes: post.likes + 1,
          })
        }).then(_ => {
          const message = `L'utilisateur avec l'Id: ${userId} a liké la publication`;
          res.json({ message })
        })
      }) 
      } else {
          const message = `L'utilisateur a déja liké la publication`
          res.status(400).json({ message }) 
      }
      break;
    case -1:
      if(!userAlreadyVote) {
        Like.create({
          postId: postId,
          userId: userId,
          isLike: -1
        })
       .then(_ => {
        Post.findOne({
          where:{id: postId}
        })
        .then(post => {
          post.update({
            dislikes: post.dislikes + 1,
          })
        }).then(_ => {
          const message = `L'utilisateur avec l'Id: ${userId} a disliké la publication`;
          res.json({ message })
        })
      }) 
      } else {
          const message = `L'utilisateur a déja disliké la publication`
          res.status(400).json({ message }) 
      }
      break;
      case 0:
        if(userAlreadyVote && userAlreadyVote.isLike == 1) {
          Like.destroy({ 
            where: {  
              postId: postId,
              userId: userId,}
          })
          .then(_ => {
            const message = `Le like a été supprimé. `
            res.json({ message })
          })
          .then(_ => {
            Post.findOne({
              where:{id: postId}
            })
            .then(post => {
              post.update({
                likes: post.likes -1,
              })
            })
            .catch(_ => res.status(400).json({'message': `Le like n'a pas pu être supprimé`}))
          });
        } else if(userAlreadyVote && userAlreadyVote.isLike == -1) {
          Like.destroy({ 
            where: {  
              postId: postId,
              userId: userId,}
          })
          .then(_ => {
            const message = `Le dislike a été supprimé. `
            res.json({ message })
          })
          .then(_ => {
            Post.findOne({
              where:{id: postId}
            })
            .then(post => {
              post.update({
                dislikes: post.dislikes -1,
              })
            })
            .catch(_ => res.status(400).json({'message': `Le dislike n'a pas pu être supprimé`}))
          })
        } else {
          const message = `L'utilisateur n'a pas donné son avis sur la publication`
          res.status(400).json({ message })
        }
    }
  })
};

exports.getAllLikes = (req,res) => {

   Like.findAll()
   .then((likes) => {
    const message = `la liste des likes a bien été récupérée . `;
    res.json({ message, data: likes });
  })
  .catch((err) => {
    const message = `La liste des likes n'a pas pu être récupérée. Réessayer dans quelques instants.`;
    res.status(500).json({ message, data: err });
  });
}
