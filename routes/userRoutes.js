const router = require ('express').Router()
const { User , Post} = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')



//REGISTERING ROUTE
router.post('/register', (req, res)=> {
  const { username } = req.body
  User.register(new User({username}), req.body.password, err=> {
    if(err) {console.log(err)}
    res.sendStatus(200)
  })
})

//LOGGING IN ROUTE
//will return a jsonwebtoken after inputting login info, which can be used to recognize who the user is and give access to what we want to look at AKA authentication aspect
//we need to hold this via local storage and get it when we need it
router.post('/login', ({body},res)=> {
  User.authenticate()(body.username, body.password, (err,user)=>{
    if(err) {console.log(err)}
    res.json(user ? jwt.sign({id:user.id},process.env.SECRET):null)
  })
})

//GET USER'S POSTS
router.get('/userPosts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

// TESTING
router.get('/posts/', passport.authenticate('jwt'), async (req, res) => {
  try {
    
    let post = await Post.findAll({ where: { userId: req.user.id }, include: [User] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})


module.exports = router