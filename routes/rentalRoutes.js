const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const passport = require('passport')

require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const { Op } = require("sequelize")

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
const path = require('path')
const multer = require('multer');
let upload = multer({ dest: 'uploads/' })
router.get('/image/:key', (req,res)=> {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
}
)
router.post('/images', upload.array('image',5), async(req, res) => {
  console.log(req.files.length)
  if (!req.files.length) {
    console.log("No file received");
    return res.send({
      success: false,
      length: 0,
      imagePath: 'No_image_available.svg.png'
    });

  } else {
    resultKeys = ''
    count = 0
    for (var file of req.files){

      const result = await uploadToS3(file)
      resultKeys += result.Key + ' '
      await unlinkAsync(file.path)
      count+=1
    }
    return res.send({
      success: true,
      length: count,
      imagePath: resultKeys.trimEnd()
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

//GET ALL POSTS BY CATEGORY
router.get('/category/:category', async (req, res) => {
  try {
    let post = await Post.findAll({where:{category: req.params.category}, include: [User,Comment] })
    res.json(post)
  } catch (error) {
    res.json({ error })
  }
})

//ADDED FOR SEARCH
router.get('/search', async (req, res) => {
  try {
    let post = await Post.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
                {
                  [Op.and]: [
                    {dateFrom: {[Op.lte]: `${req.query.df}`}},
                    {dateTo: {[Op.gte]: `${req.query.dt}`}}
                  ]
                },
                {dateFrom: {[Op.between]: [`${req.query.df}`, `${req.query.dt}`]}},
                {dateTo: {[Op.between]: [`${req.query.df}`, `${req.query.dt}`]}}
            ]
          },
          {
            [Op.or]: [
              {title: {[Op.like]: `%${req.query.q}%`}},
              {description: {[Op.like]: `%${req.query.q}%`}}
            ]
          }
        ]
      }, include: [User,Comment] 
    })
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

// router.get('/search', async(req,res)=>{
//   try{
//     let post = await Post.findAll({where: {title: req.query.q}, include: [User,Comment]})
//     res.json(post)
//   }
//   catch(err){
//     res.json(err)
//   }
  
// } )

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
