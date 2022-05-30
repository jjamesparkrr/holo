const router = require ('express').Router()
const { User , Post} = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')



//REGISTERING ROUTE
router.post('/register', (req, res)=> {
  const { username, email } = req.body
  User.register(new User({username, email}), req.body.password, err=> {
    if(err) {return res.json(500,err.message)}
    res.sendStatus(200)
  })
})

//LOGGING IN ROUTE
//will return a jsonwebtoken after inputting login info, which can be used to recognize who the user is and give access to what we want to look at AKA authentication aspect
//we need to hold this via local storage and get it when we need it
router.post('/login', async ({body},res)=> {
  let user1 = await User.findOne({where:{ username: body.username } });
  if (!user1){
    return res.json(500, "wrong username")
  }
  User.authenticate()(body.username, body.password, (err,user)=>{
    if(err) {return res.json(500,err.message)}
    // console.log(res.)

    res.json(user ? jwt.sign({id:user.id},process.env.SECRET):null)
    

  })
})

router.get('/user', passport.authenticate('jwt'), async(req,res)=>{
  let user = req.user
  res.json(user)
})
// get users information
router.get('/users',async (req, res) => {
  try {
    
    let users = await User.findOne({attributes: ['id']})
    return res.json(users)
  } catch (error) {
    res.json({ error })
  }
})

router.put('/update', async (req,res)=> {
  // try{
    await User.update({avatar: req.body.avatar}, {where: {id: req.body.id}})
    
  res.sendStatus(200)
  // }
  // catch (err ){
  //   res.json(err)
  // }
})

//GET USER'S POSTS
router.get('/userPosts', passport.authenticate('jwt'), async (req, res) => {
  try {
    
    let post = await Post.findAll({ where: { userId: req.user.id }, include: [User] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})


module.exports = router