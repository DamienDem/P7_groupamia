const express = require('express');
const { Post, User } = require('../db/sequelize');

exports.createPost = (req, res) => {

    const title   = req.body.title;
    const content = req.body.content;

    if (title == null || content == null) {
      const message = `Paramétre manaquant . `
      return res.status(404).json({ message });
    }
        User.findOne({
          where: { id: req.params.id},
        })
        .then(user => {
            if(!user){
                const message = `L'utilisateur n'existe pas`
                res.status(404).json({ message })
            }
            Post.create({
              userId : req.params.id,
              title  : title,
              content: content,
              like  : 0
            })  
            const message = `La publication est postée`;
            return res.json({ message, data: user, })
        })
      };

exports.getAllPosts = (req,res) => {
  
  Post.findAll()
  .then(posts => {
    const message = `la liste des publications a bien été récupérée . `
    res.json({ message, data : posts})
  })
  .catch(err => {
    const message = `La liste des publications n'a pas pu être récupérée. Réessayer dans quelques instants.`
    res.status(500).json({message, data: err})
  })
}
       
        
          
 