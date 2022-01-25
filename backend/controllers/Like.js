const express = require("express");
const { Post, User, Like } = require("../db/sequelize");

exports.likePost = (req,res) => {
  let postId = parseInt(req.params.postId);
  let userId = parseInt(req.body.userId);
  let like = parseInt(req.body.like);

  Like.findOne({
    where: {
      postId: postId,
      userId: userId,
    },
  }).then(userAlreadyVote => {
    switch(like){
      case 1: 
      if(!userAlreadyVote) {
        let newLike = Like.create({
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
        let newLike = Like.create({
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
}
