const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const passport = require('passport')

//GET ALL COMMENTS
//jwt means that we're going to show our badge/jwt everytime we want to get all the posts
router.get('/comments', passport.authenticate('jwt'), async (req, res) => {
  try {
    let comments = await Comment.findAll({ include: [Post] })
    res.json(comments)
  } catch (error) {
    res.json({ error })
  }
})

//CREATE A COMMENT
//this autthenticate ensures that when u make a post, we want to authenticate that ur logged in and u do so by looking at local storage where the badge is stored
router.post('/comments', passport.authenticate('jwt'), async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.json(newComment);
  } catch (err) {
    res.json(err);
  }
});



module.exports = router;
