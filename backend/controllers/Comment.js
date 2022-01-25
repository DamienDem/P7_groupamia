const express = require("express");
const { Post, Comment, User } = require("../db/sequelize");

exports.createComment = (req,res) => {
    let postId = req.params.postId;
    let userId = req.body.userId;
    let content = req.body.content;

    if (userId) {
        User.findOne({
            where: { id: userId }
        }).then(user => {
    
        if (user) {
            Post.findOne({
                where: { id: postId }
            }).then(post => {
                if (post) {
                     Comment.create({
                        userId: userId,
                        userName: user.userName,
                        postId: post.id,
                        content: content
                    })
                    .then(comment => {
                        const message = `L'utilisateur avec l'id: ${userId} a ajouté un commentaire `
                        res.json({ message, data: comment })
                    })
                    .catch(err => {
                        const message = `Impossible d'ajouter le commentaire .`
                        res.status(400).json({ message, err})
                    }) 
                } else {
                    const message = `La publication n'existe pas .`
                    return  res.status(404).json({ message })   
                }
            })
        }
    })
}
};
                        
                 
