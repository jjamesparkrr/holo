const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const passport = require('passport')

require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadToS3(file){
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey){
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'

});
router.get('/image/:key', (req,res)=> {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
}
)
router.post('/images', upload.single('image'), async(req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      imagePath: '/assets/logo.png'
    });

  } else {
    
    const result = await uploadToS3(req.file)
    await unlinkAsync(req.file.path)
    return res.send({
      imagePath: '/image/'+result.Key
    })
  }
});
//GET ALL POSTS
//jwt means that we're going to show our badge/jwt everytime we want to get all the posts
router.get('/posts', async(req,res)=> {
  try {
    let posts = await Post.findAll({include:[User]})
    res.json(posts)
  } catch (error) {
    res.json({error})
  }
})

//GET ONE POST BY ID
router.get('/posts/:id', passport.authenticate('jwt'), async (req, res) => {
  try {
    let post = await Post.findOne({where:{id: req.params.id}, include: [User,Comment] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})
//ADDED FOR SEARCH
router.get('/posts/search', async (req, res) => {
  try {
    //let post = await Post.findOne({where:{title: req.params.title}, include: [User,Comment] })
    let post = await Post.findOne({where:{title: localStorage.getItem('query')}, include: [User,Comment] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})



//DELETE A POST
router.delete('/posts/:id', passport.authenticate('jwt'), async (req, res) => {
  try {
    let post = await Post.destroy({ where: { id: req.params.id }})
    res.json({message: 'post deleted'})
  } catch (error) {
    res.json({ error })
  }
})



//CREATE A POST
//this autthenticate ensures that when u make a post, we want to authenticate that ur logged in and u do so by looking at local storage where the badge is stored
router.post('/posts', passport.authenticate('jwt'), async (req, res) => {
  try {
    const newPost = await Post.create(
      {
        ...req.body, 
        userId: req.user.id
      });
    res.json(newPost);
  } catch (err) {
    return res.json(500,err);
  }
});



// router.put('/:id', async (req, res) => {
//   try {
//     const [affectedRows] = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const [affectedRows] = Post.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
