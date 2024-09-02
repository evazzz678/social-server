const express = require('express');
let nodemailer = require("nodemailer")
const Post = require('../models/PostModel');




// Create a post

module.exports = {

    CreatePost:
        async (req, res) => {
            const { text, user_id, postImg } = req.body;

            try {
                const newPost = new Post({
                    text,
                    user_id,
                    postImg
                });

                const post = await newPost.save();
                res.json(post);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server error');
            }
        },

    // Get all posts
    GetAllPost: async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });
            res.json(posts);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    },

    NewPost:  async (req, res) => {
        try {
          const { id } = req.params;
          const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } // This option returns the updated document
          );
      
          if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json(updatedPost);
        } catch (error) {
          res.status(500).json({ message: 'Error updating post', error: error.message });
        }
      
    }


}


