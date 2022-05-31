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

    res.json(user ? jwt.sign({id:user.id},process.env.SECRET):null)
    

  })
})
//get current user inforrmation
router.get('/user', passport.authenticate('jwt'), async(req,res)=>{
  try{
    let user = req.user
  res.json(user)
  }
  catch(err){
    res.json(err)
  }
  
})

// get users information by id
router.get('/user/:id',async (req, res) => {
  try {
    let user = await User.findOne({where: {id: req.params.id}})
    return res.json(user)
  } catch (error) {
    res.json({ error })
  }
})


router.put('/update', async (req,res)=> {
  try{
    await User.update({avatar: req.body.avatar}, {where: {id: req.body.id}})
    
  res.sendStatus(200)
  }
  catch (err ){
    res.json(err)
  }
})

router.put('/updateAll', async (req,res)=> {
  try{
    await User.update(req.body, {where: {id: req.body.id}})
    
  res.sendStatus(200)
  }
  catch (err ){
    res.json(err)
  }
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
router.get('/userPosts/:id', passport.authenticate('jwt'), async (req, res) => {
  try {
    
    let post = await Post.findAll({ where: { userId: req.params.id }, include: [User] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})


module.exports = router