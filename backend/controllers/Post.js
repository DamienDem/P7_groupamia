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
       
exports.getOnePost = (req,res) => {
  Post.findByPk(req.params.id)
  .then( post => {
    if(post === null) {
      const message = `La publication demandé n'existe pas .`
      return res.status(404).json({ message })
    }
    const message = `La publication a bien été trouvée .`
    res.json({ message , data: post})
  })
  .catch(error => {
    const message = `La publication n'a pas pu être récupéré. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}  
     
exports.updatePost = (req,res) => {
  Post.findByPk(req.params.id)
  .then ( post => {
    if(post === null) {
      const message = `La publication demandé n'existe pas .`
      return res.status(404).json({ message })
    }
  })
  .then( post => {
    Post.update(req.body, {
      where: {id: req.params.id }
    })
    const message = `La publication :"${req.body.title}" a bien été modifié.`
    res.json({message, data: post })
  })
  .catch(error => {
    const message = `La publication n'a pas pu être modifié. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}

exports.deletePost = (req, res) => {
  Post.findByPk(req.params.id)
  .then ( post => {
    if(post === null) {
      const message = `La publication demandé n'existe pas .`
      return res.status(404).json({ message })
    }
  })
  .then( post => {
  
    Post.destroy({
      where: {id: req.params.id }
    })
    const message = `La publication avec l'id:"${req.params.id}" a bien été supprimé.`
    res.json({ message })
  })
  .catch(error => {
    const message = `La publication n'a pas pu être supprimé . Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
  })
}
